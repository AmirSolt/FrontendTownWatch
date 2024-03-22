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
    events:Event[]
}

interface Point {
    lat:number
    long:number
}


// ==================
// Geo Server

interface ErrorGeoServer{
    message:string
    event_id:string
}


interface Area {
    ID: string;
    CreatedAt: string;
    UserID: string;
    IsActive: boolean;
    Address: string;
    Region: string;
    Radius: number;
    Point: string | null;
    Lat: number;
    Long: number;
}

interface Event {
    ID: number;
    CreatedAt: string;
    OccurAt: string;
    ExternalID: string;
    Neighborhood: string;
    LocationType: string;
    CrimeType: string; // You need to define CrimeType separately or use a string type
    Region: string;
    Point: string | null;
    Lat: number;
    Long: number;
}

interface Report {
    ID: string;
    CreatedAt: string;
    UserID: string;
    IsReported: boolean;
    AreaID: string;
}



