import { scanEventsServer } from "$lib/geo/server/events";
import { isUserPremium, isUserFreeTrial } from "$lib/stripe/utils.js";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();
    let censorEvents = true

    if(isUserPremium(locals.customer) || isUserFreeTrial(locals.user)){
        censorEvents = false
    }


    const events = await scanEventsServer(locals, params, censorEvents)

    return Response.json(events)
};