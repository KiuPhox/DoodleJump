import { RigidBody } from "../../engine/components/RigidBody"
import { Time } from "../../engine/system/Time"
import { Vector2 } from "../../engine/utils/Vector2"
import { SoundManager } from "../SoundManager"
import { BasePlatform } from "./BasePlatform"

const BROWN_PLATFORM_SPRITES : string[] = [
    'assets/images/brown-platform-0.png',
    'assets/images/brown-platform-1.png',
    'assets/images/brown-platform-2.png',
    'assets/images/brown-platform-3.png',
] 

const SPRITE_TRASITION_TIME = 0.02

export class BrownPlatform extends BasePlatform{
    private timer: number
    private spriteIndex: number
    private isBreaking: boolean
    private rigidBody: RigidBody

    constructor(){
        super()
        this.name = 'BrownPlatform'
        this.sprite.setSprite(BROWN_PLATFORM_SPRITES[0])
        this.spriteIndex = 0
        this.isBreaking = false
        this.timer = SPRITE_TRASITION_TIME

        this.rigidBody = new RigidBody(this, 0)
        
        this.addComponent(this.rigidBody)
    }

    public onEnabled(): void {
        super.onEnabled()
        this.isBreaking = false
        this.rigidBody.gravityScale = 0
        this.rigidBody.velocity = Vector2.zero
        this.spriteIndex = 0
        this.sprite.setSprite(BROWN_PLATFORM_SPRITES[0])
    }

    public setIsBreaking(isBreaking: boolean) : void{
        if (this.isBreaking === isBreaking) return

        this.isBreaking = isBreaking
        if (this.isBreaking){
            SoundManager.playBreakSound()
            this.rigidBody.gravityScale = 0.08
        }
    }

    public update(): void {
        super.update()
        this.timer -= Time.deltaTime

        if (this.isBreaking && this.timer < 0){
            this.timer = SPRITE_TRASITION_TIME
            if (++this.spriteIndex < BROWN_PLATFORM_SPRITES.length)
                this.sprite.setSprite(BROWN_PLATFORM_SPRITES[this.spriteIndex])
        }
    }
}