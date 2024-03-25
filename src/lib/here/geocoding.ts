import { cfetch } from "$lib/utils"
import { error } from "@sveltejs/kit"



export async function fetchGeocode(address:string):Promise<Point>{
    let point = await cfetch<Point>({
        url: `/api/here/geocode?address=${address}`,
        method:"GET",
    })

    if(point==null){
        throw error(500, "Internal Server Error")
    }

    return point
}