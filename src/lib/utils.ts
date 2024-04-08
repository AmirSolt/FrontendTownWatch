import { error } from "@sveltejs/kit";


interface RequestOptions {
    url:string
    method:string
    headers?:{ [id: string] : string; }
    body?:any
}

export async function cfetch<T>(options:RequestOptions): Promise<T> {

    // try {
        console.log(`===========\n cfetch Req URL: ${options.url} || Body: ${JSON.stringify(options.body)}\n================`)
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body==null? null : JSON.stringify(options.body)
        });

        const data: any = await response.json();

        console.log(`===========\n cfetch Response Data: ${JSON.stringify(data)}\n================`)

        if (!response.ok) {
            if(response.status == 401){
                throw error(response.status, `Unauthorized`);
            }
            const dataErr: ErrorGeoServer = data
            throw error(response.status, `error: ${dataErr.message} | error_id: ${dataErr.event_id}`);
        }


        const dataSucc: T = data
        
        return dataSucc;
    // } catch (err) {
    //     throw error(400, `Error fetching data: ${err}`);
    // }
}




export function calculateDistance(point1: Point, point2: Point): number {
    const EARTH_RADIUS = 6371000; // Earth's radius in meters

    function degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    const lat1 = degreesToRadians(point1.lat);
    const lat2 = degreesToRadians(point2.lat);
    const long1 = degreesToRadians(point1.long);
    const long2 = degreesToRadians(point2.long);

    const dLat = lat2 - lat1;
    const dLong = long2 - long1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLong / 2) * Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = EARTH_RADIUS * c;
    return distance;
}



export function stringToDate(isoDateString: string): Date {
    return new Date(isoDateString);
}

export function formatDateToLocale(date: Date): string {
    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month} ${year}`;
}
