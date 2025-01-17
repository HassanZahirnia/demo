import { useAutoAnimate } from '@formkit/auto-animate/vue'

export function useInfiniteChirpLoading(initialChirps: Paginator<App.Data.ChirpData>) {
	const [list, enableChirpAnimations] = useAutoAnimate()
	const meta = ref(initialChirps.meta)
	const chirps = useHistoryState('chirps', initialChirps.data)
	const canLoad = computed(() => !!meta.value.next_page_url)

	function loadMoreChirps() {
		if (!canLoad.value) {
			return
		}

		router.get(meta.value.next_page_url!, {
			preserveState: true,
			preserveScroll: true,
			preserveUrl: true,
			only: ['chirps'],
			hooks: {
				before: () => enableChirpAnimations(false),
				success: ({ view }) => {
					const paginatedChirps = view.properties.chirps as unknown as Paginator<App.Data.ChirpData>
					chirps.value.push(...paginatedChirps.data)
					meta.value = paginatedChirps.meta
				},
				after: () => enableChirpAnimations(true),
			},
		})
	}

	useInfiniteScroll(window, loadMoreChirps, {
		offset: { bottom: 300 },
	})

	return {
		list,
		enableChirpAnimations,
		canLoad,
		chirps,
		loadMoreChirps,
	}
}
