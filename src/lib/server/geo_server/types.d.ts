interface CreateAreaParams {
    userID: string;
    address: string;
    region: string;
    radius: number;
    lat: number;
    long: number;
}

interface DeleteAreaParams {
    ID: string;
    userID: string;
}

interface GetAreaParams {
    ID: string;
    userID: string;
}

interface UpdateAreaParams {
    ID: string;
    userID: string;
    address: string;
    radius: number;
    lat: number;
    long: number;
}

interface GetAreasByUserParams {
    userID: string;
}


interface ScanPointParams {
    lat: number;
    long: number;
    radius: number;
    region: string;
    fromDate: string; 
    toDate: string;
    scanEventsCountLimit: number;
}
