<script lang="ts">
	import { formatDateToLocale, stringToDate } from '$lib/utils';

	export let index: number;
	export let report: Report;
</script>

<a
	href="/reports/{report.id}"
	class="card flex flex-row flex-wrap justify-between items-center gap-4 p-4 w-full"
>
	<!-- =============================== -->

	<h1>
		Report #{index + 1}
	</h1>

	<p>
		Date: {formatDateToLocale(stringToDate(report.created_at))}
	</p>
</a>
