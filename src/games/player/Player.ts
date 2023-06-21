import { Collider } from '../../engine/components/Collider'
import { ForceMode, RigidBody } from '../../engine/components/RigidBody'
import { Sprite } from '../../engine/components/sprite/Sprite'
import { Canvas } from '../../engine/system/Canvas'
import { GameObject } from '../../engine/system/GameObject'
import { Vector2 } from '../../engine/utils/Vector2'
import { SoundManager } from '../SoundManager'
import { Spring } from '../powerup/Spring'
import { BasePlatform } from '../platforms/BasePlatform'
import { BrownPlatform } from '../platforms/BrownPlatform'
import { Time } from '../../engine/system/Time'
import { GameManager } from '../GameManager'
import { WhitePlatform } from '../platforms/WhitePlatform'
import { Tween } from '../../engine/system/tween/Tween'
import { Ease } from '../../engine/system/tween/Ease'
import { ObjectPoolManager } from '../level/ObjectPoolManager'
import { PlayerInput } from './PlayerInput'
import { GameState } from '../GameState'

const PLAYER_LEFT_IMAGE_PATH = 'assets/images/lik-left.png'
const MOVE_SPEED = 2
const JUMP_FORCE = 5
const HAT_FORCE = 12
const JETPACK_FORCE = 25
const SPRING_FORCE = 8

const HAT_DURATION = 2.5
const JETPACK_DURATION = 2.5

const GAME_OVER_DELAY = 0.5

export class Player extends GameObject {
    private sprite: Sprite
    private rigidBody: RigidBody
    private collider: Collider

    private hatTimer: number
    private jetpackTimer: number
    private gameOverDelayTimer: number

    private isHoleTouched: boolean
    private isMonsterTouched: boolean

    private playerInput: PlayerInput

    constructor() {
        super('Player')
        this.rigidBody = new RigidBody(this, 0.08)
        this.sprite = new Sprite(this, 1)
        this.sprite.setSprite(PLAYER_LEFT_IMAGE_PATH)
        this.collider = new Collider(this)
        this.collider.isTrigger = true
        this.collider.scale = new Vector2(0.5, 1)

        this.addComponent(this.sprite)
        this.addComponent(this.rigidBody)
        this.addComponent(this.collider)

        this.isHoleTouched = false
        this.isMonsterTouched = false

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)

