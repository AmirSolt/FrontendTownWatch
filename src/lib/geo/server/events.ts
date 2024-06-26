import { error } from "@sveltejs/kit";
import { censorEventsQuery, geofetch } from "../utils"
import { radiusSchema } from "../schema";


export async function scanEventsServer(locals:App.Locals, params:ScanPointParams,  censorEvents:boolean):Promise<Event[]>{

    if(!radiusSchema.safeParse(params.radius).success){
        throw error(400, "Radius input is wrong")
    }

    const currentDate = new Date();
    params.from_date= new Date(currentDate.getTime() - (30 * 24 * 60 * 60 * 1000)).toUTCString()
    params.to_date= currentDate.toUTCString()
    params.limit= 20

    let events = await geofetch<Event[]>({
        relativeURL: `/api/events/scan?${censorEventsQuery(censorEvents)}`,
        method:"POST",
        body: params
    })


    return events!=null? events : []
}

