import { API_URL } from "../utils/constants.js"

export default async function fetchManager(args){
  const { path, method='GET', body, headers } = args
  let url = API_URL + path
  const options = {
    method,
    headers: {
      'content-type': 'application/json'
    }
  }
  if (body) {
    options.body = JSON.stringify(body)
  }
  if (headers) {
    options.headers = { ...options.headers, ...headers }
  }
  console.log('[REQUEST]') // 로그 확인용
  console.log(JSON.stringify({ url, ...options}, null, 2))
  const result = await fetch(url, options)
  const res = await result.json() // 로그를 찍기위해 res 변수에 할당
  console.log('[RESPONSE]')
  console.log(JSON.stringify(res, null, 2))
  return res
}
