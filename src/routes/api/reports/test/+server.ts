import { geofetch } from '$lib/geo/utils.js';

export const GET = async () => {
    let reports = await geofetch({
        relativeURL:"/api/reports/test",
        method:"GET",
    })

    return Response.json(reports)
};