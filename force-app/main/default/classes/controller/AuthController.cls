public class AuthController {
    
    @AuraEnabled
    public static String getAuthToken(){
        // String accessToken = '';
        String accessToken = AccessTokenManager.getAccessToken();
        if (accessToken != null) {
            System.debug('In IF condition check for accessToken:: '+accessToken);
             return accessToken;
        }else{
            System.debug('In ELSE condition check for accessToken:: '+accessToken);
            String baseURL = Constants.BASE_URL;
            String getTokenURI = Constants.AUTH_URI;
            
            HttpRequest request = new HttpRequest();
            request.setEndpoint(baseURL+getTokenURI);
            request.setMethod('GET');
            
            Http http = new Http();
           
            try {
               
                HttpResponse response = http.send(request);
    
                if (response.getStatusCode() == 200) {
                  
                    String responseBody = response.getBody();
                    System.debug('Response: ' + responseBody);
                    // Deserialize the JSON response
                    Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    Object value = parsedResponse.get('accessToken');
                    if(value!=null){
                       accessToken = (String)value; 
                       AccessTokenManager.setAccessToken(accessToken);
                    }
                                                    
                } else {
                    System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
                }
            } catch (Exception e) {
                System.debug('Exception caught: ' + e.getMessage());
            }
            return accessToken;
         }
          
    }
}