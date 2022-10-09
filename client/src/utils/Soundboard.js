import store from '../store'
store.getters.config

// playEffect only runs beep, use playWeirdFileFormat() for running non mp3 audio
export function playEffect(effect, fileExtension = '.mp3') {
  try {
    const sound = new Audio(require(`../../assets/sfx/${effect}${fileExtension}`))
    sound.volume = parseInt(store.state.sfxVolume / 100)
    sound.play()
  } catch (error) {
    console.warn(error)
    return `An error was encountered whilst running sound: ${effect}`
  }

  return `Soundboard ran sound: ${effect}`
}

export function playSong(track, fileExtension = '.mp3') {
  let music;
  try {
    music = new Audio(require(`../../assets/tracks/${track}${fileExtension}`))
    music.volume = parseInt(store.state.musicVolume / 100)
    music.play()
  } catch (error) {
    console.warn(error)
  }

  return music
}