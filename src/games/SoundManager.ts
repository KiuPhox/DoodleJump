import { Utils } from "../engine/utils/Utils"

const JUMP_AUDIO_PATH = 'assets/audios/jump.mp3'
const BREAK_AUDIO_PATH = 'assets/audios/break_platform.mp3'
const SPRING_AUDIO_PATH = 'assets/audios/spring.mp3'

export class SoundManager{    
    public static playJumpSound(): void {
        const jumpAudio = new Audio(JUMP_AUDIO_PATH)
        
        jumpAudio.volume = 0.5
        jumpAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        jumpAudio.play()
    }

    public static playSpringSound(): void {
        const springAudio = new Audio(SPRING_AUDIO_PATH)
        
        springAudio.volume = 0.5
        springAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        springAudio.play()
    }

    public static playBreakSound(): void {
        const breakAudio = new Audio(BREAK_AUDIO_PATH)
        
        breakAudio.volume = 0.5
        breakAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        breakAudio.play()
    }
}