export function parseJwt(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload =
    base64 &&
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  if (jsonPayload) {
    return JSON.parse(jsonPayload);
  }
  return {};
}

export const isAccessTokenExpired = (accessToken: string) => {
  if (accessToken) {
    try {
      const decodedToken = parseJwt(accessToken);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  } else {
    return true;
  }
};
