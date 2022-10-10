import store from '../store'
store.getters.config

// playEffect only runs beep, use playWeirdFileFormat() for running non mp3 audio
export function playEffect(effect, fileExtension = '.mp3') {
  const sound = new Audio(require(`../../assets/sfx/${effect}${fileExtension}`))
  sound.volume = parseInt(store.state.sfxVolume / 100)
  sound.play().catch(() => {
    console.warn(`${effect} blocked by browser`)
  })

  return `Soundboard ran sound: ${effect}`
}

export class SoundTrack {
  static playNew(track, fileExtension = '.mp3') {
    if (store.state.track) {
      store.state.track.pause()
    }

    store.state.track = new Audio(require(`../../assets/tracks/${track}${fileExtension}`))
    store.state.track.volume = parseInt(store.state.musicVolume) / 100
    store.state.track.play().catch(() => {
      store.state.blockedAudio = track
    })
  }
  static play() {
    if (!store.state.track?.play()) return
    store.state.track.play()
  }
  static pause() {
    if (!store.state.track?.pause()) return
    store.state.track.pause()
  }
  static setVolume() {
    if (!store.state.track?.volume) return
    store.state.track.volume = parseInt(store.state.musicVolume) / 100
  }
}