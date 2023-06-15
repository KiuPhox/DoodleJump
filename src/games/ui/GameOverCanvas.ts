import { Text } from "../../engine/UI/Text"
import { GameObject } from "../../engine/system/GameObject"
import { SceneManager } from "../../engine/system/scene/SceneManager"
import { Vector2 } from "../../engine/utils/Vector2"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"
import { PlayButton } from "./PlayButton"
import { ReturnMenuButton } from "./ReturnMenuButton"
import { ScoreManager } from "./ScoreManager"

export class GameOverCanvas extends GameObject {
    private playButton: PlayButton
    private returnMenuButton: ReturnMenuButton

    private scoreText: Text
    private highScoreText: Text

    constructor(){
        super('GameOverCanvas')
        const scene = SceneManager.getSceneByName('GameplayScene')
        if (scene) this.scene = scene

        this.playButton = new PlayButton()
        this.returnMenuButton = new ReturnMenuButton()

        this.playButton.transform.position = new Vector2(30, -120)
        this.returnMenuButton.transform.position = new Vector2(100, -170)

        this.scoreText = new Text()
        this.highScoreText = new Text()

        this.scoreText.transform.position = new Vector2(-100, -10)
        this.highScoreText.transform.position = new Vector2(-125, 30)

        this.scoreText.font = '600 30px DoodleJump'
        this.highScoreText.font = '600 30px DoodleJump'

        this.playButton.setParent(this)
        this.returnMenuButton.setParent(this)
        this.scoreText.setParent(this)
        this.highScoreText.setParent(this)


        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    public setActive(value: boolean): void {
        super.setActive(value)
        this.playButton.setActive(value)
        this.returnMenuButton.setActive(value)
        this.scoreText.setActive(value)
        this.highScoreText.setActive(value)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState){
            case GameState.Ready:
                this.setActive(false)
                break
            case GameState.Playing:
                this.setActive(false)
                break
            case GameState.GameOver:
                this.setActive(true)
                this.scoreText.text = 'your score: ' + ScoreManager.getScore()
                this.highScoreText.text = 'your high score: ' + ScoreManager.getHighScore()
                break

        }
    }
}