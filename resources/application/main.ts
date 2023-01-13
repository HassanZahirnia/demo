import { initializeHybridly } from 'hybridly/vue'
import { createHead } from '@vueuse/head'
import { autoAnimatePlugin as autoAnimate } from '@formkit/auto-animate/vue'
import Toast from 'vue-toastification'
import { createPinia } from 'pinia'
import i18n from './i18n'
import 'virtual:hybridly/router'
import './tailwind.css'
import './fonts'
import 'vue-toastification/dist/index.css'

initializeHybridly({
	pages: import.meta.glob('@/views/pages/**/*.vue', { eager: true }),
	enhanceVue: (vue) => vue
		.use(createHead())
		.use(i18n)
		.use(autoAnimate)
		.use(createPinia())
		.use(Toast),
})
