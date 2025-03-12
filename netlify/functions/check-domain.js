const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const domain = event.queryStringParameters.domain;

  const params = new URLSearchParams({
    ApiUser: process.env.NAMECHEAP_API_USER ,
    ApiKey: process.env.NAMECHEAP_API_KEY,
    UserName: process.env.NAMECHEAP_USERNAME,
    Command: "namecheap.domains.check",
    ClientIp: process.env.CLIENT_IP,
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


