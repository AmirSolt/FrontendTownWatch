<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card">
	<h1>Sign up</h1>
	<form
		method="POST"
		action="?/signup"
		class="flex flex-col justify-center items-start gap-4 w-full pt-4"
	>
		<input type="hidden" name="dest" value={$page.url.searchParams.get('dest')} />

		<label class="label" for="email">
			<span>Email</span>
			<input
				id="email"
				class="input"
				type="email"
				placeholder="example@email.com"
				name="email"
				autocomplete="email"
			/>
		</label>

		<label class="label" for="password">
			<span>Password</span>
			<input
				id="password"
				class="input"
				type="password"
				name="password"
				autocomplete="new-password"
			/>
		</label>

		<div class="space-y-2">
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" required />
				<p>
					I agree to the terms and conditions of the <a href="/info/terms-of-service"
						>Terms of Service</a
					>
					and <a href="/info/privacy-policy">Privacy Policy</a>
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
