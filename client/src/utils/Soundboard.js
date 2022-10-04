import store from '../store'
store.getters.config

// playEffect only runs beep, use playWeirdFileFormat() for running non mp3 audio
export function playEffect(effect, fileExtension = '.mp3') {

  if (!store.state.sfxEnabled) {
    return "Client has disabled sound effects"
  }

  try {
    const sound = new Audio(require(`../../assets/sfx/${effect}${fileExtension}`))
    sound.play()
  } catch (error) {
    console.warn(error)
    return `An error was encountered whilst running sound: ${effect}`
  }

  return `Soundboard ran sound: ${effect}`
}