import store from '../store'
store.getters.config

// playEffect only runs beep, use playWeirdFileFormat() for running non mp3 audio
export function playEffect(effect, fileExtension = '.mp3') {
  const sound = new Audio(require(`../../assets/sfx/${effect}${fileExtension}`))
  sound.volume = parseInt(store.state.sfxVolume) / 100
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
  static setVolume(newVolume) {
    // validates new volume
    const VOL = parseInt(newVolume)
    if (isNaN(VOL)) {
      return console.warn(`SoundTrack: Volume adjustment ${newVolume} not valid`)
    }
    if (VOL < 0 || VOL > 100) {
      return console.warn(`SoundTrack: Volume adjustment ${VOL} out of range (0-100)`)
    } 

    // sets new volume
    store.state.musicVolume = VOL

    // applies new volume if track exists
    if (typeof store.state.track?.volume === 'undefined') return
    store.state.track.volume = store.state.musicVolume / 100
  }
}