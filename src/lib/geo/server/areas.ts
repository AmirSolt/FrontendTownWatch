import { error } from "@sveltejs/kit"
import { fetchGeo } from "./utils"

export async function fetchUserAreas(locals:App.Locals):Promise<Area[]>{
    if(locals.user==null){
        return []
    }

    let areas = fetchGeo<Area[]>({
        relativeURL: "/api/areas/user",
        method:"POST",
        body: {user_id:locals.user.id} as GetAreasByUserParams
    })

    return areas!=null? areas : []
}

export async function createUserArea(locals:App.Locals, params:CreateAreaParams):Promise<Area>{
    if(locals.user==null){
        throw error(401, "")
    }

    params.user_id = locals.user.id

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

    params.user_id = locals.user.id

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

    params.user_id = locals.user.id

    fetchGeo<any>({
        relativeURL: "/api/areas/delete",
        method:"DELETE",
        body: params
    })
}