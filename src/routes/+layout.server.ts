import { fetchUserAreasServer } from '$lib/geo/server/areas.js';

export const load = async ({locals}) => {

    locals.customer = null
    if(locals.user!=null){
      try{
        locals.customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
      }catch(_){
  
      }
    }
  

    let areas = await fetchUserAreasServer(locals)


    return {
        user: locals.user,
        customer:locals.customer,
        areas
    }
};