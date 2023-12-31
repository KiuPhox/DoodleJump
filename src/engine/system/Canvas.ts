import { UIManager } from '../ui/UIManager'
import { Sprite } from '../components/sprite/Sprite'
import { SpriteManager } from '../components/sprite/SpriteManager'
import { Vector2 } from '../utils/Vector2'

export class Canvas {
    public static canvas: HTMLCanvasElement
    public static context: CanvasRenderingContext2D | null
    public static size: Vector2 = new Vector2(320, 512)
    private static sprites: Sprite[] = []

    public static init(canvasName: string): void {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasName)
        this.canvas.width = Canvas.size.x
        this.canvas.height = Canvas.size.y
        this.canvas.addEventListener('click', Canvas.handleClick)
        this.context = this.canvas.getContext('2d')
    }

    public static draw(): void {
        this.renderSprites()
        this.renderUITexts()
    }

    private static renderSprites(): void {
        if (!Canvas.context) return

        for (const sprite of SpriteManager.sprites) {
            const gameObject = sprite.gameObject

            if (!gameObject.active) continue

            const canvasCenterX = this.size.x / 2
            const canvasCenterY = this.size.y / 2
            const spriteCenterX = (sprite.width / 2) * gameObject.transform.scale
            const spriteCenterY = (sprite.height / 2) * gameObject.transform.scale

            const drawX = gameObject.transform.position.x + canvasCenterX
            const drawY = -gameObject.transform.position.y + canvasCenterY

            Canvas.context.save()
            Canvas.context.globalCompositeOperation = sprite.blendMode
            Canvas.context.globalAlpha = sprite.alpha
            Canvas.context.translate(drawX, drawY)
            Canvas.context.rotate(gameObject.transform.rotation)

            if (sprite.flipX) {
                Canvas.context.scale(-1, 1)
            }

            if (sprite.flipY) {
                Canvas.context.scale(1, -1)
            }

            if (sprite.image.complete && sprite.image.naturalWidth !== 0) {
                Canvas.context.drawImage(
                    sprite.image,
                    -spriteCenterX,
                    -spriteCenterY,
                    sprite.width * gameObject.transform.scale,
                    sprite.height * gameObject.transform.scale
                )
            }

            Canvas.context.restore()
        }
    }

    private static renderUITexts(): void {
        if (!Canvas.context) return

        for (const text of UIManager.texts) {
            if (!text.active) continue
            Canvas.context.font = text.font
            Canvas.context.fillText(
                text.text,
                text.transform.position.x + this.size.x / 2,
                -text.transform.position.y + this.size.y / 2
            )
        }
    }

    private static handleClick(event: MouseEvent): void {
        const mousePos = new Vector2(
            event.offsetX - Canvas.size.x / 2,
            -event.offsetY + Canvas.size.y / 2
        )

        for (const button of UIManager.buttons) {
            if (!button.active) continue

            const buttonPos = button.transform.position

            if (
                mousePos.x >= buttonPos.x - button.width / 2 &&
                mousePos.x <= buttonPos.x + button.width / 2 &&
                mousePos.y >= buttonPos.y - button.height / 2 &&
                mousePos.y <= buttonPos.y + button.height / 2
            ) {
                button.onClick()
            }
        }
    }
}
