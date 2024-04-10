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

interface GetReportsByUserParams {
    user_id: string;
}

interface GetReportsByAreaParams {
    user_id: string;
    area_id: string;
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
    created_at: Date;
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
    created_at: Date | null;
    occur_at: Date | null;
    external_id: string;
    neighborhood: string | null;
    location_type: string | null;
    crime_type: string;
    point: string | null;
    lat: number;
    long: number;
}

interface Report {
    id: string;
    created_at: Date;
    user_id: string;
    area_id: string;
}



