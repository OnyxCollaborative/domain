export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const domain = url.searchParams.get("domain");
    const ip = url.searchParams.get("ip");
    const clientIp = ip;

    const params = new URLSearchParams({
      ApiUser: env.USERNAME,
      ApiKey: env.API_KEY,
      UserName: env.USERNAME,
      Command: "namecheap.domains.check",
      ClientIp: clientIp,
      DomainList: domain
    });

    const apiUrl = `https://api.namecheap.com/xml.response?${params.toString()}`;

    try {
      const response = await fetch(apiUrl);
      const xmlResponse = await response.text();

      return new Response(xmlResponse, {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
        }
      });
    } catch (error) {
      console.error("Error calling Namecheap API:", error);
      return new Response(JSON.stringify({ error: error.toString() }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};


