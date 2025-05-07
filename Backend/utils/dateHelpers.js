export const convertToReadableDateTime = (timestamp) => {
    const validTill = new Date(Date.now() + timestamp * 1000);

    const readableDateTime = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12: true
    }).format(validTill);

    return readableDateTime;
}