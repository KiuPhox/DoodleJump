import { Text } from "../../engine/UI/Text"
import { GameObject } from "../../engine/system/GameObject"
import { SceneManager } from "../../engine/system/scene/SceneManager"
import { Vector2 } from "../../engine/utils/Vector2"
import { Game } from "../../game"
import { Enviroment } from "../Enviroment"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"

export class ScoreManager extends GameObject{
    private static score: number
    private static highScore: number
    private enviroment: Enviroment
    private scoreText: Text

    constructor() {
        super('ScoreManager')
        this.enviroment = Game.Find('Enviroment') as Enviroment
        this.scoreText = new Text()
        this.scoreText.font = '600 32px DoodleJump'
        this.scoreText.transform.position = new Vector2(-150, 230)
        this.scoreText.name = 'ScoreText'

        const gameplayScene = SceneManager.getSceneByName('GameplayScene')
        if (gameplayScene){
            gameplayScene.registerGameObject(this.scoreText)
        }

        ScoreManager.score = 0
        ScoreManager.highScore = 0
    }

    public update(): void {
        super.update()
        if (GameManager.getGameState() === GameState.Playing){
            ScoreManager.score = this.enviroment.point() <= 0 ? 0 : Math.floor(this.enviroment.point())
            this.scoreText.text = ScoreManager.score.toString()

            if (ScoreManager.score > ScoreManager.highScore){
                ScoreManager.highScore = ScoreManager.score
            }
        }
        else {
            ScoreManager.score = 0
        }
    }

    public static getScore(): number {
        return this.score
    }

    public static getHighScore(): number {
        return this.highScore
    }
}