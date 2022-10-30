
import { useState, useEffect } from 'react'
import setting from '../setting.json'

const ApiHooks = (endpoint, req, method, call) => {
  const [data, setData] = useState({ result: {}, error: false, loading: false });

  useEffect(() => {
    const getFetch = async () => {
      try {
        setData({ ...data, loading: true })
        const response = await fetch(setting?.server + endpoint, {
          method: method,
          headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json'
          },
          data: JSON.stringify(req || {})
        });
        const result = await response.json()
        setData({ result: result, error: false, loading: false })
      } catch (err) {
        console.log(err, 'error')
        setData({ result: err, error: true, loading: false })
      }

    }

    if (endpoint && req && method) {
      (call && !data.loading) && getFetch()
    }
  }, [endpoint, method]);

  return [data];
};

export default ApiHooks;
