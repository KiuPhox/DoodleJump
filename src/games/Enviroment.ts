import { ForceMode, RigidBody } from "../engine/components/RigidBody"
import { GameObject } from "../engine/system/GameObject"
import { Vector2 } from "../engine/utils/Vector2"
import { GameManager } from "./GameManager"
import { GameState } from "./GameState"
import { Player } from "./player/Player"

export class Enviroment extends GameObject{
    private player: Player
    private playerRb: RigidBody
    private rigidBody: RigidBody

    constructor(player: Player){
        super('Enviroment')
        this.player = player

        this.playerRb = this.player.getComponent(RigidBody)
        this.rigidBody = new RigidBody(this, 0.08)

        this.addComponent(this.rigidBody)
    }

    public update(): void {
        super.update()

        this.rigidBody.velocity = Vector2.zero
        this.rigidBody.gravityScale = 0

        if (GameManager.getGameState() !== GameState.GameOver && this.player.transform.position.y >= 0 && !this.player.isFalling){
            this.rigidBody.gravityScale = 0.08
            this.rigidBody.velocity = new Vector2(0, -this.playerRb.velocity.y)
        }
        else if (GameManager.getGameState() === GameState.GameOver){
            this.rigidBody.addForce(Vector2.up.mul(20), ForceMode.VelocityChange)
        }
    }

    public point(): number{
        return -this.transform.position.y
    }
}