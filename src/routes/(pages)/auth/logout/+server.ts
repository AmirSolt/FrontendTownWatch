import { redirect, error } from "@sveltejs/kit";

export const POST = async ({locals}) => {
    
    if(locals.user==null){
      throw redirect(302, "/")
    }
		try {
    const response = locals.pb.authStore.clear();
	} catch (e){
    const err = e as UserServerClientResponseError
 
    throw error(err.status, err.response.message)
		}

    throw redirect(302, "/");
};