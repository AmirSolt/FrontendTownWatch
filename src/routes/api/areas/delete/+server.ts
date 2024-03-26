import { deleteUserAreaServer } from "$lib/geo/server/areas";

export const DELETE = async ({locals, request}) => {
    const params:DeleteAreaParams = await request.json();

    let area = await deleteUserAreaServer(locals, params)

    return Response.json(area)
};