public class OrderCancelData {
    @AuraEnabled
    public String orderId { get; set; }

    @AuraEnabled
    public String reasonCode { get; set; }

    @AuraEnabled
    public String description { get; set; }

    @AuraEnabled
    public String moreInfo { get; set; }
    
    @AuraEnabled
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