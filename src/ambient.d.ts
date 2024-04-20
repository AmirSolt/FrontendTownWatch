interface User {
    id :string
    name: string
    email:string
    created:string
}

interface Customer {
    stripe_customer_id: string
    stripe_subscription_id: string
    tier: int
}


interface QueueMapData {
    queue:LandingPageMapData[]
}
interface MapControls{
    address:string
    radiuskm:number
}
interface LandingPageMapData {
    events?:Event[]|undefined
    area?:Area|undefined
    home:Point
    radius:number
    address:string
    canBeAddedToAreas:boolean
}

interface Point {
    lat:number
    long:number
}




interface UserServerClientResponseError {
    url:           string,     
    status:        number,    
    response:      {code: string, message:string, data:any},    
    isAbort:       boolean,    
    originalError: Error|null, 
}