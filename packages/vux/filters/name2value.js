// import map from 'array-map'
// import find from 'array-find'

const specialMap = {
  北京市: '110100',
  天津市: '120100',
  上海市: '310100',
  重庆市: '500100'
}

export default function (name, list) {
  const rs = name.map((one, index) => {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = list.find(item => {
        return item.name === name[1]
      }) || { value: '__' }

      if (specialMap[name[0]]) {
        parent = {
          value: specialMap[name[0]]
        }
      }
      return list.find(item => {
        return item.name === one && item.parent === parent.value
      })
    } else {
      if (index === 1 && specialMap[name[0]]) {
        return {
          value: specialMap[name[0]]
        }
      }
      return list.find(item => {
        return item.name === one
      })
    }
  })

  return rs.map(one => {
    return one ? one.value : '__'
  }).join(' ')
}
