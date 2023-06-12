import { Sprite } from "../../engine/components/Sprite";
import { GameObject } from "../../engine/system/GameObject";
import { Vector2 } from "../../engine/utils/Vector2";
import { GameManager } from "../GameManager";
import { GameState } from "../GameState";
import { PlayButton } from "./PlayButton";

const TITLE_IMAGE_PATH = 'assets/images/doodle-jump.png'

export class MainMenu extends GameObject{
    private playButton: PlayButton
    private title: GameObject

    constructor(){
        super('MainMenu')

        this.playButton = new PlayButton()
        this.title = new GameObject('Title')

        const titleSprite = new Sprite(this.title, 0)
        titleSprite.setSprite(TITLE_IMAGE_PATH)
        this.title.addComponent(titleSprite)

        this.playButton.transform.position = new Vector2(-45, -90)
        this.title.transform.position = new Vector2(-45, -150)

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch(gameState){
            case GameState.Ready:
                this.playButton.setActive(true)
                this.title.setActive(true)
                break
            case GameState.Playing:
                this.playButton.setActive(false)
                this.title.setActive(false)
                break
        }
    }
}