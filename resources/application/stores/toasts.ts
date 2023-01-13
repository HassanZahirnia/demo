import { defineStore } from 'pinia'
import { find, each } from 'lodash'
import type { TYPE, POSITION } from 'vue-toastification'
import { useToast } from 'vue-toastification'

const toast = useToast()
export const useToastsStore = defineStore('toastStore', () => {
	const toasts = ref<App.Data.Notification.ToastData[]>([])

	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	function push(item: App.Data.Notification.ToastData) {
		if (!find(toasts.value, { id: item.id })) {
			toasts.value.push(item)
			toast(item.message, {
				type: item.type as TYPE,
				icon: true,
				timeout: 3000,
				position: 'top-left' as POSITION,
				closeOnClick: true,
				pauseOnFocusLoss: false,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 0.6,
				showCloseButtonOnHover: false,
				hideProgressBar: false,
				closeButton: 'button',
			})
			pull(item)
		}
	}
	function pull(item: App.Data.Notification.ToastData) {
		toasts.value = toasts.value.filter((toast) => toast.id !== item.id)
	}

	return {
		toasts,
		push,
		pull,
	}
})

export const setupToasts = () => {
	const unregisterHook = registerHook('navigated', ({ isBackForward }: { isBackForward: boolean }) => {
		if (!isBackForward) {
			useToasts()
		}
	})

	onMounted(() => {
		useToasts()
	})

	onUnmounted(() => {
		unregisterHook()
	})
}

function useToasts() {
	const toastsStore = useToastsStore()
	const toasts = useTypedProperty<App.Data.Notification.ToastData[]>('toasts')

	if (toasts.value?.length) {
		each(toasts.value, (item: App.Data.Notification.ToastData) => {
			toastsStore.push(item)
		})
	}
}
