import { Collider } from "../engine/components/Collider"
import { ForceMode, RigidBody } from "../engine/components/RigidBody"
import { Sprite } from "../engine/components/Sprite"
import { Canvas } from "../engine/system/Canvas"
import { GameObject } from "../engine/system/GameObject"
import { Input } from "../engine/system/Input"
import { Vector2 } from "../engine/utils/Vector2"
import { SoundManager } from "./SoundManager"
import { BasePlatform } from "./platforms/BasePlatform"
import { BrownPlatform } from "./platforms/BrownPlatform"

const PLAYER_LEFT = 'assets/images/lik-left.png'
const MOVE_SPEED = 2
const JUMP_FORCE = 5

export class Player extends GameObject{
    private sprite: Sprite
    private rigidBody: RigidBody
    private collider: Collider

    constructor(){
        super("Player")
        this.rigidBody = new RigidBody(this, 0.08)
        this.sprite = new Sprite(this, 1)
        this.sprite.setSprite(PLAYER_LEFT)
        this.collider = new Collider(this)
        this.collider.isTrigger = true
        this.collider.scale = new Vector2(0.5, 1)
        

        this.addComponent(this.sprite)
        this.addComponent(this.rigidBody)
        this.addComponent(this.collider)
    }

    public update(): void {
        super.update()

        if (Input.getKey('KeyD') || Input.getKey('ArrowRight')){
            this.rigidBody.velocity = new Vector2(MOVE_SPEED, this.rigidBody.velocity.y)
            this.sprite.flipX = true
        }
        
        else if (Input.getKey('KeyA') || Input.getKey('ArrowLeft')){
            this.rigidBody.velocity = new Vector2(-MOVE_SPEED, this.rigidBody.velocity.y)
            this.sprite.flipX = false
        }
        else
        {
            this.rigidBody.velocity = new Vector2(0, this.rigidBody.velocity.y)
        }

        if (this.transform.position.y <= 0){
            this.transform.position = new Vector2(this.transform.position.x, 0)
        }

        if (this.transform.position.x + this.sprite.width / 2 < -Canvas.size.x / 2){
            this.transform.position = new Vector2(Canvas.size.x / 2 + this.sprite.width / 2, this.transform.position.y)
        }

        if (this.transform.position.x - this.sprite.width / 2> Canvas.size.x / 2){
            this.transform.position = new Vector2(-Canvas.size.x / 2 - this.sprite.width / 2, this.transform.position.y)
        }
    }


    private jump():void{
        this.rigidBody.addForce(new Vector2(0, JUMP_FORCE), ForceMode.VelocityChange)
        SoundManager.playJumpSound()
    }

    public OnTriggerStay = (collider: Collider) =>{
        if ((collider.gameObject instanceof BasePlatform) && this.isFalling){
            const playerBottom = this.transform.position.y + this.collider.size.y / 2
            const platformTop = collider.gameObject.transform.position.y 

            if (playerBottom >= platformTop) return

            if (collider.gameObject.name == 'BrownPlatform')
            {
                (collider.gameObject as BrownPlatform).setIsBreaking(true)
            }
            else
            {
                this.jump()
            }

        }
    }

    public get isFalling(): boolean { return this.rigidBody.velocity.y > 0}
}