import { error } from "@sveltejs/kit";
import { geofetch } from "../utils"
import { radiusSchema } from "../schema";


export async function scanEventsServer(locals:App.Locals, params:ScanPointParams,  censorEvents:boolean):Promise<Event[]>{

    if(!radiusSchema.safeParse(params.radius).success){
        throw error(400, "Radius input is wrong")
    }

    const currentDate = new Date();
    params.from_date= new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toUTCString()
    params.to_date= currentDate.toUTCString()
    params.limit= 100
    params.user_id=locals.user==null?"":locals.user.id

    let events = await geofetch<Event[]>({
        relativeURL: `/api/events/scan?${censorEventsQuery(censorEvents)}`,
        method:"POST",
        body: params
    })


    return events!=null? events : []
}

export function censorEventsQuery(censorEvents:boolean):string{
    return `censor_events=${String(censorEvents)}`
}