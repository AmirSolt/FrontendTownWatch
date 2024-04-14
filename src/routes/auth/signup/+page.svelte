<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card p-4 w-full">
	<h1 class="text-3xl font-bold">Sign up</h1>
	<form
		method="POST"
		action="?/signup"
		class="flex flex-col justify-center items-start gap-4 w-full pt-4"
	>
		<input type="hidden" name="dest" value={$page.url.searchParams.get('dest')} />

		<label class="label w-full" for="email">
			<span>Email</span>
			<input
				id="email"
				class="input w-full"
				type="email"
				placeholder="example@email.com"
				name="email"
				autocomplete="email"
				required
			/>
		</label>

		<label class="label w-full" for="password">
			<span>Password</span>
			<input
				id="password"
				class="input w-full"
				type="password"
				name="password"
				autocomplete="new-password"
				required
			/>
		</label>

		<div class="space-y-2">
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" required />
				<p>
					I agree to the terms and conditions of the <a
						class="underline"
						href="/info/terms-of-service">Terms of Service</a
					>
					and <a class="underline" href="/info/privacy-policy">Privacy Policy</a>
				</p>
			</label>
		</div>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>

<br />

<p class="text-center">
	Have an account?
	<a href={`/auth/login?dest=${$page.url.searchParams.get('dest')}`} class="underline">Sign in</a>
</p>
