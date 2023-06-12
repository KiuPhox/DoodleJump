import { Sprite } from "../../engine/components/Sprite"
import { GameObject } from "../../engine/system/GameObject"

export class Jetpack extends GameObject {
    constructor(){
        super('Jetpack')

        const sprite = new Sprite(this, 2)

        this.addComponent(sprite)
    }
}