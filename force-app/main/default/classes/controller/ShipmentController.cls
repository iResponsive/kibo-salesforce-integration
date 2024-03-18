public class ShipmentController {

    @AuraEnabled
    public static List<Object> getShipmentDetailsByOrderNumber(String orderNumber){
        String accessToken = AuthController.getAuthToken();
           // System.debug('accessToken in getOrderDetailsByOrderNumber:: '+accessToken);
        String baseURL = Constants.BASE_URL;
        String getShipmentDetailsURI = Constants.GET_SHIPMENTDETAILS_BY_ORDERNO_URI;
        
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseURL+getShipmentDetailsURI+orderNumber);
        request.setMethod('GET');
        request.setHeader('Authorization', 'Bearer '+accessToken);
        
        
        Http http = new Http();
       List<Object> items = null;
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
              
                String responseBody = response.getBody();
                //System.debug('Response of getShipmentDetailsByOrderNumber: ' + responseBody);
                // Deserialize the JSON response
                // // String is the key and object will be the list : orderDetails tag
               // List<Map<String, Object>> responseArray = (List<Map<String, Object>>) JSON.deserializeUntyped(responseBody);
				Map<String, Object> parsedResponse = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
                items = (List<Object>)parsedResponse.get('shipmentDetails');
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