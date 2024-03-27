global class AccessTokenManager {
    private static String accessToken;

   // Method to set the access token
   global static void setAccessToken(String token) {
       accessToken = token;
   }

   // Method to get the access token
   global static String getAccessToken() {
       return accessToken;
   }
}