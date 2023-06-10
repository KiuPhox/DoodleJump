import { Utils } from "../engine/utils/Utils"

const JUMP_AUDIO_PATH = 'assets/audios/jump.mp3'

export class SoundManager{    
    public static playJumpSound(): void {
        const jumpAudio = new Audio(JUMP_AUDIO_PATH)
        
        jumpAudio.volume = 0.5
        jumpAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        jumpAudio.play()
    }
}