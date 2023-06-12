import { BasePlatform } from "./BasePlatform";

export class WhitePlatform extends BasePlatform{
    constructor(){
        super()
        this.name = 'WhitePlatform'
        this.sprite.setSprite('assets/images/white-platform.png')
    }
}