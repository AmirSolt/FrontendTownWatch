import { fetchReportsByArea } from '$lib/geo/server/reports.js';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';



const areaIDSchema = z.string().min(1)
export const load = async ({locals, params}) => {
    const areaID = params.area_id
    if(!areaIDSchema.safeParse(areaID).success){
        throw error(400, "Url is broken")
    }

    let reports = await fetchReportsByArea(locals, areaID)

 
    return {
        reports
    }
};