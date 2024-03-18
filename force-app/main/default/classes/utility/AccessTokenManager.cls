public class AccessTokenManager {
 	private static String accessToken;

    // Method to set the access token
    public static void setAccessToken(String token) {
        accessToken = token;
    }

    // Method to get the access token
    public static String getAccessToken() {
        return accessToken;
    }
}