import { Input } from "../../engine/system/Input"


export class PlayerInput {
  public getMovementInput(): number {
        if (Input.getKey('KeyD') || Input.getKey('ArrowRight')) {
            return 1
        } else if (Input.getKey('KeyA') || Input.getKey('ArrowLeft')) {
            return -1
        }
        return 0
    }
}