const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Validate the data
    if (!data.type || !data.description) {
      return { statusCode: 400, body: 'Missing required fields' };
    }
    
    // Prepare the webhook payload
    const webhookData = {
      embeds: [{
        title: `New Ticket: ${data.type}`,
        description: data.description,
        color: 15548997,
        timestamp: new Date().toISOString(),
        footer: {
          text: "Project Blaze Ticket System"
        }
      }]
    };
    
    // Send to Discord
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookData),
    });
    
    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || '5';
      const waitTime = parseInt(retryAfter, 10) * 1000;
      
      await new Promise(resolve => setTimeout(resolve, waitTime));
      
      // Try again
      const retryResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookData),
      });
      
      if (!retryResponse.ok) {
        throw new Error('Failed after retry');
      }
    } else if (!response.ok) {
      throw new Error(`Discord returned ${response.status}`);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit ticket' })
    };
  }
}; 