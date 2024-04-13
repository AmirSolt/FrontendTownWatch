interface User {
    id :string
    name: string
    email:string
}

interface Customer {
    stripe_customer_id: string
    stripe_subscription_id: string
    tier: int
}


interface InputMapData {
    submissions:InputMapDataSubmission[]
}
interface InputMapDataSubmission {
    point:Point
    address:string
    radiuskm:number
    area:Area|undefined
}
interface OutputMapData {
    events:Event[]
    area:Area|undefined
    home:Point
    radius:number
    censorEvents:boolean
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