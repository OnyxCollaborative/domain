// netlify/functions/check-domain.js

exports.handler = async (event, context) => {
  // Extract domain parameter from the query string
  const domain = event.queryStringParameters.domain || 'example.com';

  // Here, you would typically call your backend service or API (like Namecheap API)
  // For demonstration, we'll return a static response:
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Checking domain availability for ${domain}` }),
  };
};


