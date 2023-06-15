import { Scene } from '../../engine/system/scene/Scene'
import { Enviroment } from '../Enviroment'
import { LevelGenerator } from '../level/LevelGenerator'
import { Player } from '../player/Player'
import { GameOverCanvas } from '../ui/GameOverCanvas'
import { ScoreManager } from '../ui/ScoreManager'
import { TopBar } from '../ui/TopBar'

export class GameplayScene extends Scene {
    constructor() {
        super('GameplayScene')

        const player = new Player()

        this.registerGameObject(new TopBar())

        this.registerGameObject(player)

        this.registerGameObject(new Enviroment(player))

        this.registerGameObject(new LevelGenerator())

        this.registerGameObject(new GameOverCanvas())

        this.registerGameObject(new ScoreManager())
    }
}
