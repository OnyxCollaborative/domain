// netlify/functions/check-domain.js

const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  // You can optionally allow a query parameter to override the default domain.
  // Otherwise, it defaults to "onyxcollaborative.com".
  const domain = event.queryStringParameters.domain || "onyxcollaborative.com";

  // Build the URL parameters.
  // For production, store these values in environment variables.
  const params = new URLSearchParams({
    ApiUser: "OnyxCollaborative",
    ApiKey: "260a57e6c3dc494fb2601cedf9720039",
    UserName: "OnyxCollaborative",
    Command: "namecheap.domains.check",
    ClientIp: "50.37.90.222",
    DomainList: domain
  });

  // Construct the full API URL.
  const apiUrl = `https://api.namecheap.com/xml.response?${params.toString()}`;

  try {
    // Make the request to Namecheap.
    const response = await fetch(apiUrl);
    const xmlResponse = await response.text();

    // Return the XML response with the proper content-type header.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/xml" },
      body: xmlResponse,
    };
  } catch (error) {
    console.error("Error calling Namecheap API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
