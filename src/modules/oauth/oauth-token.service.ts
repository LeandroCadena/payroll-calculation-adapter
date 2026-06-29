import type { OAuthToken, OAuthTokenResponse } from './oauth-token.types';

let cachedToken: OAuthToken | null = null;

const TOKEN_REFRESH_THRESHOLD_MS = 30_000;

const requestNewToken = async (): Promise<OAuthTokenResponse> => {
  // Este mock simula un Identity Provider OAuth2.
  // Más adelante podremos reemplazarlo por una llamada HTTP real sin cambiar el resto del flujo.
  return {
    accessToken: `mock-access-token-${Date.now()}`,
    tokenType: 'Bearer',
    expiresInSeconds: 300,
  };
};

const isTokenExpiringSoon = (token: OAuthToken): boolean => {
  return token.expiresAt.getTime() - Date.now() <= TOKEN_REFRESH_THRESHOLD_MS;
};

export const getValidOAuthToken = async (): Promise<OAuthToken> => {
  if (cachedToken && !isTokenExpiringSoon(cachedToken)) {
    return cachedToken;
  }

  const tokenResponse = await requestNewToken();

  cachedToken = {
    accessToken: tokenResponse.accessToken,
    tokenType: tokenResponse.tokenType,
    expiresAt: new Date(Date.now() + tokenResponse.expiresInSeconds * 1000),
  };

  return cachedToken;
};
