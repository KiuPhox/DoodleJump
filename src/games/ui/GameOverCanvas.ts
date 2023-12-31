import { Text } from '../../engine/ui/Text'
import { GameObject } from '../../engine/system/GameObject'
import { SceneManager } from '../../engine/system/scene/SceneManager'
import { Ease } from '../../engine/system/tween/Ease'
import { Tween } from '../../engine/system/tween/Tween'
import { Vector2 } from '../../engine/utils/Vector2'
import { GameManager } from '../GameManager'
import { GameState } from '../GameState'
import { PlayButton } from './PlayButton'
import { ReturnMenuButton } from './ReturnMenuButton'
import { ScoreManager } from './ScoreManager'
import { Sprite } from '../../engine/components/sprite/Sprite'
import { Canvas } from '../../engine/system/Canvas'

const INITIAL_POSITION = new Vector2(0, -500)

export class GameOverCanvas extends GameObject {
    private playButton: PlayButton
    private returnMenuButton: ReturnMenuButton

    private scoreText: Text
    private highScoreText: Text
    private footer: GameObject

    constructor() {
        super('GameOverCanvas')
        const scene = SceneManager.getSceneByName('GameplayScene')
        if (scene) this.scene = scene

        this.playButton = new PlayButton()
        this.returnMenuButton = new ReturnMenuButton()

        this.playButton.transform.position = new Vector2(30, -80)
        this.returnMenuButton.transform.position = new Vector2(100, -130)

        this.scoreText = new Text()
        this.highScoreText = new Text()

        this.scoreText.transform.position = new Vector2(-100, 40)
        this.highScoreText.transform.position = new Vector2(-125, 0)

        this.scoreText.font = '600 30px DoodleJump'
        this.highScoreText.font = '600 30px DoodleJump'

        this.footer = new GameObject('Footer')
        const footerSprite = new Sprite(this.footer, 0)
        footerSprite.setSprite('assets/images/footer.png')
        this.footer.addComponent(footerSprite)
        this.footer.transform.position = new Vector2(
            0,
            -Canvas.size.y / 2 + footerSprite.height / 2
        )

        this.playButton.setParent(this)
        this.returnMenuButton.setParent(this)
        this.scoreText.setParent(this)
        this.highScoreText.setParent(this)
        this.footer.setParent(this)

        this.transform.position = INITIAL_POSITION

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    public setActive(value: boolean): void {
        super.setActive(value)
        this.playButton.setActive(value)
        this.returnMenuButton.setActive(value)
        this.scoreText.setActive(value)
        this.highScoreText.setActive(value)
        this.footer.setActive(value)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState) {
            case GameState.READY:
                this.setActive(false)
                break
            case GameState.PLAYING:
                this.setActive(false)
                this.transform.position = INITIAL_POSITION
                break
            case GameState.GAME_OVER:
                this.setActive(true)
                new Tween(this.transform, 1)
                    .to({ position: Vector2.zero })
                    .setEasing(Ease.OUT_QUART)
                this.scoreText.text = 'your score: ' + ScoreManager.getScore()
                this.highScoreText.text = 'your high score: ' + ScoreManager.getHighScore()
                break
        }
    }
}
