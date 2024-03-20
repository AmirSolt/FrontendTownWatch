<script lang="ts">
	import { PUBLIC_HERE_APP_KEY } from '$env/static/public';
	import { error } from '@sveltejs/kit';
	import { Search } from 'lucide-svelte';

	export let addressLat = 0.0;
	export let addressLong = 0.0;

	let address: string = '';

	async function fetchAddress() {
		const url = 'https://geocode.search.hereapi.com/v1/geocode';
		const headers = {
			'User-Agent': 'TownWatch/1.0',
			'X-Request-ID': ''
		};
		const params = {
			q: address,
			types: 'postalCode',
			lang: 'en',
			apiKey: PUBLIC_HERE_APP_KEY
		};

		try {
			const queryParams = new URLSearchParams(params).toString();
			const response = await fetch(`${url}${queryParams ? `?${queryParams}` : ''}`, {
				method: 'GET',
				headers: new Headers(headers)
			});

			if (!response.ok) {
				throw error(400, 'Could not find the address');
			}

			let data = await response.json();
			const locationData: GeocodeResponse = data;
			console.log(locationData);
			addressLat = locationData.items[0].position.lat;
			addressLong = locationData.items[0].position.lng;
		} catch (error) {
			console.error('Error making GET request:', error);
			return null;
		}
	}
</script>

<label for="address">Postal code/ Zip code</label>
<div class="input-group input-group-divider grid grid-cols-10">
	<input
		class="col-span-8"
		type="search"
		name="address"
		bind:value={address}
		autocomplete="postal-code"
	/>
	<button class="variant-filled-secondary col-span-2" on:click={fetchAddress}><Search /></button>
</div>
