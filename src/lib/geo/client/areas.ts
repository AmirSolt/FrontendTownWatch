import { cfetch } from "$lib/utils"
import { error } from "@sveltejs/kit"

export async function createUserArea(params:CreateAreaParams):Promise<Area>{

    let area = await cfetch<Area>({
        url: "/api/areas/create",
        method:"POST",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function updateUserArea(params:UpdateAreaParams):Promise<Area>{
    let area = await cfetch<Area>({
        url: "/api/areas/update",
        method:"PATCH",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function deleteUserArea(params:DeleteAreaParams){
    await cfetch<any>({
        url: "/api/areas/delete",
        method:"DELETE",
        body: params
    })
}