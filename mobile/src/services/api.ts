import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://<<ip do host>>:3333'
});