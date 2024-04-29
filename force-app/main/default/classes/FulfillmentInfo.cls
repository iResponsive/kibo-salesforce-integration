public class FulfillmentInfo {

    public Integer id{ get; set; }
	public String email{ get; set; }
	public String firstName{ get; set; }
	public String middleNameOrInitial{ get; set; }
	public String lastNameOrSurname{ get; set; }
	public String companyOrOrganization{ get; set; }
	public PhoneNumbers phoneNumbers{ get; set; }
	public Address address{ get; set; }
	public Boolean isDestinationCommercial{ get; set; }
	public String shippingMethodCode{ get; set; }
	public String shippingMethodName{ get; set; }
	public Integer siteId{ get; set; }
	public String orderId{ get; set; }
	public class PhoneNumbers {
		public String home{ get; set; }
		public String mobile{ get; set; }
		public String work{ get; set; }
	}
	public class Address {
		public String address1{ get; set; }
		public String address2{ get; set; }
		public String address3{ get; set; }
		public String address4{ get; set; }
		public String cityOrTown{ get; set; }
		public String stateOrProvince{ get; set; }
		public String postalOrZipCode{ get; set; }
		public String countryCode{ get; set; }
		public String addressType{ get; set; }
		public Boolean isValidated{ get; set; }
	}   
}