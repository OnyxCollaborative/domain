const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const domain = event.queryStringParameters.domain;
  const apiUrl = 'https://api.namecheap.com/xml.response';
  const params = new URLSearchParams({
    ApiUser: process.env.NAMECHEAP_API_USER,  // Store in environment variables
    ApiKey: process.env.NAMECHEAP_API_KEY,
    UserName: process.env.NAMECHEAP_USERNAME,
    Command: 'namecheap.domains.check',
    ClientIp: process.env.CLIENT_IP,
    DomainList: domain
  });
  
  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);
    const xmlText = await response.text();
    // Process XML response here (e.g., using an XML parser)
    // For brevity, just returning the raw XML response
    return {
      statusCode: 200,
      body: xmlText,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

