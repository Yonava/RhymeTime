export const getWordPair = () => {
  // return a random pair of rhyming words
  const wordPairs = [
    ['win', 'begin'],
    ['sick', 'quick'],
    ['phone', 'alone'],
    ['fail', 'ail'],
    ['cheer', 'near'],
    ['year', 'clear'],
    ['tier', 'career'],
    ['hear', 'spear'],
    ['income', 'alum'],
    ['dime', 'lime'],
    ['dine', 'airline'],
    ['fine', 'wine'],
    ['crime', 'time'],
    ['chime', 'prime'],
    ['drive', 'alive'],
    ['live', 'give'],
    ['judge', 'budge']
  ]
  const randomIndex = Math.floor(Math.random() * wordPairs.length)
  return wordPairs[randomIndex]
}