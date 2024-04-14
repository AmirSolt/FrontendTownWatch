import { fetchReportsByUser } from '$lib/geo/server/reports.js';
import { error, redirect } from '@sveltejs/kit';


export const load = async ({locals}) => {


    let reports = await fetchReportsByUser(locals)

 
    return {
        reports
    }
};