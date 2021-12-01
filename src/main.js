import {createApp, h} from 'vue'
import App from './App.vue'
import Test from './components/HelloWorld.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import './index.css'

const routes = [
  {
    path: '/:channelID', component: Test,
    name: 'main'
  },
  {
    path: '/', redirect: '/1'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
