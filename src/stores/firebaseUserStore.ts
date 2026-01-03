import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
  type Unsubscribe,
  type Auth,
  type User as FirebaseUser,
} from 'firebase/auth'

import { useAnimeApiStore } from '@/stores/animeApiStore'
import { Database, getDatabase, ref as dbRef, set, get, update } from 'firebase/database'
import { useToast } from 'vue-toastification'
import type { FirebaseOptions, FirebaseError } from 'firebase/app'
import type { UserFormData } from '@/stores/formStore'
import type { AnimeList } from '@/types/anime'

type FirebaseEnv = {
  VITE_FIREBASE_API_KEY: string
  VITE_FIREBASE_AUTH_DOMAIN: string
  VITE_FIREBASE_DATABASE_URL: string
  VITE_FIREBASE_PROJECT_ID: string
  VITE_FIREBASE_STORAGE_BUCKET: string
  VITE_FIREBASE_MESSAGING_SENDER_ID: string
  VITE_FIREBASE_APP_ID: string
}

export function getFirebaseConfig(): FirebaseOptions {
  const env = import.meta.env as unknown as FirebaseEnv

  const config: FirebaseOptions = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: env.VITE_FIREBASE_DATABASE_URL,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  }

  return config
}

const firebaseConfig = getFirebaseConfig()
const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
const dataBase: Database = getDatabase(app)

export const useFirebaseUserStore = defineStore('userFirebaseStore', () => {
  const toast = useToast()
  const animeApiStore = useAnimeApiStore()
  const firebaseError = ref<FirebaseError | null>(null)

  const user = ref<UserFormData | null>(null)
  const unsubscribe = ref<Unsubscribe | null>(null)
  const firebaseUser = ref<FirebaseUser | null>(null)
  const router = useRouter()

  function errorInfo(error: FirebaseError): void {
    switch (error.code) {
      case 'auth/wrong-password':
        toast.error('Неверный пароль')
        break
      case 'auth/user-not-found':
        toast.error('Пользователь не найден')
        break
      case 'auth/email-already-in-use':
        toast.error('Этот email уже используется')
        break
      case 'auth/weak-password':
        toast.error('Пароль слишком слабый')
        break
      case 'auth/too-many-requests':
        toast.error('Слишком много попыток. Попробуйте позже')
        break
      case 'auth/invalid-credential':
        toast.error('Неверные учетные данные')
        break
      default:
        toast.error('Ошибка авторизации: ' + error.message)
    }
  }

  async function signInUser(data: UserFormData): Promise<void> {
    firebaseError.value = null
    animeApiStore.isLoading = true
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password as string,
      )
      firebaseUser.value = userCredential.user
      await loadUserData(userCredential.user.uid)
      toast.success('Вы вошли в учётную запись')
    } catch (error) {
      firebaseError.value = error as FirebaseError
      errorInfo(firebaseError.value)
    } finally {
      animeApiStore.isLoading = false
    }
  }

  async function createNewUser(data: UserFormData): Promise<void> {
    firebaseError.value = null
    animeApiStore.isLoading = true

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password as string,
      )
      firebaseUser.value = userCredential.user
      //сохраняем в realtime-db
      await saveUserToDatabase(userCredential.user.uid, data)

      user.value = {
        id: userCredential.user.uid,
        userName: data.userName || (data.email.split('@')[0] as string),
        email: data.email,
        favorites: data.favorites || [],
      }

      toast.success('Ваша учётная запись успешно создана')
    } catch (error) {
      firebaseError.value = error as FirebaseError
      errorInfo(firebaseError.value)
    } finally {
      animeApiStore.isLoading = false
    }
  }

  async function saveUserToDatabase(userId: string, userData: UserFormData): Promise<void> {
    try {
      const userRef = dbRef(dataBase, `users/${userId}`)

      const userToSave = {
        id: userId,
        userName: userData.userName,
        email: userData.email,
        favorites: userData.favorites,
      }

      await set(userRef, userToSave)
    } catch (error) {
      console.log('Error saving user to database: ', error)
      throw error
    }
  }

  async function updateUserDatabase(userId: string, favorites: AnimeList): Promise<void> {
    firebaseError.value = null

    try {
      const userRef = dbRef(dataBase, `users/${userId}`)
      await update(userRef, {
        favorites,
      })
    } catch (error) {
      firebaseError.value = error as FirebaseError
      errorInfo(firebaseError.value)
      throw error
    }
  }

  async function loadUserData(userId: string): Promise<void> {
    try {
      const userDataRef = dbRef(dataBase, `users/${userId}`)
      const snapShot = await get(userDataRef)

      if (snapShot.exists()) {
        const userDataFromDb = snapShot.val()

        user.value = {
          id: userDataFromDb.id || userId,
          userName: userDataFromDb.userName,
          email: userDataFromDb.email,
          favorites: userDataFromDb.favorites || [],
        }

        if (auth.currentUser && !firebaseUser.value) {
          firebaseUser.value = auth.currentUser
        }
      } else {
        user.value = null
        firebaseUser.value = null
        toast.error(`Пользователь не найден`)
      }
    } catch (error) {
      throw error
    }
  }

  async function logout(): Promise<void> {
    firebaseError.value = null
    animeApiStore.isLoading = true

    try {
      await signOut(auth)
      user.value = null
      firebaseUser.value = null
      toast.warning('Вы покинули учётную запись')
      router.replace({
        name: 'home',
        query: { page: 1 },
      })
    } catch (error) {
      firebaseError.value = error as FirebaseError
      errorInfo(firebaseError.value)
    } finally {
      animeApiStore.isLoading = false
    }
  }

  const init = (): void => {
    if (unsubscribe.value) return

    firebaseError.value = null
    animeApiStore.isLoading = true

    unsubscribe.value = onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (fbUser) {
          firebaseUser.value = fbUser
          await loadUserData(fbUser.uid)
        } else {
          user.value = null
          firebaseUser.value = null
        }
      } catch (error) {
        firebaseError.value = error as FirebaseError
        user.value = null
        firebaseUser.value = null
        errorInfo(firebaseError.value)
      } finally {
        animeApiStore.isLoading = false
      }
    })
  }

  const cleanup = (): void => {
    if (unsubscribe.value) {
      unsubscribe.value()
      unsubscribe.value = null
    }

    user.value = null
    firebaseUser.value = null
    firebaseError.value = null
  }

  return {
    firebaseError,
    user,
    unsubscribe,
    init,
    cleanup,
    createNewUser,
    signInUser,
    saveUserToDatabase,
    logout,
    updateUserDatabase,
  }
})
