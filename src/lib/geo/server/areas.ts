import { error } from "@sveltejs/kit"
import { geofetch } from "../utils"
import { radiusSchema } from "../schema";

export async function fetchUserAreasServer(locals:App.Locals):Promise<Area[]>{
    if(locals.user==null){
        return []
    }

    let areas = await geofetch<Area[]>({
        relativeURL: "/api/areas/user",
        method:"POST",
        body: {user_id:locals.user.id} as GetAreasByUserParams
    })

    return areas!=null? areas : []
}

export async function createUserAreaServer(locals:App.Locals, params:CreateAreaParams):Promise<Area>{
    
    if(locals.user==null){
        throw error(401, "")
    }

    if(!radiusSchema.safeParse(params.radius).success){
        throw error(400, "Radius input is wrong")
    }

    params.user_id = locals.user.id

    let area = await geofetch<Area>({
        relativeURL: "/api/areas/create",
        method:"POST",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function updateUserAreaServer(locals:App.Locals, params:UpdateAreaParams):Promise<Area>{
    
    if(locals.user==null){
        throw error(401, "")
    }

    if(!radiusSchema.safeParse(params.radius).success){
        throw error(400, "Radius input is wrong")
    }

    params.user_id = locals.user.id

    let area = await geofetch<Area>({
        relativeURL: "/api/areas/update",
        method:"PATCH",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}

export async function deleteUserAreaServer(locals:App.Locals, params:DeleteAreaParams):Promise<Area>{
    if(locals.user==null){
        throw error(401, "")
    }

    params.user_id = locals.user.id

    let area = await geofetch<any>({
        relativeURL: "/api/areas/delete",
        method:"DELETE",
        body: params
    })

    if(area==null){
        throw error(500, "Internal Server Error")
    }

    return area
}