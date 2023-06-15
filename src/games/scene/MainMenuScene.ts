import { Sprite } from '../../engine/components/Sprite'
import { GameObject } from '../../engine/system/GameObject'
import { Scene } from '../../engine/system/scene/Scene'
import { Ease } from '../../engine/system/tween/Ease'
import { LoopType } from '../../engine/system/tween/LoopType'
import { Tween } from '../../engine/system/tween/Tween'
import { Vector2 } from '../../engine/utils/Vector2'
import Background from '../Background'
import { GameManager } from '../GameManager'
import { GameState } from '../GameState'
import { BasePlatform } from '../platforms/BasePlatform'
import { Player } from '../player/Player'
import { BlackImage } from '../ui/BlackImage'
import { PlayButton } from '../ui/PlayButton'

const TITLE_IMAGE_PATH = 'assets/images/doodle-jump.png'

export class MainMenuScene extends Scene {
    private playButton: PlayButton
    private title: GameObject

    constructor() {
        super('MainMenuScene')

        this.playButton = new PlayButton()
        this.playButton.transform.position = new Vector2(-45, 90)
        this.playButton.dontDestroyOnLoad = true

        const player = new Player()
        player.transform.position = new Vector2(-80, 0)

        this.title = new GameObject('Title')
        const titleSprite = new Sprite(this.title, 0)
        titleSprite.setSprite(TITLE_IMAGE_PATH)
        this.title.addComponent(titleSprite)
        this.title.transform.position = new Vector2(-45, 150)

        const platform = new BasePlatform()
        platform.transform.position = new Vector2(-80, -200)

        const background = new Background()
        background.dontDestroyOnLoad = true

        const blackImage = new BlackImage()
        blackImage.dontDestroyOnLoad = true

        this.registerGameObject(player)
        this.registerGameObject(this.playButton)
        this.registerGameObject(this.title)
        this.registerGameObject(platform)
        this.registerGameObject(background)
        this.registerGameObject(blackImage)

        // Bounce the title infinte
        new Tween(this.title.transform, 1)
            .to({ position: Vector2.zero })
            .setLoops(-1, LoopType.Yoyo)
            .setEasing(Ease.OutBounce)

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChanged)
    }

    OnGameStateChanged = (gameState: GameState) => {
        switch (gameState) {
            case GameState.Ready:
                this.playButton.setActive(true)
                this.title.setActive(true)
                break
            case GameState.Playing:
                this.playButton.setActive(false)
                this.title.setActive(false)
                break
        }
    }
}
