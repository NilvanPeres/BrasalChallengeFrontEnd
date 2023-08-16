/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import mitt from 'mitt'

// Plugins
import { registerPlugins } from '@/plugins'

const emitter = mitt()

const app = createApp(App)

app.config.globalProperties.emitter = emitter

registerPlugins(app)

app.mount('#app')
