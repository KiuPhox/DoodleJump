import { Vector2 } from '../../engine/utils/Vector2'

export class PlayerController {
    private velocity: Vector2 = Vector2.zero
    private readonly moveSpeed: number = 2
    private readonly jumpForce: number = 5

    public updateMovement(inputX: number): void {
        this.velocity = new Vector2(inputX * this.moveSpeed, this.velocity.y)
    }

    public applyJumpForce(): void {
        this.velocity = new Vector2(this.velocity.x, this.jumpForce)
    }

    public getVelocity(): Vector2 {
        return this.velocity
    }
}
