const getVerificationTokenExpireTime = () => {
    return Date.now() + 5 * 60 * 1000; // returns a validity of 5 minutes from current timedate.
}

export { getVerificationTokenExpireTime };