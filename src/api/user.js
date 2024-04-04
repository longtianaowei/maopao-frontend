import axios from '../utils/index'
export const userRegisterService = ({ checkPassword, planetCode, userAccount, userPassword }) =>
  axios.post('/user/register', { checkPassword, planetCode, userAccount, userPassword })

export const userLoginService = ({ userAccount, userPassword }) =>
  axios.post('/user/login', { userAccount, userPassword })

export const getCurrentUserService = () => axios.get('/user/current')

export const userLoginoutService = () => axios.post('/user/logout')

export const userRecommendService = () => axios.post('/user/recommend')

export const userUpdateService = (data) => axios.post('/user/update',data)

export const userUpdateAvatar = (formData) => axios.post('user/update/avatar',formData)


