import { Collider } from "../../engine/components/Collider"
import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"
import { Utils } from "../../engine/utils/Utils"
import { Vector2 } from "../../engine/utils/Vector2"

export class BasePlatform extends GameObject{
    protected sprite: Sprite
    private powerUp: GameObject

    constructor(){
        super('BasePlatform')

        const collider = new Collider(this)
        collider.isTrigger = true

        this.sprite = new Sprite(this, 2)
        this.sprite.setSprite('/assets/images/green-platform.png')

        this.addComponent(this.sprite)
        this.addComponent(collider)
    }

    public addPowerUp(gameObject: GameObject): void {
        this.setChild(gameObject)
        
        const sprite = gameObject.getComponent('Sprite') as Sprite

        gameObject.transform.localPosition = new Vector2(
            Utils.RandomFloat(-this.sprite.width / 2 + sprite.width / 2, this.sprite.width / 2 - sprite.width / 2),
            - this.sprite.height / 2 - sprite.height / 2 + 2
        )
        this.powerUp = gameObject
    }

    public onDisabled = () => {
        if (this.powerUp){
            this.powerUp.setActive(false)
        }
    }
}