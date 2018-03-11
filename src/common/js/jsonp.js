import originJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (const key in data) {
    let value = data[key] !== undefined ? data[key] : ''
    url += '&' + key + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
