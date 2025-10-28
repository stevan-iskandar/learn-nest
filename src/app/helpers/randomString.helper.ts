export default (length: number = 40) => {
  const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length }).reduce<string>(result => {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length)
    return result + allowedCharacters[randomIndex]
  }, '')
}