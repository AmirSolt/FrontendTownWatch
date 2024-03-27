interface CreateAreaParams {
    user_id?: string;
    address: string;
    radius: number;
    lat: number;
    long: number;
}

interface DeleteAreaParams {
    id: string;
    user_id?: string;
}

interface GetAreaParams {
    id: string;
    user_id?: string;
}

interface UpdateAreaParams {
    id: string;
    user_id?: string;
    address: string;
    radius: number;
    lat: number;
    long: number;
}

interface GetAreasByUserParams {
    user_id: string;
}


interface ScanPointParams {
    lat: number;
    long: number;
    radius: number;
    from_date?: string; 
    to_date?: string;
    limit?: number;
    address:string;
    user_id?:string;
}


interface GetReportDetailsParams {
    id:string
}

interface ReportDetails {
    report:Report
    area:Area
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



