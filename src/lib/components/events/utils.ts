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
