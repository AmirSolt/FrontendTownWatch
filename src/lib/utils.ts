import { error } from "@sveltejs/kit";
import _ from 'lodash';


interface RequestOptions {
    url:string
    method:string
    headers?:{ [id: string] : string; }
    body?:any
}

export async function cfetch<T>(options:RequestOptions): Promise<T> {

    const reqOptions = {
        method: options.method,
        headers: options.headers,
        body: options.body==null? null : JSON.stringify(options.body)
    }

    console.log(`>> CFETCH REQUEST >> url: ${options.url} |||| Body: ${JSON.stringify(options)}`);

    const response = await fetch(options.url, reqOptions);
    
    const data: any = await response.json();
    
    console.log(`>> CFETCH RESPONSE >> url: ${options.url} |||| Body: ${JSON.stringify(data)}`);



    if (!response.ok) {
        if(response.status == 401){
            throw error(response.status, `Unauthorized`);
        }
        const dataErr: ErrorGeoServer = data
        throw error(response.status, `error: ${dataErr.message} | error_id: ${dataErr.event_id}`);
    }

    const convertedData = parseInterface(data)

    const dataSucc: T = convertedData
    
    return dataSucc;
}


function parseInterface(json: any) {

    if(Array.isArray(json)){
        return json.map(el=>convertDateField(el))
    }

    if(Object.keys(json).length==0){
        return json
    }
    
    return convertDateField(json)
}


function convertDateField(obj: any): any {
    return _.transform(obj, (result: any, value: any, key: string | number) => {
        if (_.isString(value)) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                result[key] = date;
            } else {
                result[key] = value;
            }
        } else if (_.isObject(value)) {
            result[key] = convertDateField(value);
        } else {
            result[key] = value;
        }
    });
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

export function formatDateWithTimeToLocale(date: Date): string {
    const baseFormattedDate = formatDateToLocale(date);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${baseFormattedDate} ${hours}:${minutes}:${seconds}`;
}

export function orderByFieldDesc<T>(arr: T[], fieldName: keyof T): T[] {
    return arr.slice().sort((a, b) => {
        const dateA = a[fieldName] as Date
        const dateB = b[fieldName] as Date
        return dateB.getTime() - dateA.getTime() ;
    });
}



  