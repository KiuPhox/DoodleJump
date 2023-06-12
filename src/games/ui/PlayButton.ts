import { Button } from "../../engine/UI/Button"
import { Game } from "../../game"
import { BlackImage } from "./BlackImage"

const PLAY_IMAGE_PATH = 'assets/images/play.png'
const PLAY_ON_IMAGE_PATH = 'assets/images/play-on.png'

export class PlayButton extends Button{
    constructor(){
        super('PlayButton', PLAY_IMAGE_PATH)
    }

    onClick(): void {
        this.sprite.setSprite(PLAY_ON_IMAGE_PATH);
        (Game.Find('BlackImage') as BlackImage).show(1)
    }
}