        this.playerInput = new PlayerInput()
    }

    public update(): void {
        super.update()

        this.hatTimer -= Time.deltaTime
        this.jetpackTimer -= Time.deltaTime
        this.gameOverDelayTimer -= Time.deltaTime

        if (this.hatTimer > 0) {
            this.rigidBody.addForce(Vector2.up.mul(Time.deltaTime * HAT_FORCE), ForceMode.Force)
        }

        // Control
        if (
            GameManager.getGameState() !== GameState.READY &&
            !this.isHoleTouched &&
            !this.isMonsterTouched
        ) {
            const velocityX = this.playerInput.getMovementInput() * MOVE_SPEED

            this.rigidBody.velocity = new Vector2(velocityX, this.rigidBody.velocity.y)

            if (velocityX > 0) {
                this.sprite.flipX = true
            } else if (velocityX < 0) {
                this.sprite.flipX = false
            }
        }

        if (
            this.transform.position.y >= 0 ||
            (GameManager.getGameState() === GameState.GAME_OVER && this.gameOverDelayTimer > 0)
        ) {
            this.transform.position = new Vector2(this.transform.position.x, 0)
        }

        if (this.transform.position.x + this.sprite.width / 2 < -Canvas.size.x / 2) {
            this.transform.position = new Vector2(
                Canvas.size.x / 2 + this.sprite.width / 2,
                this.transform.position.y
            )
        }

        if (this.transform.position.x - this.sprite.width / 2 > Canvas.size.x / 2) {
            this.transform.position = new Vector2(
                -Canvas.size.x / 2 - this.sprite.width / 2,
                this.transform.position.y
            )
        }

        if (this.transform.position.y + this.sprite.height / 2 < -Canvas.size.y / 2) {
            if (
                GameManager.getGameState() === GameState.PLAYING ||
                GameManager.getGameState() === GameState.READY
            ) {
                GameManager.updateGameState(GameState.GAME_OVER)
            }
        }
    }

    private jump(force: number): void {
        this.rigidBody.addForce(new Vector2(0, force), ForceMode.VelocityChange)
    }

    public OnTriggerStay = (collider: Collider) => {
        if (
            collider.gameObject instanceof BasePlatform &&
            this.isFalling &&
            !this.isMonsterTouched
        ) {
            const playerBottom = this.transform.position.y - this.collider.size.y / 2
            const platformTop = collider.gameObject.transform.position.y

            if (playerBottom < platformTop) return

            if (collider.gameObject.name == 'BrownPlatform') {
                (collider.gameObject as BrownPlatform).setIsBreaking(true)
            } else {
                this.jump(JUMP_FORCE)

                if (collider.gameObject.name == 'WhitePlatform') {
                    ObjectPoolManager.whitePlatformsPool.release(
                        collider.gameObject as WhitePlatform
                    )
                    SoundManager.playWhiteSound()
                } else {
                    SoundManager.playJumpSound()
                }
            }
        } else if (
            collider.gameObject.name === 'Spring' &&
            this.isFalling &&
            !this.isMonsterTouched
        ) {
            (collider.gameObject as Spring).activeSpring()

            this.jump(SPRING_FORCE)
            SoundManager.playSpringSound()
        }

        if (!this.isImmortal) {
            if (collider.gameObject.name === 'Hat' && !this.isMonsterTouched) {
                this.hatTimer = HAT_DURATION

                collider.gameObject.setActive(false)
                this.rigidBody.velocity = Vector2.zero
                SoundManager.playHatSound()
            } else if (collider.gameObject.name === 'Jetpack' && !this.isMonsterTouched) {
                this.jetpackTimer = JETPACK_DURATION

                collider.gameObject.setActive(false)
                this.jump(JETPACK_FORCE)
                SoundManager.playJetpackSound()
            } else if (collider.gameObject.name === 'Hole' && !this.isHoleTouched) {
                this.isHoleTouched = true
                this.rigidBody.gravityScale = 0
                this.rigidBody.velocity = Vector2.zero
                SoundManager.playHoleSound()

                new Tween(this.transform, 1)
                    .to({ scale: 0, rotation: 20 })
                    .setEasing(Ease.OUT_QUART)
                    .onComplete(() => {
                        GameManager.updateGameState(GameState.GAME_OVER)
                    })
            } else if (collider.gameObject.name === 'Monster' && !this.isMonsterTouched) {
                const playerBottom = this.transform.position.y - this.collider.size.y / 2

                if (playerBottom > collider.gameObject.transform.position.y && this.isFalling) {
                    this.jump(JUMP_FORCE)
                    SoundManager.playJumpOnMonsterSound()
                } else {
                    this.isMonsterTouched = true
                    SoundManager.playMonsterHitSound()
                }
            }
        }
    }

    public get isFalling(): boolean {
        return this.rigidBody.velocity.y < 0
    }

    public get isImmortal(): boolean {
        return this.hatTimer > 0 || this.jetpackTimer > 0
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState) {
            case GameState.READY:
                this.transform.position = new Vector2(-80, 0)
                this.transform.scale = 1
                this.transform.rotation = 0
                this.rigidBody.velocity = Vector2.zero
                this.rigidBody.gravityScale = 0.08
                break
            case GameState.PLAYING:
                this.isHoleTouched = false
                this.isMonsterTouched = false
                this.transform.scale = 1
                this.transform.rotation = 0
                this.transform.position = Vector2.zero
                this.rigidBody.velocity = Vector2.zero
                this.rigidBody.gravityScale = 0.08
                break
            case GameState.GAME_OVER:
                this.gameOverDelayTimer = GAME_OVER_DELAY
                break
        }
    }
}
