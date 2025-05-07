const get24HoursInMilliseconds = () => {
    return Date.now() + 24 * 60 * 60 * 1000; // returns a validity of 24Hours from current timedate.
}

export { get24HoursInMilliseconds };