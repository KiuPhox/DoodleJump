import { Sprite } from './Sprite'

export class SpriteManager {
    public static sprites: Sprite[]

    public static init(): void {
        this.sprites = []
    }

    public static registerSprite(sprite: Sprite): void {
        this.sprites.push(sprite)
        this.sprites.sort((a, b) => b.order - a.order)
    }
}
