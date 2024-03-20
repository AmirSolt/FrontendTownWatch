<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	let inputDemo = '';
	let timeoutId = 0;
	const flavorOptions: AutocompleteOption<string>[] = [
		// { label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		// { label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		// { label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		// {
		// 	label: 'Neapolitan',
		// 	value: 'neapolitan',
		// 	keywords: 'mix, strawberry, chocolate, vanilla',
		// 	meta: { healthy: false }
		// },
		// { label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		// { label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputDemo = event.detail.label;
	}
</script>

<!-- <input class="input" type="search" name="demo" bind:value={inputDemo} placeholder="Search..." /> -->

<input
	class="input autocomplete"
	type="search"
	name="autocomplete-search"
	bind:value={inputDemo}
	placeholder="Search..."
	use:popup={popupSettings}
	autocomplete="off"
	on:keypress={() => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => console.log('button clicked'), 200);
	}}
/>

<div
	class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
	tabindex="-1"
	data-popup="popupAutocomplete"
>
	<Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onFlavorSelection} />
</div>
