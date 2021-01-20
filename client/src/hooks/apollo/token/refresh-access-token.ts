export const refreshAccessToken = async () => {
    let accessToken, refreshToken

    if (!refreshToken) throw new Error('We cant refresh yet!')

    return {
        accessToken,
        refreshToken
    }
}