const getToken = async (): Promise<string | null> => {
    try {
          const response = await fetch("/api/getToken", {
            method: "POST",
          });
          if (!response.ok) {
            throw new Error("Failed to fetch token");
          }

          const data = await response.json();
          console.log("Token fetched:", data.access_token);
          return data.access_token;
    } catch (error) {
          console.error("Error fetching token:", error);
          return null;
    }
  };
  
  export default getToken;
