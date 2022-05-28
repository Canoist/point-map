const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

interface ITokens {
    refreshToken: string;
    accessToken: string;
    userId: string;
    expiresIn: number;
}

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600,
}: ITokens): void {
    const expireDate: number = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expireDate.toString());
}

export function removeAuthData(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate(): string | null {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId(): string | null {
    return localStorage.getItem(USERID_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
};

export default localStorageService;
