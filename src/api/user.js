import axios from '../utils/index'
export const userRegisterService = ({ checkPassword, planetCode, userAccount, userPassword }) =>
  axios.post('/user/register', { checkPassword, planetCode, userAccount, userPassword })

export const userLoginService = ({ userAccount, userPassword }) =>
  axios.post('/user/login', { userAccount, userPassword })

export const getCurrentUserService = () =>
  axios.get('/user/current')
