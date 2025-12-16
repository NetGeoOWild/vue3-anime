import { readonly, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref<boolean>(false)

export function useMobileMenu() {
  const route = useRoute()

  const toggleMobileMenu = (): void => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  const closeMobileMenu = (): void => {
    isMobileMenuOpen.value = false
  }

  watch(
    () => route.fullPath,
    () => {
      closeMobileMenu()
    },
  )

  return {
    isMobileMenuOpen: readonly(isMobileMenuOpen),
    toggleMobileMenu,
    closeMobileMenu,
  }
}
