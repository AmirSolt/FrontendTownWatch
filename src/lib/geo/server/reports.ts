import { error } from "@sveltejs/kit"
import { censorEventsQuery, geofetch } from "../utils"


export async function fetchReportDetails(reportID:string):Promise<ReportDetails>{

    if(reportID.length == 0){
        throw error(400, "Report ID is empty")
    }

    let reportDetails = await geofetch<ReportDetails>({
        relativeURL: `/api/reports/${reportID}`,
        method:"GET",
    })

    return reportDetails
}

export async function fetchEventsByReport(reportID:string, censorEvents:boolean):Promise<Event[]>{
    let events = await geofetch<Event[]>({
        relativeURL: `/api/reports/${reportID}?${censorEventsQuery(censorEvents)}`,
        method:"GET",
    })

    return events
}