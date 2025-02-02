import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import './style.css'
import App from './App.vue'

createApp(App)
.use(VueLazyLoad, {
    
})
.mount('#app')
