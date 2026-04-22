exports.handler = async (event) => {
  const GAS_URL = process.env.GAS_URL;
  if (!GAS_URL) {
    return { statusCode: 500, body: JSON.stringify({ success: false, hata: 'GAS_URL ayarlanmamış' }) };
  }
  const params = event.queryStringParameters || {};
  const action = params.action;
  const data = params.data || '{}';
  if (!action) {
    return { statusCode: 400, body: JSON.stringify({ success: false, hata: 'action gerekli' }) };
  }
  try {
    const gasUrl = GAS_URL + '?action=' + encodeURIComponent(action) + '&data=' + encodeURIComponent(data);
    const response = await fetch(gasUrl, { redirect: 'follow' });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: text,
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ success: false, hata: e.message }) };
  }
};
