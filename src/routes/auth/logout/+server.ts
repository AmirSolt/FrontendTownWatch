import { redirect, error } from "@sveltejs/kit";

export const POST = async ({locals}) => {
    
    if(locals.user==null){
        throw error(400, {message:"Unauthorized!"})
    }
		try {
    const response = locals.pb.authStore.clear();
	} catch (e){
			throw error(500, "Internal Server Error")
		}

    throw redirect(302, "/");
};