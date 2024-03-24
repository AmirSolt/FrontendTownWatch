import { deleteUserAreaServer } from "$lib/geo/server/areas";

export const DELETE = async ({locals, request}) => {
    const params:DeleteAreaParams = await request.json();

    await deleteUserAreaServer(locals, params)

    return new Response()
};