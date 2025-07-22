const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const API_KEY = process.env.NEIS_API_KEY;
    const { ATPT_OFCDC_SC_CODE, SD_SCHUL_CODE, MLSV_YMD, MMEAL_SC_CODE } = event.queryStringParameters;

    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${MLSV_YMD}&MMEAL_SC_CODE=${MMEAL_SC_CODE}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch meal data' })
        };
    }
};