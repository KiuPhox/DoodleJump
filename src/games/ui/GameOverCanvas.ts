import { GameObject } from "../../engine/system/GameObject"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"
import { PlayButton } from "./PlayButton"

export class GameOverCanvas extends GameObject {
    private playButton: PlayButton

    constructor(){
        super('GameOverCanvas')
        this.playButton = new PlayButton()

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case GameState.Ready:
                break
            case GameState.GameOver:
                break
        }
    }
}