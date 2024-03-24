import { cfetch } from "../utils"

export async function scanEvents(params:ScanPointParams):Promise<Event[]>{

    let events = await cfetch<Event[]>({
        url: `/api/events/scan`,
        method:"POST",
        body: params
    })

    return events!=null? events : []
}
