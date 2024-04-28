


interface ScanPointParams {
    lat: number;
    long: number;
    radius: number;
    from_date?: string; 
    to_date?: string;
    limit?: number;
    address:string;
}



// ==================
// Geo Server

interface ErrorGeoServer{
    message:string
    event_id:string
}


interface Event {
    id: number;
    created_at: Date;
    occur_at: Date;
    external_id: string;

    details:{[key:string]:string};

    point: string | null;
    lat: number;
    long: number;
}



