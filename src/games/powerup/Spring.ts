import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"

const SPRING_SPRITE = 'assets/images/spring-0.png'
const SPRING_ACTIVE_SPRITE = 'assets/images/spring-1.png'

export class Spring extends GameObject{
    private sprite: Sprite
    constructor(){
        super('Spring')

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite(SPRING_SPRITE)

        const collider = new Collider(this)
        collider.isTrigger = true

        this.addComponent(this.sprite)
        this.addComponent(collider)
    }

    public activeSpring(): void{
        this.sprite.setSprite(SPRING_ACTIVE_SPRITE)
    }
}