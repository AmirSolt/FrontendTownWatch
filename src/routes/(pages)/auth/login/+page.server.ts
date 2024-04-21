import { redirect, error, fail } from '@sveltejs/kit';
import { z } from "zod";

const LoginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
  });


export const load = async ({locals}) => {
	if ( locals.user != null ) {
		throw redirect(302, "/")
	}
}


export const actions = {
    login: async ({ locals, request }) => {
		if ( locals.user != null ) {
			throw redirect(302, "/")
		}

		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		

		// validation
		const validationResponse = LoginSchema.safeParse({
			email,
			password,
		})
		if ( !validationResponse.success){
			let issues = validationResponse.error.issues
			return fail(400, {
				errorMessage: issues.length == 0 ? "Unkown issue" : issues[0].message
			})
		}
		try {
			const response = await locals.pb.collection("users").authWithPassword(email, password) 
		} catch (e){
			const err = e as UserServerClientResponseError
			return fail(err.status, {
				errorMessage: err.response.message
			})
		}

		const dest = data.get('dest');
		if (dest!=null && dest!="null" && dest.toString().length > 0){
			throw redirect(302, decodeURIComponent(dest.toString()))
		}

		throw redirect(302, "/")
	},
};
