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
