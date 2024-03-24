import { createUserAreaServer } from "$lib/geo/server/areas";

export const POST = async ({locals, request}) => {
    const params:CreateAreaParams = await request.json();

    const area = await createUserAreaServer(locals, params)

    return Response.json(area)
};