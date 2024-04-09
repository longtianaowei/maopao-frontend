export const formatTime = time => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份是从 0 开始的，所以要加 1
  const day = date.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}年${month}月${day}日`
  return formattedDate
}
