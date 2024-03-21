export async function fetchUserAreas(user:User|null|undefined):Promise<Area[]>{
    if(user==null){
        return []
    }

    return [
        {
            id:"asd",
            address:"Test"
        }
    ]
}
