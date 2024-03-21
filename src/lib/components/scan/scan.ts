
export async function fetchEvents(lat:number, long:number, radius:number):Promise<Event[]>{

    let minLat = 43.8313
    let maxLat = 43.8415
    let minLong = -79.5015
    let maxLong = -79.5211
    return [
        {
            crimeType:"Test",
            lat:(Math.random() * (maxLat - minLat + 1)) + minLat,
            long:(Math.random() * (maxLong - minLong + 1)) + minLong,
        } ,
    ] as Event[]
}

export function dictionarizeEvents(eventsDict: { [id: string]: Event }, events:Event[]):{ [id: string]: Event }{
    events.forEach(event => {
        let keyStr = `${event.lat}|${event.long}`
        eventsDict[keyStr] = event
    })
    return eventsDict
}