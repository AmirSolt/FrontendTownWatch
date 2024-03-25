import { error } from "@sveltejs/kit";


interface RequestOptions {
    url:string
    method:string
    headers?:{ [id: string] : string; }
    body?:any
}

export async function cfetch<T>(options:RequestOptions): Promise<T> {

    // try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body==null? null : JSON.stringify(options.body)
        });
        console.log(`===========\n Req URL: ${options.url} || Body: ${JSON.stringify(options.body)}\n================`)

        if (!response.ok) {
            if(response.status == 401){
                throw error(response.status, `Unauthorized`);
            }
            console.log(`===========\n Response Error: ${JSON.stringify(response)}\n================`)
            const err: ErrorGeoServer = await response.json();
            throw error(response.status, `error: ${err.message} | error_id: ${err.event_id}`);
        }


        console.log(`===========\n Response Date: ${JSON.stringify(response)}\n================`)
        const data: T = await response.json();
        
        return data;
    // } catch (err) {
    //     throw error(400, `Error fetching data: ${err}`);
    // }
}

