import store from '../store'
store.getters.config
const state = store.state

// playEffect only runs beep, use playWeirdFileFormat() for running non mp3 audio
export function playEffect(effect, fileExtension = '.mp3') {
  const sound = new Audio(require(`../../assets/sfx/${effect}${fileExtension}`))
  sound.volume = parseInt(state.sfxVolume) / 100
  sound.play().catch(() => {
    console.warn(`${effect} blocked by browser`)
  })

  return `Soundboard ran sound: ${effect}`
}

export class SoundTrack {
  static playNew(track, fileExtension = '.mp3') {
    if (state.track) {
      state.track.pause()
    }

    state.track = new Audio(require(`../../assets/tracks/${track}${fileExtension}`))
    state.track.volume = parseInt(state.musicVolume) / 100
    state.track.play()
      .catch(() => {
        state.blockedAudio = track
      })
  }
  static play() {
    if (!state.track?.play()) return
    state.track.play()
  }
  static pause() {
    if (!state.track?.pause()) return
    state.track.pause()
  }
  // allows for volume adjustment from 0-100
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
    state.musicVolume = VOL

    // applies new volume if track exists
    if (typeof state.track?.volume === 'undefined') return
    state.track.volume = state.musicVolume / 100
  }
}