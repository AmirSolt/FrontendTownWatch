import { scanEventsServer } from "$lib/geo/server/events";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();
    let censorEvents = true
    let customer:Customer|undefined|null

    if(locals.user!=null){
        customer = await locals.pb.collection('customers').getFirstListItem(`user.id="${locals.user.id}"`);
        if(customer!=null && customer?.tier > 0){
            censorEvents = false
        }
    }

    const events = await scanEventsServer(params, censorEvents)

    return Response.json(events)
};