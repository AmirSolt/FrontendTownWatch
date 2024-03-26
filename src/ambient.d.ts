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
    events:{ [id: string]: Event }
    firstAddressSearchCompleted:bool
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
    id: string;
    created_at: string;
    user_id: string;
    is_active: boolean;
    address: string;
    region: string;
    radius: number;
    point: string | null;
    lat: number;
    long: number;
}

interface Event {
    id: number;
    created_at: string;
    occur_at: string;
    external_id: string;
    neighborhood: string;
    location_type: string;
    crime_type: string; // You need to define CrimeType separately or use a string type
    region: string;
    point: string | null;
    lat: number;
    long: number;
}

interface Report {
    id: string;
    created_at: string;
    user_id: string;
    is_reported: boolean;
    area_id: string;
}



