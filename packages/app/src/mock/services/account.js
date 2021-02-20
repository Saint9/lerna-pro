import Mock from 'mockjs'
import { builder } from '../util'

const account = () => {
  const userInfo = {
    name: '小明',
    username: 'admin',
    avatar: '/avatar.jpg'
  }

  return builder(userInfo)
}

Mock.mock('/mock/userInfo', 'post', account)
