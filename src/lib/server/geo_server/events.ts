import { fetchGeo } from "./utils"

export async function scanEvents(params:ScanPointParams,  censorEvents:boolean):Promise<Event[]>{

    let events = fetchGeo<Event[]>({
        relativeURL: `/api/events/scan?${censorEventsQuery(censorEvents)}`,
        method:"POST",
        body: params
    })

    return events
}

export function censorEventsQuery(censorEvents:boolean):string{
    return `censor_events=${String(censorEvents)}`
}