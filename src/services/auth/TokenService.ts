export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

function getLocalRefreshToken(): Tokens["refreshToken"] | null {
  const refreshToken = localStorage.getItem("refreshToken");

  return refreshToken;
}
function getLocalAccessToken(): Tokens["accessToken"] | null {
  const refreshToken = localStorage.getItem("accessToken");

  return refreshToken;
}
function updateLocalTokens(tokens: Tokens) {
  localStorage.setItem("refreshToken", tokens.refreshToken);
  localStorage.setItem("accessToken", tokens.accessToken);
}
function removeLocalTokens() {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
}

export const TokenService = {
  getLocalAccessToken,
  getLocalRefreshToken,
  updateLocalTokens,
  removeLocalTokens,
};
