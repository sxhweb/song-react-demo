import axios from "axios"

const http = axios.create({
  timeout: 3000
})

http.interceptors.request(() => {
  console.log('request')
})

http.interceptors.response((res) => {
  if (res.status !== '200') {
    throw new Error(res.toString())
  } else {
    return res
  }
})

export default http