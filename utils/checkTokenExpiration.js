import { decode } from 'base-64';

// returns true if access_token has expired or return false if not expired

function checkTokenExpiration(access_token) {

    if (!access_token) {
        // If access_token is not provided or is falsy, consider it expired.
        return true;
    }

    const tokenParts = access_token.split(".");
    if (tokenParts.length !== 3) {
        // Invalid token format; consider it expired.
        return true;
    }

    try {
        const payload = JSON.parse(decode(tokenParts[1])); // Decode the base64-encoded payload

        if (payload.exp && typeof payload.exp === "number") {
            // Check if the 'exp' claim (expiration time) exists and is a number
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);

            return payload.exp < currentTimeInSeconds; // Check if the token has expired
        } else {
            // 'exp' claim is missing or invalid; consider it expired.
            return true;
        }
    } catch (error) {
        console.log(error)
        // Error parsing payload; consider the token expired.
        return true;
    }
}
export default checkTokenExpiration