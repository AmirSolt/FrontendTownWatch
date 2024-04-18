

export function dictionarizeEvents(eventsDict: { [id: string]: Event }, events:Event[]):{ [id: string]: Event }{
    events.forEach(event => {
        let keyStr = `${event.lat}|${event.long}`
        eventsDict[keyStr] = event
    })
    return eventsDict
}

