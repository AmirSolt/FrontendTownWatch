import { redirect, fail } from '@sveltejs/kit';
import { z } from "zod";


const ConfirmPasswordResetSchema = z.object({
	token: z.string().min(1),
	password1: z.string().min(1),
	password2: z.string().min(1),
  });



export const load = async ({params}) => {
	return {
		token: params.token
	}
}

export const actions = {
    confirm: async ({ locals, request, params }) => {
		const data = await request.formData();
		const token = params.token;
		const password1 = data.get('password1');
		const password2 = data.get('password2');

		// validation
		const validationResponse = ConfirmPasswordResetSchema.safeParse({
			token,
			password1,
			password2,
		})
		if ( !validationResponse.success){
			let issues = validationResponse.error.issues
			return fail(400, {
				errorMessage: issues.length == 0 ? "Unkown issue" : issues[0].message
			})
		}
		try {
		const response = await locals.pb.collection('users').confirmPasswordReset(token, password1, password2);
	

		const responseLogout = locals.pb.authStore.clear();
	} catch (e){
		const err = e as UserServerClientResponseError
		return fail(err.status, {
			errorMessage: err.response.message
		})
		}
	

		throw redirect(302, "/auth/login")
	},
};