import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey:            "AIzaSyAkf3IMm5azp9gkmJvYFSVrIkRJjDiwWOU",
  authDomain:        "liftconnect-fca04.firebaseapp.com",
  projectId:         "liftconnect-fca04",
  storageBucket:     "liftconnect-fca04.firebasestorage.app",
  messagingSenderId: "422285465460",
  appId:             "1:422285465460:web:105336f2c61818229abe21"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
