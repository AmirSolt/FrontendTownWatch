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


// the data needed for the interactive map on the landing page
interface Explore{
    point:Point
    address:string
    radiuskm:number
}
interface ExploreSubmission {
    explores:Explore[]
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