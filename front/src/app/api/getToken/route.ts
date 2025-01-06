/* eslint-disable */
interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export default async function POST(): Promise<AuthToken> {
  try {
    const response = await fetch("https://dev-4uohkqf0fwyqpje6.us.auth0.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-4uohkqf0fwyqpje6.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data = await response.json();
    return data as AuthToken;
  } catch (error: any) {
    console.error("Error fetching token:", error.message);
    throw new Error("Failed to fetch token");
  }
}
