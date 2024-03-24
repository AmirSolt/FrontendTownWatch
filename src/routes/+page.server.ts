import { Region } from '$lib/enums.js';
import { fetchUserAreas } from '$lib/geo/server/areas.js';
import { scanEvents } from '$lib/geo/server/events.js';
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
const radiusSchema = z.number().positive();

export const actions = {
    address: async ({request})=>{
        const data = await request.formData();
		const address = data.get('address') as string
		let radiusKm = Number(data.get('radius')) as number
        console.log(">>>>radiusKm",radiusKm)

        if(radiusKm<1) radiusKm = 1
        
        if(!addressSchema.safeParse(address).success){
            throw error(400, "Address input is wrong")
        }
        if(!radiusSchema.safeParse(radiusKm).success){
            throw error(400, "Radius input is wrong")
        }
        
        let point = await fetchGeocode(address)
        
        // get customer

        const currentDate = new Date();
        const events = await scanEvents({
            lat: point.lat,
            long: point.long,
            radius: radiusKm,
            region: Region.TORONTO,
            from_date: new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000)).toUTCString(),
            to_date: currentDate.toUTCString(),
            limit: 100,
            address: address,
        }, false)

        return {
            explore:{point, events, address} as Explore
        }
    },
    create_area: async ()=>{

    },

};