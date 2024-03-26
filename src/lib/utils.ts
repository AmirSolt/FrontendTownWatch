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

