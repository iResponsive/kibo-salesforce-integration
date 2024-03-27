global class Constants {
	global static final String BASE_URL = 'https://kibo-api-proxy.azurewebsites.net';
    global static final String AUTH_URI = '/api/getToken';
    global static final String GET_ORDERDETAILS_BY_ORDERNO_URI = '/api/getOrderDetails/'; // order number param
    global static final String GET_ORDERHISTORY_BY_EMAIL_URI = '/api/getOrderHistoryByEmail/'; // email param
    global static final String GET_SHIPMENTDETAILS_BY_ORDERNO_URI = '/api/getShipmentDetails/';// order number
    global static final String GET_ORDER_CANCEL_REASONS_URI = '/api/getOrderCancelReasons';
    global static final String CANCEL_ORDER_URI = '/api/cancelOrder'; // PUT action
    global static final String EDIT_SHIPMENT_ADDR_URI = '/api/editShipmentAddress'; // PUT action
  
}