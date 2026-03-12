import { ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const currentUser = ref(null)
export const authReady   = ref(false)

onAuthStateChanged(auth, (user) => {
  currentUser.value = user
  authReady.value   = true
})
