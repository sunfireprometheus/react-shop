
import setting from '../setting.json'
import axios from 'axios'
const ApiService = async (endpoint, req, method, call = null) => {
  try {
    const response = await axios({
      method: method,
      url: setting?.server + endpoint,
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      data: req || {}
    })
    return await response.data
  } catch (err) {
    console.log(err, 'error')
    return err
  }

}

export default ApiService;
// const ApiService = async (endpoint, req, method, call = null) => {
//   try {
//     const response = await fetch(setting?.server + endpoint, {
//       method: method,
//       headers: {
//         'cache-control': 'no-cache',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       },
//       data: JSON.stringify(req || {})
//     });
//     console.log(response, 'response')
//     // return await response.json()
//   } catch (err) {
//     console.log(err, 'error')
//     return err
//   }

// }


