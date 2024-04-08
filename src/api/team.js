import axios from '../utils/index'

export const teamAddService = data => axios.post('/team/add', data)

export const getTeamListPageService = queryObj => axios.get('team/list/page', { params: queryObj })

export const getTeamListService = ({status=0,searchText= ''}) => axios.get('/team/list', { params:{status,searchText}})

export const getTeamById = (id) => axios.get('/team/get',{params:{id}})

export const joinTeamService = ({ password, teamId }) =>
  axios.post('/team/join', { password, teamId })

export const quitTeamService = ({ teamId }) => axios.post('/team/quit', { teamId })

export const updateTeamService = data => axios.post('/team/update', data)

export const deleteTeamService = ({ id }) => axios.post('/team/delete', { id })

export const getMyCreateTeamList = ({searchText= ''}) => axios.get('/team/list/my/create',{params:{searchText}})

export const getMyJoinTeamList = ({searchText= ''}) => axios.get('/team/list/my/join',{params:{searchText}})

