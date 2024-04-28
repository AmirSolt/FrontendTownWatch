import { scanEventsServer } from "$lib/geo/server/events";

export const POST = async ({locals, request}) => {
    const params:ScanPointParams = await request.json();

    const events = await scanEventsServer(locals, params, false)

    return Response.json(events)
};