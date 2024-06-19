# Kibo-Salesforce Integration
This repository provides the codebase for the integration done between Salesforce platform and Kibo OMS. The purpose of this project is to use the Kibo OMS Order related data within the Salesforce Cases module for Order related tickets created in Salesforce.

# Overview 

## Existing Business Challenge :  
At Salesforce, the Support team faces delays in gathering order details manually. Our aim to overcome this challenge by streamlining the process within Salesforce through an integration with Kibo.  

## Objective:  
- Develop a specialized Salesforce application as a direct link to Kibo.  
- Effortlessly retrieve and utilize detailed order information, improving the support workflow.  
- Provide easy handling of Orders based on Customer request.

# Features 
- **Automatic Parsing:**  Application Intelligently extracts order number and Email Id from Case descriptions.  
- **Real-time Query:**  Dynamically connects to Kibo OMS to fetch comprehensive order details.  
- **In-ticket Display:**  Presents a detailed overview of Order Information directly within the Salesforce Cases interface.  
- **Actionable Features:**  Edit the Shipping address and Cancel the order upon customer request 

# How the application works
1. When a customer sends an email to the support team for any order related issue, a ticket is created at Salesforce Ticketing System - the Cases Module.<br>
2. Our internal application installed within the Salesforce Cases module reads the ticket description using the Salesforce querying model.
3. From the ticket description , the applicaiton parses the email id and order id if provided in the ticket.
4. The application makes API calls to the Middleware application using the order id or Email id.
5. The Middleware inturn makes API requests to Kibo for Authentication, and other Order related and Shipment related API's for fetching the respective data.
6. Kibo returns the API responses to the Middleware, which in turn responds to our Salesforce application.
7. Using the response data, the Order related information is rendered on our application screens.

# Technical Stack:

## Salesforce Application​
**Front-End framework:** LWC - Lightning Web Components<br>
**Back-End framework:**  Apex framework

## Middleware Application:​
Git repository link: https://github.com/iResponsive/Middleware-Kibo-Integration.git<br>
Serves as a proxy application layer to eliminate the CORS policy issue between Salesforce and Kibo<br>
**Backend Framework:** Node.js​<br>
**Hosting:** Azure Cloud​ / GCP
   
## Integration with Kibo OMS:​
**API Calls:** Utilizes various Kibo OMS API endpoints for retrieving order and shipment details.​<br>
**Authorization:** Connects to Kibo OMS using an API endpoint for obtaining access tokens​ for authorization.​
<br>Kibo is installed with the middleware application to connect with the OMS​
   
## Data Parsing and Manipulation:​
Language: JavaScript
Here are some documentation resources to get you started.

# Installation and Deployment

## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## References

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## Support
If you need help or have any questions about using the Salesforce-Kibo Integration, there are several resources available:

**Documentation:** Refer to the official documentation for detailed instructions on installation, configuration, and usage of the integration.<br>
**Issue Tracker:** If you encounter a bug or need to report an issue, please open a new issue on our GitHub repository.<br>
**Contact Us:** For further assistance or inquiries, feel free to contact our support team at [Salesforce Support](sf.iresponsive@gmail.com) We're here to help!<br>
