import { error } from "@sveltejs/kit"
import { fetchGeo } from "./utils"

export async function fetchUserAreas(locals:App.Locals):Promise<Area[]>{
    if(locals.user==null){
        throw error(401, "")
    }

    let areas = fetchGeo<Area[]>({
        relativeURL: "/api/areas/user",
        method:"POST",
        body: {userID:locals.user.id} as GetAreasByUserParams
    })

    return areas
}

export async function createUserArea(locals:App.Locals, params:CreateAreaParams):Promise<Area>{
    if(locals.user==null){
        throw error(401, "")
    }

    params.userID = locals.user.id

    let area = fetchGeo<Area>({
        relativeURL: "/api/areas/create",
        method:"POST",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function updateUserArea(locals:App.Locals, params:UpdateAreaParams):Promise<Area>{
    if(locals.user==null){
        throw error(401, "")
    }

    params.userID = locals.user.id

    let area = fetchGeo<Area>({
        relativeURL: "/api/areas/update",
        method:"PATCH",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function deleteUserArea(locals:App.Locals, params:DeleteAreaParams){
    if(locals.user==null){
        throw error(401, "")
    }

    params.userID = locals.user.id

    fetchGeo<any>({
        relativeURL: "/api/areas/delete",
        method:"DELETE",
        body: params
    })
}