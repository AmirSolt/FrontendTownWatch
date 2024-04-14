import { scanEventsServer } from "$lib/geo/server/events";
import { isCustomerPremium } from "$lib/stripe/utils.js";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();
    let censorEvents = true

    if(isCustomerPremium(locals.customer)){
        censorEvents = false
    }


    const events = await scanEventsServer(locals, params, censorEvents)

    return Response.json(events)
};