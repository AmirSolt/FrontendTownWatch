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
        console.log(`===========\n cfetch Response Data: ${JSON.stringify(response)}\n================`)

        if (!response.ok) {
            if(response.status == 401){
                throw error(response.status, `Unauthorized`);
            }
            const err: ErrorGeoServer = await response.json();
            throw error(response.status, `error: ${err.message} | error_id: ${err.event_id}`);
        }


        const data: T = await response.json();
        
        return data;
    // } catch (err) {
    //     throw error(400, `Error fetching data: ${err}`);
    // }
}

