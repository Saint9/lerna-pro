const responseBody = {
  data: null,
  flag: true,
  message: 'SUCCESS'
}

const listBody = {
  flag: true,
  list: [],
  message: 'SUCCESS',
  total: 0
}

export const builder = (data, total) => {
  if (total !== undefined) {
    listBody.list = data
    listBody.total = total
    return listBody
  }
  responseBody.data = data
  return responseBody
}

export const queryParameters = (options) => {
  if (options.type && options.type === 'POST') {
    return JSON.parse('{"' + decodeURIComponent(options.body)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') + '"}')
  }
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}
