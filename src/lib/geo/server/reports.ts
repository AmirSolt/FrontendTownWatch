import { error } from "@sveltejs/kit"
import { censorEventsQuery, geofetch } from "../utils"



export async function fetchReportsByUser(locals:App.Locals):Promise<Report[]>{
    if(locals.user==null){
        return []
    }


    let reports = await geofetch<Report[]>({
        relativeURL: `/api/reports/user`,
        method:"POST",
        body:{
            user_id:locals.user.id
        } as GetReportsByUserParams
    })

    return reports!=null? reports : []
}


export async function fetchReportsByArea(locals:App.Locals, areaID:string):Promise<Report[]>{
    if(locals.user==null){
        return []
    }


    let reports = await geofetch<Report[]>({
        relativeURL: `/api/reports/area`,
        method:"POST",
        body:{
            user_id:locals.user.id,
            area_id:areaID
        } as GetReportsByAreaParams
    })

    return reports!=null? reports : []
}


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
        relativeURL: `/api/reports/${reportID}/events?${censorEventsQuery(censorEvents)}`,
        method:"GET",
    })

    return events
}