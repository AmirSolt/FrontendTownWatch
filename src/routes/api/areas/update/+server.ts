import { updateUserAreaServer } from "$lib/geo/server/areas";

export const PATCH = async ({locals, request}) => {
    const params:UpdateAreaParams = await request.json();

    const area = await updateUserAreaServer(locals, params)

    return Response.json(area)
};