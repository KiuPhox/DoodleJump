export class Input {
    private static previousKeyStates: Set<string> = new Set<string>()
    private static heldKeyStates: Set<string> = new Set<string>()
    private static isHeld: boolean
    private static isMouseDown: boolean

    public static init(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event))
        document.addEventListener('keyup', (event: KeyboardEvent) => this.handleKeyUp(event))
        document.addEventListener('mousedown', () => this.handleMouseDown())
        document.addEventListener('mouseup', () => this.handleMouseUp())
        document.addEventListener('touchstart', () => this.handleMouseDown())
        document.addEventListener('touchend', () => this.handleMouseUp())
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

    public static reset() {
        this.previousKeyStates.clear()
        this.isMouseDown = false
    }
}