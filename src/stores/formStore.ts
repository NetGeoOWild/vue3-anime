import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseUserStore } from './firebaseUserStore'
import type { OneAnime } from '@/types/anime'

export interface UserFormData {
  id: string
  userName: string
  email: string
  password?: string
  favorites: OneAnime[] | []
}

export const useformStore = defineStore('formStore', () => {
  const userFirebaseStore = useFirebaseUserStore()

  const isFormOpen = ref<boolean>(false)
  const isRegistration = ref<boolean>(false)
  const isshowPassword = ref<boolean>(false)
  const isFormEmpty = ref<boolean>(true)

  const formData = ref<UserFormData>({
    id: '',
    userName: '',
    email: '',
    password: '',
    favorites: [],
  })

  const showPassword = computed(() => {
    return isshowPassword.value ? 'text' : 'password'
  })

  const isValidPassword = computed(() => {
    return formData.value.password?.trim() !== ''
  })

  const isValidEmail = computed(() => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(formData.value.email.toLowerCase())
  })

  const isValidUserName = computed(() => {
    return formData.value.userName.trim() !== ''
  })

  const isRegisterFormValid = computed(() => {
    return isValidUserName.value && isValidEmail.value && isValidPassword.value
  })

  const isLoginFormValid = computed(() => {
    return isValidEmail.value && isValidPassword.value
  })

  const isFormValid = computed(() => {
    return isRegistration.value ? isRegisterFormValid.value : isLoginFormValid.value
  })

  watch(
    () => isFormValid.value,
    (isValid) => {
      isFormEmpty.value = !isValid
    },
    { immediate: true },
  )

  const toggleMode = () => {
    isRegistration.value = !isRegistration.value

    formData.value.id = ''
    formData.value.userName = ''
    formData.value.email = ''
    formData.value.password = ''
    formData.value.favorites = []
  }

  async function submitHandler(data: UserFormData) {
    const defaultData = {
      id: '',
      userName: '',
      email: '',
      password: '',
      favorites: [],
    }

    if (isRegistration.value) {
      await userFirebaseStore.createNewUser(data)

      if (!userFirebaseStore.firebaseError) {
        formData.value = defaultData
        isFormOpen.value = false
        isRegistration.value = false
        isshowPassword.value = false
        isFormEmpty.value = true
      }

    } else {
      await userFirebaseStore.signInUser(data)

      if (!userFirebaseStore.firebaseError) {
        formData.value = defaultData
        isFormOpen.value = false
        isRegistration.value = false
        isshowPassword.value = false
        isFormEmpty.value = true
      }
    }
  }

  return {
    isValidEmail,
    isValidPassword,
    isValidUserName,
    isFormValid,
    isFormEmpty,
    formData,
    isshowPassword,
    showPassword,
    isFormOpen,
    isRegistration,
    toggleMode,
    submitHandler,
  }
})
