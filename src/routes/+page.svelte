<script>
	import Map from '$lib/components/map/Map.svelte';
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	let addressLat = 0.0;
	let addressLong = 0.0;
</script>

<br />
<!-- <div class="max-w-6xl flex flex-col gap-4">
	<div class="flex flex-col justify-center items-center text-center gap-3">
		<h1>
			<strong
				class="text-6xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90%"
			>
				BASEDPOCKET
			</strong>
		</h1>
		<h1 class="text-4xl">(Early Access)</h1>
		<p class="text-2xl">Translate Your Videos for Worldwide Audience using AI.</p>
		<p>Translate audio, subtitles, description, metadata</p>
		<a href="/auth/signup" class="btn variant-filled-primary"> Action Button </a>
	</div>
</div> -->

<br />

<AddressSearch bind:addressLat bind:addressLong />

<p>
	{addressLat}, {addressLong}
</p>

<Map lat={addressLat} long={addressLong} />

<br />
<br />
<br />
<br />
<br />
