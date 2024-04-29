public class OrderCancelData {

    public String orderId { get; set; }
    public String reasonCode { get; set; }
    public String description { get; set; }
    public String moreInfo { get; set; }
    public Integer siteId { get; set; }
    
    // Constructor to initialize the properties
    public OrderCancelData(String orderId, String reasonCode, String description, String moreInfo, Integer siteId) {
        this.orderId = orderId;
        this.reasonCode = reasonCode;
        this.description = description;
        this.moreInfo = moreInfo;
		this.siteId = siteId;
    }
    
}