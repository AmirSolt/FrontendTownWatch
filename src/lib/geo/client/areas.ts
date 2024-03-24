import { error } from "@sveltejs/kit"
import { cfetch } from "../utils"


export async function createUserArea(params:CreateAreaParams):Promise<Area>{

    let area = cfetch<Area>({
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
    let area = cfetch<Area>({
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
    cfetch<any>({
        url: "/api/areas/delete",
        method:"DELETE",
        body: params
    })
}