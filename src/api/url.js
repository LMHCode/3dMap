const dev = {
  apiUrl: ' http://127.0.0.1:7777'
}

const pre = {
  apiUrl: ''
}

const pro = {
  apiUrl: ''
}

let urlObj
switch (process.env.NODE_ENV) {
  case 'pre':
    urlObj = pre
    break
  case 'production':
    urlObj = pro
    break
  default:
    urlObj = dev
    break
}

export default urlObj