import { createApp }   from 'vue'
import { watchEffect } from 'vue'
import { authReady }   from '@/stores/auth'
import App    from './App.vue'
import router from './router/index.js'

const app = createApp(App).use(router)

const stop = watchEffect(() => {
  if (authReady.value) {
    app.mount('#app')
    stop()
  }
})
