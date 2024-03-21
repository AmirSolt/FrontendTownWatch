import { fetchUserAreas } from '$lib/components/areas/crud.server.js';
import { error } from '@sveltejs/kit';



export const load = async ({locals}) => {

    let areas = await fetchUserAreas(locals.user)


    return {
        user: locals.user,
        areas,
    }
};