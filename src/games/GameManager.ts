import { Event } from "../engine/event/Event"
import { Layer } from "../engine/system/Layer"
import { Physic } from "../engine/system/Physic"
import { GameState } from "./GameState"
import Background from "./Background"
import { Player } from "./Player"
import { BasePlatform } from "./platforms/BasePlatform"
import { Vector2 } from "../engine/utils/Vector2"
import { Utils } from "../engine/utils/Utils"
import { Enviroment } from "./Enviroment"
import { TopBar } from "./TopBar"

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init(){
        // Physic setup
        Layer.add('Background')
        Physic.setInteractiveLayer('Background', 'Background', false)

        this.OnGameStateChanged = new Event<GameState>()

        const player = new Player()    
        new Background()
        new TopBar()

        const enviroment = new Enviroment(player)


        for (let i = 0; i < 200; i++){
            const platform = new BasePlatform()
            platform.transform.position = new Vector2(Utils.RandomFloat(-150, 150), Utils.RandomFloat(-5000, 300))
            platform.parent = enviroment
        }

        //platform.parent = player
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                break
            case GameState.Playing:
                break
            case GameState.GameOver:
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}