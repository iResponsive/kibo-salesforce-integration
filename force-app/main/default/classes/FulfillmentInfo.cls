public class FulfillmentInfo {

    @AuraEnabled
    public Integer id{ get; set; }
    @AuraEnabled
	public String email{ get; set; }
    @AuraEnabled
	public String firstName{ get; set; }
    @AuraEnabled
	public String middleNameOrInitial{ get; set; }
    @AuraEnabled
	public String lastNameOrSurname{ get; set; }
    @AuraEnabled
	public String companyOrOrganization{ get; set; }
    @AuraEnabled
	public PhoneNumbers phoneNumbers{ get; set; }
    @AuraEnabled
	public Address address{ get; set; }
    @AuraEnabled
	public Boolean isDestinationCommercial{ get; set; }
    @AuraEnabled
	public String shippingMethodCode{ get; set; }
    @AuraEnabled
	public String shippingMethodName{ get; set; }
    @AuraEnabled
	public Integer siteId{ get; set; }
    @AuraEnabled
	public String orderId{ get; set; }

	public class PhoneNumbers {
        @AuraEnabled
		public String home{ get; set; }
        @AuraEnabled
		public String mobile{ get; set; }
        @AuraEnabled
		public String work{ get; set; }
	}

	public class Address {
        @AuraEnabled
		public String address1{ get; set; }
        @AuraEnabled
		public String address2{ get; set; }
        @AuraEnabled
		public String address3{ get; set; }
        @AuraEnabled
		public String address4{ get; set; }
        @AuraEnabled
		public String cityOrTown{ get; set; }
        @AuraEnabled
		public String stateOrProvince{ get; set; }
        @AuraEnabled
		public String postalOrZipCode{ get; set; }
        @AuraEnabled
		public String countryCode{ get; set; }
        @AuraEnabled
		public String addressType{ get; set; }
        @AuraEnabled
		public Boolean isValidated{ get; set; }
	}   
}