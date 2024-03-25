import { fetchGeocodeServer } from "$lib/here/geocoding.server.js";
import { error } from "@sveltejs/kit";

export const GET = async ({url}) => {
    const address:string|null = url.searchParams.get("address")

    if(address==null){
        error(400, "Address not found")
    }

    const point = await fetchGeocodeServer(address)

    return Response.json(point)
};