// check-domain.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const domain = event.queryStringParameters.domain;
  const apiUrl = 'https://api.namecheap.com/xml.response';
  const params = new URLSearchParams({
    ApiUser: 'OnyxCollaborative',  // Store in environment variables
    ApiKey: '260a57e6c3dc494fb2601cedf9720039',
    UserName: 'OnyxCollaborative',
    Command: 'namecheap.domains.check',
    ClientIp: '50.37.90.222',
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



