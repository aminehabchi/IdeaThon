// fetcher function to fetch data from a given URL
// Example usage:
// fetcher({ url: '/api/data', method: 'GET' }) 
export async function fetcher({ url, method = 'GET', data = null, token = null }) {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const config = {
      method,
      headers,
    };
  
    if (data) {
      config.body = JSON.stringify(data);
    }
  
    try {
      const res = await fetch(url, config);
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return await res.json();
    } catch (err) {
      console.error('API Error:', err.message);
      throw err;
    }
  }
 