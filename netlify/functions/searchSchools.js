const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const API_KEY = process.env.NEIS_API_KEY;
    const { SCHUL_NM } = event.queryStringParameters;

    if (!SCHUL_NM) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'SCHUL_NM parameter is required' })
        };
    }

    const url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${API_KEY}&Type=json&SCHUL_NM=${encodeURIComponent(SCHUL_NM)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('School search error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch school data' })
        };
    }
};
