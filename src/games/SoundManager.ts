import { Utils } from "../engine/utils/Utils"

const JUMP_AUDIO_PATH = 'assets/audios/jump.mp3'
const BREAK_AUDIO_PATH = 'assets/audios/break_platform.mp3'
const SPRING_AUDIO_PATH = 'assets/audios/spring.mp3'
const HAT_AUDIO_PATH = 'assets/audios/propeller.mp3'
const JETPACK_AUDIO_PATH = 'assets/audios/jetpack.mp3'
const FALLING_AUDIO_PATH = 'assets/audios/falling.mp3'
const WHITE_AUDIO_PATH = 'assets/audios/white.mp3'

export class SoundManager{    

    private static hatAudio: HTMLAudioElement
    private static jetpackAudio: HTMLAudioElement
    private static fallingAudio: HTMLAudioElement

    public static init():void{
        this.hatAudio = new Audio(HAT_AUDIO_PATH)
        this.jetpackAudio = new Audio(JETPACK_AUDIO_PATH)
        this.fallingAudio = new Audio(FALLING_AUDIO_PATH)
    }

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

    public static playWhiteSound(): void {
        const whiteAudio = new Audio(WHITE_AUDIO_PATH)
        
        whiteAudio.volume = 0.4
        whiteAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        whiteAudio.play()
    }

    public static playHatSound(): void{
        this.hatAudio.volume = 0.2
        this.hatAudio.play()
    }

    public static playJetpackSound(): void{
        this.jetpackAudio.volume = 0.2
        this.jetpackAudio.play()
    }

    public static playGameOverSound(): void{
        this.fallingAudio.volume = 0.2
        this.fallingAudio.play()
    }


    public static playBreakSound(): void {
        const breakAudio = new Audio(BREAK_AUDIO_PATH)
        
        breakAudio.volume = 0.5
        breakAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        breakAudio.play()
    }
}