import { Vector2 } from "../../utils/Vector2"
import { Canvas } from "../Canvas"
import { Touch } from "./Touch"

export class Input {
    private static previousKeyStates: Set<string> = new Set<string>()
    private static heldKeyStates: Set<string> = new Set<string>()
    private static isHeld: boolean
    private static isMouseDown: boolean
    
    private static touch: Touch
    public static isTouching: boolean

    public static init(): void {
        const canvas = Canvas.canvas
        
        document.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event))
        document.addEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event))
        canvas.addEventListener('mousedown', () => this.handleMouseDown())
        canvas.addEventListener('mouseup', () => this.handleMouseUp())
        canvas.addEventListener('touchstart', this.handleTouchStart)
        canvas.addEventListener('touchend', this.handleTouchEnd)

        this.touch = new Touch()
        this.isTouching = false
        this.isHeld = false
    }

    public static getKeyDown(keyCode: string): boolean {
        return this.previousKeyStates.has(keyCode)
    }

    public static getKey(keyCode: string): boolean {
        return this.heldKeyStates.has(keyCode)
    }

    public static getMouseDown(): boolean {
        return this.isMouseDown
    }

    public static handleKeyDown(event: KeyboardEvent): void {
        const keyCode = event.code

        if (!this.heldKeyStates.has(keyCode)) {
            this.heldKeyStates.add(keyCode)
        }

        if (!this.isHeld && !this.previousKeyStates.has(keyCode)) {
            this.isHeld = true
            this.previousKeyStates.add(keyCode)
        }
    }

    public static handleKeyUp(event: KeyboardEvent): void {
        const keyCode = event.code
        this.isHeld = false
        this.heldKeyStates.delete(keyCode)
    }

    public static handleMouseDown(): void {
        this.isMouseDown = true
    }

    public static handleMouseUp(): void {
        this.isMouseDown = false
    }

    public static handleTouchStart(event: TouchEvent): void {
        Input.isTouching = true

        const rect = (event.target as HTMLElement).getBoundingClientRect()

        const x = event.targetTouches[0].pageX - rect.left
        const y = event.targetTouches[0].pageY - rect.top

        Input.touch.position = new Vector2(x - Canvas.size.x / 2, Canvas.size.y / 2 - y)
    }

    public static handleTouchEnd(): void {
        Input.isTouching = false
    }

    public static getTouch(): Touch {
        return this.touch
    }

    public static reset() {
        this.previousKeyStates.clear()
        this.isMouseDown = false
    }
}