global with sharing class OrderController {
    @AuraEnabled
    global static List<Object> getOrderDetailsByOrderNumber(String orderNumber){
     	String accessToken = AuthController.getAuthToken();
           // System.debug('accessToken in getOrderDetailsByOrderNumber:: '+accessToken);
          	String baseURL = Constants.BASE_URL;
            String getOrderDetailsURI = Constants.GET_ORDERDETAILS_BY_ORDERNO_URI;
            
            HttpRequest request = new HttpRequest();
            request.setEndpoint(baseURL+getOrderDetailsURI+orderNumber);
            request.setMethod('GET');
            request.setHeader('Authorization', 'Bearer '+accessToken);  
       
           Http http = new Http();
           List<Object> items = null;
            try {
                HttpResponse response = http.send(request);
                if (response.getStatusCode() == 200) {
                  
                    String responseBody = response.getBody();
                   // System.debug('Response of Order details: ' + responseBody);
                    // Deserialize the JSON response
                    Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    items = (List<Object>)parsedResponse.get('orderDetails');
                   // System.debug('print orderDetails:::'+orderDetails);
                                                
                } else {
                    System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
                }
            } catch (Exception e) {
                System.debug('Exception caught: ' + e.getMessage());
            }
        
           return items;
    }

    @AuraEnabled
    global static List<Object> getOrderHistoryByEmailId(String emailId){
        String accessToken = AuthController.getAuthToken();
      //  System.debug('accessToken in getOrderHistoryByEmailId:: '+accessToken);
        String baseURL = Constants.BASE_URL;
        String getOrderHistoryURI = Constants.GET_ORDERHISTORY_BY_EMAIL_URI;
       
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseURL+getOrderHistoryURI+emailId);
        request.setMethod('GET');
        request.setHeader('Authorization', 'Bearer '+accessToken);
 
        Http http = new Http();
        List<Object> items = null;
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
              
                String responseBody = response.getBody();
                //System.debug('Response of Order details: ' + responseBody);
                // Deserialize the JSON response
				Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                items = (List<Object>)parsedResponse.get('orderHistory');
               // System.debug('print orderDetails:::'+orderDetails);
                            		
            } else {
                System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
            }
        } catch (Exception e) {
            System.debug('Exception caught: ' + e.getMessage());
        }
       return items;
     	
    }

    @AuraEnabled
    global static List<Object> getOrderCancellationReasons(){
        String accessToken = AuthController.getAuthToken();
      //  System.debug('accessToken in getOrderCancellationReasons:: '+accessToken);
        String baseURL = Constants.BASE_URL;
        String getOrderCancelReasonsURI = Constants.GET_ORDER_CANCEL_REASONS_URI;
       
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseURL+getOrderCancelReasonsURI);
        request.setMethod('GET');
        request.setHeader('Authorization', 'Bearer '+accessToken);
 
        Http http = new Http();
        List<Object> items = null;
        try {
          
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
              
                String responseBody = response.getBody();
               // System.debug('Response of getOrderCancellationReasons: ' + responseBody);
                // Deserialize the JSON response
				Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                items = (List<Object>)parsedResponse.get('orderCancelReasons');
               // System.debug('print orderDetails:::'+orderDetails);
                            		
            } else {
                System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
            }
        } catch (Exception e) {
            System.debug('Exception caught: ' + e.getMessage());
        }
       return items;
     	
    }
}