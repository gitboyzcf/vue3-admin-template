import { createApp } from 'vue'

// import naiveUi from 'naive-ui'
import Antd from 'ant-design-vue';
import App from './App.vue'
import directives from './directives'
import VueLazyLoad from 'vue3-lazyload'
import { i18n } from '@/locales'
import { setupStore } from '@/stores'
import { setupRouter, router } from './router'
import { urlParamsLogin } from './router/helper'

import './assets/main.css'
import 'virtual:uno.css'
import 'animate.css'
import 'ant-design-vue/dist/reset.css';
import '@/assets/scss/adapter.scss'
// 引入默认主题
import '@/themes/default/theme.scss'

async function bootstrap() {
  const app = createApp(App)

  app.use(Antd)
  app.use(directives)
  app.use(VueLazyLoad)
  app.use(i18n)

  await setupStore(app)
  await urlParamsLogin(router)
  await setupRouter(app)

  app.mount('#app')
}
bootstrap()
