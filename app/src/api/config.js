const enviorament = 'dev' // 'dev' or 'prod'
const is_dev = enviorament === 'dev'
const BASE_PROTOCOL = 'http://';
const BASE_DOMAIN = is_dev ? '192.168.0.17' : '186.28.163.43' ;
const BASE_PORT = '3000'
export const URL_SERVER = `${BASE_PROTOCOL}${BASE_DOMAIN}`;
// export const SOCKET_HOST = `${BASE_PROTOCOL}${BASE_DOMAIN}:${BASE_PORT}` ;
export const BASE_URL = `${BASE_PROTOCOL}${BASE_DOMAIN}:${BASE_PORT}/api`; //'http://192.168.56.1:3000'