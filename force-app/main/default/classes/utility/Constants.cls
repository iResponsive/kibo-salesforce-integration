public class Constants {
	public static final String BASE_URL = 'https://kibo-api-proxy.azurewebsites.net';
    public static final String AUTH_URI = '/api/getToken';
    public static final String GET_ORDERDETAILS_BY_ORDERNO_URI = '/api/getOrderDetails/'; // order number param
    public static final String GET_ORDERHISTORY_BY_EMAIL_URI = '/api/getOrderHistoryByEmail/'; // email param
    public static final String GET_SHIPMENTDETAILS_BY_ORDERNO_URI = '/api/getShipmentDetails/';// order number
    public static final String GET_ORDER_CANCEL_REASONS_URI = '/api/getOrderCancelReasons';
    public static final String CANCEL_ORDER_URI = '/api/cancelOrder'; // PUT action
    public static final String EDIT_SHIPMENT_ADDR_URI = '/api/editShipmentAddress'; // PUT action
  
}