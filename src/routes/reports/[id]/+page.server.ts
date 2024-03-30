import { fetchEventsByReport, fetchReportDetails } from '$lib/geo/server/reports.js';
import { error } from '@sveltejs/kit';
import { z } from 'zod';

const reportIDSchema = z.string().min(1)

export const load = async ({locals, params}) => {
    const reportID:string = params.id
    if(!reportIDSchema.safeParse(reportID).success){
        throw error(400, "Url is broken")
    }
    const reportDetails = await fetchReportDetails(reportID)

    let reportCustomer:Customer|undefined
    if(reportDetails.report.user_id){
        try{
            reportCustomer = await locals.pb.collection('customers').getFirstListItem(`user.id="${reportDetails.report.user_id}"`);
        } catch(_){}
    }

    let showEventDetails = false
    if(reportCustomer!=null && reportCustomer.tier > 0){
        showEventDetails = true
    }

    const events = await fetchEventsByReport(reportID, showEventDetails)
    
    return {
        reportDetails,
        events,
        showEventDetails
    }

};