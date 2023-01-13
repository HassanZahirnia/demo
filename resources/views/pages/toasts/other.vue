<script setup lang="ts">
import { setupToasts } from '@/application/stores/toasts'

setupToasts()
</script>

<template>
	<section class="w-full min-h-screen grid place-items-center">
		<div
			class="p-10 rounded-2xl
            bg-white shadow-lg shadow-slate-200
            space-y-5
            "
		>
			<div class="">
				This page is made so you can back/forward to or from it.
			</div>
			<router-link
				:href="route('toasts.index')"
				class="block px-5 py-3 rounded-xl
                bg-indigo-500 text-white text-center
                "
			>
				Go to index
			</router-link>
		</div>
	</section>
</template>
