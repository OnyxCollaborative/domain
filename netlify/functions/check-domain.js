const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const domain = event.queryStringParameters.domain || "onyxcollaborative.com";

  const params = new URLSearchParams({
    ApiUser: "OnyxCollaborative",
    ApiKey: "260a57e6c3dc494fb2601cedf9720039",
    UserName: "OnyxCollaborative",
    Command: "namecheap.domains.check",
    ClientIp: "50.37.90.222",
    DomainList: domain
  });

  const apiUrl = `https://api.namecheap.com/xml.response?${params.toString()}`;

  try {
    const response = await fetch(apiUrl);
    const xmlResponse = await response.text();

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

