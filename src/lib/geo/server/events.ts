import { geofetch } from "../utils"

export async function scanEventsServer(params:ScanPointParams,  censorEvents:boolean):Promise<Event[]>{

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