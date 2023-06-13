import { Text } from "../../engine/UI/Text"
import { GameObject } from "../../engine/system/GameObject"
import { Vector2 } from "../../engine/utils/Vector2"
import { Game } from "../../game"
import { Enviroment } from "../Enviroment"
import { GameManager } from "../GameManager"
import { GameState } from "../GameState"

export class ScoreManager extends GameObject{
    private static score: number
    private enviroment: Enviroment
    private scoreText: Text

    constructor() {
        super('ScoreManager')
        this.enviroment = Game.Find('Enviroment') as Enviroment
        this.scoreText = new Text()
        this.scoreText.transform.position = new Vector2(8, 27)
        this.scoreText.name = 'ScoreText'
        ScoreManager.score = 0
    }

    public update(): void {
        super.update()
        if (GameManager.getGameState() === GameState.Playing){
            ScoreManager.score = this.enviroment.point() <= 0 ? 0 : Math.floor(this.enviroment.point())
            this.scoreText.text = ScoreManager.score.toString()
        }
    }

    public static getScore(): number {
        return this.score
    }
}