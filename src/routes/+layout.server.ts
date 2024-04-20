import { fetchUserAreasServer } from '$lib/geo/server/areas.js';

export const load = async ({locals}) => {

    locals.customer = null
    let [customerR, areasR] = await Promise.allSettled([
      fetchCustomer(locals),
      fetchUserAreasServer(locals)
    ])

    locals.customer = customerR.status === 'fulfilled'? customerR.value : null
    let areas = areasR.status === 'fulfilled'? areasR.value : []

    return {
        user: locals.user,
        customer:locals.customer,
        areas
    }
};


async function fetchCustomer(locals:App.Locals):Promise<Customer|null>{
  if(locals.user==null){
    return null
  }
  return await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`)
}
