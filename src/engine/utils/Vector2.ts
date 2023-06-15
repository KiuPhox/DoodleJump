export class Vector2 {
    private _x: number
    private _y: number

    constructor(x: number, y: number) {
        this._x = x
        this._y = y
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this._x + other._x, this._y + other._y)
    }

    sub(other: Vector2): Vector2 {
        return new Vector2(this._x - other._x, this._y - other._y)
    }

    mul(prod: number): Vector2 {
        return new Vector2(this._x * prod, this._y * prod)
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0)
    }

    static get up(): Vector2 {
        return new Vector2(0, 1)
    }

    static get left(): Vector2 {
        return new Vector2(-1, 0)
    }

    static get right(): Vector2 {
        return new Vector2(1, 0)
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    get normalize(): Vector2 {
        const magnitude = this.magnitude
        if (magnitude !== 0) {
            return new Vector2(this._x / magnitude, this._y / magnitude)
        }
        return Vector2.zero
    }

    dot(other: Vector2): number {
        return this._x * other._x + this._y * other._y
    }
}
