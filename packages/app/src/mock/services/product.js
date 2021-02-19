import Mock from 'mockjs'
import { queryParameters, builder } from '../util'
const Random = Mock.Random
const total = 100

const productList = (options) => {
  const parameters = queryParameters(options)
  console.log(parameters)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(total / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo > totalPage ? (total % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      // no: 'No ' + tmpKey,
      title: Random.csentence(),
      thumb: Random.dataImage('100x100', tmpKey),
      description: Random.cparagraph(),
      status: Mock.mock('@integer(0, 3)'),
      updatedAt: Mock.mock('@datetime'),
      editable: false
    })
  }

  return builder(result, total)
}

Mock.mock('/mock/product', 'post', productList)
