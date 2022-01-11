import axios from 'axios'
import { wrapper } from 'axios-cookiejar-support'
import { CookieJar } from 'tough-cookie'

const jar = new CookieJar()

const client = wrapper(axios.create({ 
  jar
}))

export default client