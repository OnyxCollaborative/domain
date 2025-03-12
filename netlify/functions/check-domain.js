const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const domain = event.queryStringParameters.domain;
  const ip = event.queryStringParameters.ip;
  const clientIp = ip;

  const params = new URLSearchParams({
    ApiUser: process.env.NAMECHEAP_API_USER,
    ApiKey: process.env.NAMECHEAP_API_KEY,
    UserName: process.env.NAMECHEAP_USERNAME,
    Command: "namecheap.domains.check",
    ClientIp: clientIp,
    DomainList: domain
  });

  const apiUrl = `https://api.namecheap.com/xml.response?${params.toString()}`;

  try {
    const response = await fetch(apiUrl);
    const xmlResponse = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: xmlResponse,
    };
  } catch (error) {
    console.error("Error calling Namecheap API:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};
