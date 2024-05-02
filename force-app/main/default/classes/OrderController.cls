public with sharing class OrderController {
    @AuraEnabled
    public static List<Object> getOrderDetailsByOrderNumber(String orderNumber){
     	String accessToken = AuthController.getAuthToken();
            System.debug('accessToken in getOrderDetailsByOrderNumber:: '+accessToken);
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
                    //System.debug('print orderDetails:::'+items);
                                                
                } else {
                    System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
                }
            } catch (Exception e) {
                System.debug('Exception caught: ' + e.getMessage());
            }
        
           return items;
    }

    @AuraEnabled
    public static List<Object> getOrderHistoryByEmailId(String emailId){
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
    public static List<Object> getOrderCancellationReasons(){
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
    
    @AuraEnabled
    public static Object cancelOrder(String jsonData){
        String accessToken = AuthController.getAuthToken();
       // System.debug('accessToken in cancelOrder:: '+accessToken);
         Object item = null;
        if(accessToken!=null){
            String baseURL = Constants.BASE_URL;
            String cancelOrderURI = Constants.CANCEL_ORDER_URI;
           
            HttpRequest request = new HttpRequest();
            request.setEndpoint(baseURL+cancelOrderURI);
            request.setMethod('PUT');
            request.setHeader('Authorization', 'Bearer '+accessToken);
            request.setHeader('Content-Type', 'application/json');
    
            //String jsonString = JSON.serialize(orderCancelData);
            request.setBody(jsonData);
            Http http = new Http();
           
            try {
              
                HttpResponse response = http.send(request);
                if (response.getStatusCode() == 200) {
                  
                    String responseBody = response.getBody();
                   // System.debug('Response of getOrderCancellationReasons: ' + responseBody);
                    // Deserialize the JSON response
                    Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    item = (Object)parsedResponse.get('cancelOrderResponse');
                   // System.debug('print orderDetails:::'+orderDetails);
                                        
                } else {
                    System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
     
                }
            } catch (Exception e) {
                System.debug('Exception caught: ' + e.getMessage());
            }
        }
       return item;
     	
    }
    
    @AuraEnabled
    public static Object editShipmentAddress(String jsonData){
               
        String accessToken = AuthController.getAuthToken();
       // System.debug('accessToken in editShipmentAddress:: '+accessToken);
        Object item = null;
        if(accessToken!=null){   
            String baseURL = Constants.BASE_URL;
            String editShipmentAddressURI = Constants.EDIT_SHIPMENT_ADDR_URI;
           
            HttpRequest request = new HttpRequest();
            request.setEndpoint(baseURL+editShipmentAddressURI);
            request.setMethod('PUT');
            request.setHeader('Authorization', 'Bearer '+accessToken);
            request.setHeader('Content-Type', 'application/json');
          
            //String jsonString = JSON.serialize(fulfillmentInfo);
           // System.debug('jsonString:: '+jsonString);
            request.setBody(jsonData);
            Http http = new Http();
          
            try {
             
                HttpResponse response = http.send(request);
                if (response.getStatusCode() == 200) {
                  
                    String responseBody = response.getBody();
                    System.debug('Response of editShipmentAddress: ' + responseBody);
                    // Deserialize the JSON response
                    Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                    item = (Object)parsedResponse.get('editShipmentAddressResponse');
                   // System.debug('print orderDetails:::'+orderDetails);
                                        
                } else {
                    System.debug('Error: HTTP request failed with status code ' + response.getStatusCode());
                     
                }
            } catch (Exception e) {
                System.debug('Exception caught: ' + e.getMessage());
            }
           
        }
        return item;
    }
}