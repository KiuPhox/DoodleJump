import { Button } from "../../engine/UI/Button"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"

const PLAY_IMAGE_PATH = 'assets/images/play.png'
const PLAY_ON_IMAGE_PATH = 'assets/images/play-on.png'

export class PlayButton extends Button{
    constructor(){
        super('Play Button', PLAY_IMAGE_PATH)
    }

    onClick(): void {
        this.sprite.setSprite(PLAY_ON_IMAGE_PATH)
        GameManager.updateGameState(GameState.Playing)
        this.setActive(false)
    }
}