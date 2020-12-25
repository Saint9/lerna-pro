// http://www.cnblogs.com/rubylouvre/archive/2009/09/18/1568794.html
export default function (str, replaceBreak) {
  str = str.replace(/^\s\s*/, '')
  const ws = /\s/
  let i = str.length
  while (ws.test(str.charAt(--i))) {
    // eslint-disable-next-line no-var
    var rs = str.slice(0, i + 1)
  }
  if (!rs) {
    return ''
  }
  if (!replaceBreak) {
    return rs
  } else {
    return rs.replace(/(?:\r\n|\r|\n)/g, '')
  }
}
