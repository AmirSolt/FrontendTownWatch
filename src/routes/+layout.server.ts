
export const load = async ({locals}) => {

    if(locals.user!=null){
        locals.customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
    }

    return {
        user: locals.user,
        customer: locals.customer
    }
};