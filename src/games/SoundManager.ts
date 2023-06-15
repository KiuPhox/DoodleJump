import { Utils } from '../engine/utils/Utils'

const JUMP_AUDIO_PATH = 'assets/audios/jump.mp3'
const BREAK_AUDIO_PATH = 'assets/audios/break_platform.mp3'
const SPRING_AUDIO_PATH = 'assets/audios/spring.mp3'
const HAT_AUDIO_PATH = 'assets/audios/propeller.mp3'
const JETPACK_AUDIO_PATH = 'assets/audios/jetpack.mp3'
const FALLING_AUDIO_PATH = 'assets/audios/falling.mp3'
const WHITE_AUDIO_PATH = 'assets/audios/white.mp3'
const MONSTER_HIT_AUDIO_PATH = 'assets/audios/monster_hit.mp3'
const HOLE_AUDIO_PATH = 'assets/audios/black_hole.mp3'
const JUMP_ON_MONSTER_AUDIO_PATH = 'assets/audios/jumponmonster.mp3'

export class SoundManager {
    private static hatAudio: HTMLAudioElement
    private static jetpackAudio: HTMLAudioElement
    private static fallingAudio: HTMLAudioElement
    private static monsterHitAudio: HTMLAudioElement
    private static holeAudio: HTMLAudioElement
    private static jumpAudio: HTMLAudioElement
    private static springAudio: HTMLAudioElement
    private static breakAudio: HTMLAudioElement
    private static whiteAudio: HTMLAudioElement
    private static jumpOnMonsterAudio: HTMLAudioElement

    public static async init(): Promise<void> {
        this.jumpAudio = await this.loadAudio(JUMP_AUDIO_PATH)
        this.hatAudio = await this.loadAudio(HAT_AUDIO_PATH)
        this.jetpackAudio = await this.loadAudio(JETPACK_AUDIO_PATH)
        this.fallingAudio = await this.loadAudio(FALLING_AUDIO_PATH)
        this.monsterHitAudio = await this.loadAudio(MONSTER_HIT_AUDIO_PATH)
        this.holeAudio = await this.loadAudio(HOLE_AUDIO_PATH)
        this.springAudio = await this.loadAudio(SPRING_AUDIO_PATH)
        this.breakAudio = await this.loadAudio(BREAK_AUDIO_PATH)
        this.whiteAudio = await this.loadAudio(WHITE_AUDIO_PATH)
        this.jumpOnMonsterAudio = await this.loadAudio(JUMP_ON_MONSTER_AUDIO_PATH)
    }

    private static async loadAudio(audioPath: string): Promise<HTMLAudioElement> {
        const response = await fetch(audioPath)
        const audioBlob = await response.blob()
        const audioURL = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioURL)
        return audio
    }

    public static playJumpSound(): void {
        this.jumpAudio.volume = 0.5
        this.jumpAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        this.jumpAudio.play().catch(() => {
            //
        })
    }

    public static playSpringSound(): void {
        this.springAudio.volume = 0.5
        this.springAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        this.springAudio.play()
    }

    public static playWhiteSound(): void {
        this.whiteAudio.volume = 0.4
        this.whiteAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        this.whiteAudio.play()
    }

    public static playHatSound(): void {
        this.hatAudio.volume = 0.2
        this.hatAudio.play()
    }

    public static playJetpackSound(): void {
        this.jetpackAudio.volume = 0.2
        this.jetpackAudio.play()
    }

    public static playGameOverSound(): void {
        this.fallingAudio.volume = 0.2
        this.fallingAudio.play()
    }

    public static playMonsterHitSound(): void {
        this.monsterHitAudio.volume = 0.2
        this.monsterHitAudio.play()
    }

    public static playJumpOnMonsterSound(): void {
        this.jumpOnMonsterAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        this.jumpOnMonsterAudio.play()
        this.jumpOnMonsterAudio.volume = 0.2
    }

    public static playHoleSound(): void {
        this.holeAudio.volume = 0.2
        this.holeAudio.play()
    }

    public static playBreakSound(): void {
        this.breakAudio.volume = 0.5
        this.breakAudio.playbackRate = Utils.RandomFloat(0.9, 1.1)
        this.breakAudio.play()
    }
}
