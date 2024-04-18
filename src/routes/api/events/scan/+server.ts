import { scanEventsServer } from "$lib/geo/server/events";
import { isUserPremium, userFreeTrialDaysRemain } from "$lib/stripe/utils.js";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();
    let censorEvents = true

    if(isUserPremium(locals.customer) || userFreeTrialDaysRemain(locals.user)>0){
        censorEvents = false
    }


    const events = await scanEventsServer(locals, params, censorEvents)

    return Response.json(events)
};