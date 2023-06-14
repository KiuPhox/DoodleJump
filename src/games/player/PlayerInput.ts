import { Input } from "../../engine/system/input/Input"


export class PlayerInput {
    public getMovementInput(): number {
        if (Input.getKey('KeyD') || Input.getKey('ArrowRight')) {
            return 1
        } else if (Input.getKey('KeyA') || Input.getKey('ArrowLeft')) {
            return -1
        } 
        else if (Input.isTouching){
            const touch = Input.getTouch()
            console.log(touch)
            if (touch.position.x > 0)
                return 1
            else if (touch.position.x < 0)
                return -1
            else 
                return 0
        }
        return 0
    }
}