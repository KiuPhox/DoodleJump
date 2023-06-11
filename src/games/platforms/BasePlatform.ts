import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"

export class BasePlatform extends GameObject{
    protected sprite: Sprite

    constructor(){
        super('Platform')

        const collider = new Collider(this)

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('/assets/images/green-platform.png')

        this.addComponent(this.sprite)
        this.addComponent(collider)
    }

    public addAdditionalObject(gameObject: GameObject): void {
        //
    }
}