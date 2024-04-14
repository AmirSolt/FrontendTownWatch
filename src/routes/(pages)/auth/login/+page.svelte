<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="card p-4 w-full">
	<h1 class="text-3xl font-bold">Login</h1>
	<form
		method="POST"
		action="?/login"
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
				autocomplete="current-password"
				required
			/>
		</label>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>

<br />

<div class="flex flex-col justify-center items-center">
	<p class="text-center">
		Forgot password?
		<a href="/auth/password/reset" class="underline">Reset Password</a>
	</p>

	<p class="text-center">Or</p>

	<p class="text-center">
		Don't have an account?
		<a href={`/auth/signup?dest=${$page.url.searchParams.get('dest')}`} class="underline">Sign up</a
		>
	</p>
</div>
