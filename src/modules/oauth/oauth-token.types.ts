export interface OAuthToken {
  accessToken: string;
  tokenType: 'Bearer';
  expiresAt: Date;
}

export interface OAuthTokenResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresInSeconds: number;
}
