import { Region } from '$lib/enums.js';
import { fetchUserAreas } from '$lib/server/geo_server/areas.js';
import { scanEvents } from '$lib/server/geo_server/events.js';
import { fetchGeocode } from '$lib/server/here/geocoding.js';
import { error } from '@sveltejs/kit';
import { z } from "zod";




export const load = async ({locals}) => {
    let areas = await fetchUserAreas(locals)
    return {
        user: locals.user,
        areas,
    }
};

const addressSchema = z.string().min(1).max(12);
const radiusSchema = z.number().positive().max(100);

export const actions = {
    address: async ({request})=>{
        const data = await request.formData();
		const address = data.get('address') as string
		const radius = Number(data.get('radius')) as number

        
        if(!addressSchema.safeParse(address).success){
            throw error(400, "Address input is wrong")
        }
        if(!radiusSchema.safeParse(radius).success){
            throw error(400, "Radius input is wrong")
        }
        
        let point = await fetchGeocode(address)
        
        // get customer

        const currentDate = new Date();
        const events = await scanEvents({
            lat: point.lat,
            long: point.long,
            radius: radius,
            region: Region.TORONTO,
            fromDate: new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toUTCString(),
            toDate: currentDate.toUTCString(),
            scanEventsCountLimit: 100,
        }, true)

        return {
            explore:{point, events} as Explore
        }
    }
};