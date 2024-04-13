import { fetchUserAreasServer } from '$lib/geo/server/areas.js';
import { error } from '@sveltejs/kit';

export const load = async ({locals}) => {

    let areas = await fetchUserAreasServer(locals)
    return {
        user: locals.user,
        areas,
    }
};

