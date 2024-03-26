
export const load = async ({locals}) => {

    if(locals.user!=null){
        try{
            locals.customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
        }catch(_){

        }
    }

    return {
        user: locals.user,
        customer: locals.customer
    }
};