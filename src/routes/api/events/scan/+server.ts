import { scanEventsServer } from "$lib/geo/server/events";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();
    let censorEvents = true

    if(locals.customer!=null && locals.customer.tier > 0){
        censorEvents = false
    }


    const events = await scanEventsServer(locals, params, censorEvents)

    return Response.json(events)
};