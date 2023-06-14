(()=>{"use strict";var t,e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};e.d({},{l:()=>ut});class s{constructor(){this.listeners=[]}subscribe(t){this.listeners.push(t)}unsubscribe(t){const e=this.listeners.indexOf(t);-1!==e&&this.listeners.splice(e,1)}invoke(t){for(const e of this.listeners)e(t)}}class i{static get bounciness(){return.75}static registerCollider(t){i.colliders.push(t)}static registerInteractiveLayer(t){for(const e of a.layers)i.interactiveLayers[e+","+t]=!0,i.interactiveLayers[t+","+e]=!0;i.interactiveLayers[t+","+t]=!0}static setInteractiveLayer(t,e,s){i.interactiveLayers[t+","+e]=s,i.interactiveLayers[e+","+t]=s}static checkInteractiveLayer(t,e){return i.interactiveLayers[t+","+e]}static update(){for(let t=0;t<i.colliders.length-1;t++)for(let e=t+1;e<i.colliders.length;e++)i.colliders[t].gameObject.active&&i.colliders[e].gameObject.active&&this.checkInteractiveLayer(i.colliders[t].gameObject.layer,i.colliders[e].gameObject.layer)&&this.checkCollider(i.colliders[t],i.colliders[e])&&(i.colliders[t].colliding(i.colliders[e]),i.colliders[e].colliding(i.colliders[t]))}static checkCollider(t,e){const s=t.gameObject.transform.position,i=e.gameObject.transform.position;return s.x+t.size.x/2>=i.x-e.size.x/2&&s.x-t.size.x/2<=i.x+e.size.x/2&&s.y+t.size.y/2>=i.y-e.size.y/2&&s.y-t.size.y/2<=i.y+e.size.y/2}}i.colliders=[],i.interactiveLayers={};class a{static init(){a.add("Default")}static add(t){i.registerInteractiveLayer(t),this.layers.push(t)}static remove(t){this.layers.splice(this.layers.indexOf(t))}}a.layers=[],function(t){t[t.Ready=0]="Ready",t[t.Playing=1]="Playing",t[t.GameOver=2]="GameOver",t[t.Pause=3]="Pause"}(t||(t={}));class n{static init(){n.buttons=[]}static add(t){this.buttons.push(t)}}class o{constructor(t,e){this._x=t,this._y=e}add(t){return new o(this._x+t._x,this._y+t._y)}sub(t){return new o(this._x-t._x,this._y-t._y)}mul(t){return new o(this._x*t,this._y*t)}static get zero(){return new o(0,0)}static get up(){return new o(0,1)}static get left(){return new o(-1,0)}static get right(){return new o(1,0)}get x(){return this._x}get y(){return this._y}get magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}get normalize(){const t=this.magnitude;return 0!==t?new o(this._x/t,this._y/t):o.zero}dot(t){return this._x*t._x+this._y*t._y}}class r{static init(t){this.canvas=document.getElementById(t),this.canvas.width=r.size.x,this.canvas.height=r.size.y,this.canvas.addEventListener("click",r.handleClick),r.context=this.canvas.getContext("2d")}static draw(){if(r.context){for(const t of this.sprites){const e=t.gameObject;if(!e.active)continue;const s=this.size.x/2,i=this.size.y/2,a=t.width/2*e.transform.scale,n=t.height/2*e.transform.scale,o=e.transform.position.x+s,h=-e.transform.position.y+i;r.context.save(),r.context.globalAlpha=t.alpha,r.context.translate(o,h),r.context.rotate(e.transform.rotation),t.flipX&&r.context.scale(-1,1),t.flipY&&r.context.scale(1,-1),t.image.complete&&0!==t.image.naturalWidth&&r.context.drawImage(t.image,-a,-n,t.width*e.transform.scale,t.height*e.transform.scale),r.context.restore()}for(const t of this.texts)t.active&&(r.context.font=t.font,r.context.fillText(t.text,t.transform.position.x+this.size.x/2,t.transform.position.y+this.size.y/2))}}static registerSprite(t){r.sprites.push(t),r.sprites.sort(((t,e)=>e.order-t.order))}static registerText(t){r.texts.push(t)}static handleClick(t){const e=new o(t.offsetX-r.size.x/2,-t.offsetY+r.size.y/2);for(const t of n.buttons){if(!t.active)continue;const s=t.transform.position;e.x>=s.x-t.width/2&&e.x<=s.x+t.width/2&&e.y>=s.y-t.height/2&&e.y<=s.y+t.height/2&&t.onClick()}}}r.size=new o(320,512),r.sprites=[],r.texts=[];class h{constructor(t){this.gameObject=t}update(){}destroy(){}}var c,l;class p{static init(){this.images={}}static load(t){return e=this,s=void 0,a=function*(){const e=[];for(const s of t){const t=new Promise((t=>{const e=new Image;e.src=s,this.images[s]=e,e.onload=()=>{t()}}));e.push(t)}yield Promise.all(e),console.log("All images have been loaded")},new((i=void 0)||(i=Promise))((function(t,n){function o(t){try{h(a.next(t))}catch(t){n(t)}}function r(t){try{h(a.throw(t))}catch(t){n(t)}}function h(e){var s;e.done?t(e.value):(s=e.value,s instanceof i?s:new i((function(t){t(s)}))).then(o,r)}h((a=a.apply(e,s||[])).next())}));var e,s,i,a}static getImage(t){return this.images[t]}}p.images={};class u extends h{constructor(t,e){super(t),this.order=e||0,this.name="Sprite",this.flipX=!1,this.flipY=!1,this.alpha=1,r.registerSprite(this)}setSprite(t){const e=p.getImage(t);void 0===e?(this.image=new Image,this.image.src=t):this.image=e}get width(){return this.image.width}get height(){return this.image.height}}class d extends h{constructor(t){super(t),this.name="Transform",this.worldPosition=o.zero,this.rotation=0,this.scale=1,this.localPosition=o.zero}update(){null!==this.gameObject.parent&&(this.position=this.gameObject.parent.transform.position.add(this.localPosition))}set position(t){this.localPosition=t.sub(this.gameObject.parent?this.gameObject.parent.transform.position:o.zero),this.worldPosition=t}get position(){return this.worldPosition}}class m{constructor(t){this.parent=null,this.children=[],this.transform=new d(this),this.name=t,this.layer="Default",this.components={},this.isActive=!0,this.addComponent(this.transform),ut.registerGameObject(this)}update(){for(const t in this.components)this.active&&this.components[t].update()}addComponent(t){this.components[t.name]=t,"Collider"===t.name&&(t.OnCollisionStay.subscribe(this.OnCollisionStay),t.OnTriggerStay.subscribe(this.OnTriggerStay))}getComponent(t){const e=t.name;return this.components[e]}executeStart(){this.start();for(let t=0;t<this.children.length;t++)this.children[t].executeStart()}executeUpdate(){if(this.active){this.update();for(let t=0;t<this.children.length;t++)this.children[t].executeUpdate()}}setChild(t){this.children.includes(t)||(this.children.push(t),t.parent=this)}removeChild(t){this.children.includes(t)&&this.children.splice(this.children.indexOf(t),1)}setParent(t){t.setChild(this)}setActive(t){this.isActive=t,this.active?this.onEnabled():this.onDisabled()}get active(){return this.isActive}start(){}onEnabled(){}onDisabled(){}OnCollisionStay(t){}OnTriggerStay(t){}destroy(){this.parent&&this.parent.removeChild(this);for(const t of this.children)t.destroy();ut.unregisterGameObject(this)}}class g extends m{constructor(){super("Background"),this.transform.scale=.5;const t=new u(this,3);t.setSprite("assets/images/bck.png"),this.addComponent(t)}}class y{static init(){y.startTime=window.performance.now(),y.lastFrameTime=0}static get time(){return(window.performance.now()-y.startTime)/1e3}static get deltaTime(){return(window.performance.now()-y.lastFrameTime)/1e3}}!function(t){t[t.Force=0]="Force",t[t.VelocityChange=1]="VelocityChange"}(c||(c={}));class w extends h{constructor(t,e){super(t),this.name="RigidBody",this.gravityScale=e||1,this.velocity=o.zero,this.isStatic=!1}addForce(t,e=c.Force){e==c.Force?this.velocity=this.velocity.add(t):e==c.VelocityChange&&(this.velocity=new o(t.x,t.y))}update(){this.gravityScale&&(this.velocity=this.velocity.add(new o(0,-100*this.gravityScale).mul(y.deltaTime))),this.velocity.magnitude>.1&&(this.gameObject.transform.position=this.gameObject.transform.position.add(this.velocity.mul(100*y.deltaTime)))}}class f extends h{constructor(t){super(t),this.OnCollisionStay=new s,this.OnTriggerStay=new s,this.scale=new o(1,1),this.isTrigger=!1,this.name="Collider",i.registerCollider(this)}get size(){const t=this.gameObject.getComponent(u);return new o(t.width*this.scale.x,t.height*this.scale.y)}update(){super.update()}colliding(t){if(t.gameObject.active)if(this.isTrigger)this.OnTriggerStay.invoke(t);else{const e=this.gameObject.getComponent(w);if(!e)return;if(e.isStatic)return;const s=t.gameObject.getComponent(w),a=(s?s.velocity:o.zero).sub(e.velocity.mul(i.bounciness));e.velocity=a.magnitude<.005?o.zero:a,this.OnCollisionStay.invoke(t)}}}class O{static RandomFloat(t,e){return Math.random()*(e-t)+t}static RandomInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}static RandomPercent(t){return this.RandomFloat(0,100)<=t}static Lerp(t,e,s){return t+(e-t)*Math.max(0,Math.min(1,s))}static WeightPick(t){let e=0;const s=[];for(let i=0;i<t.length;i++)e+=t[i],s[i]=e;const i=this.RandomFloat(0,1)*e;for(let t=0;t<s.length;t++)if(s[t]>=i)return t;return-1}}class S{static init(){this.hatAudio=new Audio("assets/audios/propeller.mp3"),this.jetpackAudio=new Audio("assets/audios/jetpack.mp3"),this.fallingAudio=new Audio("assets/audios/falling.mp3"),this.monsterHitAudio=new Audio("assets/audios/monster_hit.mp3"),this.holeAudio=new Audio("assets/audios/black_hole.mp3")}static playJumpSound(){const t=new Audio("assets/audios/jump.mp3");t.volume=.5,t.playbackRate=O.RandomFloat(.9,1.1),t.play()}static playSpringSound(){const t=new Audio("assets/audios/spring.mp3");t.volume=.5,t.playbackRate=O.RandomFloat(.9,1.1),t.play()}static playWhiteSound(){const t=new Audio("assets/audios/white.mp3");t.volume=.4,t.playbackRate=O.RandomFloat(.9,1.1),t.play()}static playHatSound(){this.hatAudio.volume=.2,this.hatAudio.play()}static playJetpackSound(){this.jetpackAudio.volume=.2,this.jetpackAudio.play()}static playGameOverSound(){this.fallingAudio.volume=.2,this.fallingAudio.play()}static playMonsterHitSound(){this.monsterHitAudio.volume=.2,this.monsterHitAudio.play()}static playHoleSound(){this.holeAudio.volume=.2,this.holeAudio.play()}static playBreakSound(){const t=new Audio("assets/audios/break_platform.mp3");t.volume=.5,t.playbackRate=O.RandomFloat(.9,1.1),t.play()}}class v extends m{constructor(){super("BasePlatform"),this.onDisabled=()=>{this.powerUp&&this.powerUp.setActive(!1)};const t=new f(this);t.isTrigger=!0,this.sprite=new u(this,2),this.sprite.setSprite("assets/images/green-platform.png"),this.addComponent(this.sprite),this.addComponent(t)}addPowerUp(t){this.setChild(t);const e=t.getComponent(u);t.transform.localPosition=new o(O.RandomFloat(-this.sprite.width/2+e.width/2,this.sprite.width/2-e.width/2),this.sprite.height/2+e.height/2-2),this.powerUp=t}}!function(t){t[t.Linear=0]="Linear",t[t.InSine=1]="InSine",t[t.OutSine=2]="OutSine",t[t.InOutSine=3]="InOutSine",t[t.InQuad=4]="InQuad",t[t.OutQuad=5]="OutQuad",t[t.InOutQuad=6]="InOutQuad",t[t.InCubic=7]="InCubic",t[t.OutCubic=8]="OutCubic",t[t.InOutCubic=9]="InOutCubic",t[t.InQuart=10]="InQuart",t[t.OutQuart=11]="OutQuart",t[t.InOutQuart=12]="InOutQuart",t[t.InQuint=13]="InQuint",t[t.OutQuint=14]="OutQuint",t[t.InOutQuint=15]="InOutQuint",t[t.InExpo=16]="InExpo",t[t.OutExpo=17]="OutExpo",t[t.InOutExpo=18]="InOutExpo",t[t.InCirc=19]="InCirc",t[t.OutCirc=20]="OutCirc",t[t.InOutCirc=21]="InOutCirc",t[t.InElastic=22]="InElastic",t[t.OutElastic=23]="OutElastic",t[t.InOutElastic=24]="InOutElastic",t[t.InBack=25]="InBack",t[t.OutBack=26]="OutBack",t[t.InOutBack=27]="InOutBack",t[t.InBounce=28]="InBounce",t[t.OutBounce=29]="OutBounce",t[t.InOutBounce=30]="InOutBounce"}(l||(l={}));const b=1.70158,x=1.525*b,P=b+1,T=2*Math.PI/3,C=2*Math.PI/4.5,I=7.5625,k=2.75;class B{static EaseFuction(t,e){switch(t){case l.Linear:return e;case l.InSine:return 1-Math.cos(e*Math.PI/2);case l.OutSine:return Math.sin(e*Math.PI/2);case l.InOutSine:return.5*(1-Math.cos(Math.PI*e/2));case l.InQuad:return e*e;case l.OutQuad:return-e*(e-2);case l.InOutQuad:return e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;case l.InCubic:return e*e*e;case l.OutCubic:return(e-1)*(e-1)*(e-1)+1;case l.InOutCubic:return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2;case l.InQuart:return e*e*e*e;case l.OutQuart:return-((e-1)*(e-1)*(e-1)-1);case l.InOutQuart:return e<.5?8*e*e*e*e:1-Math.pow(-2*e+2,4)/2;case l.InQuint:return e*e*e*e*e;case l.OutQuint:return 1-Math.pow(1-e,5);case l.InOutQuint:return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2;case l.InExpo:return 0===e?0:Math.pow(2,10*e-10);case l.OutExpo:return 1===e?1:1-Math.pow(2,-10*e);case l.InOutExpo:return 0===e?0:1===e?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2;case l.InCirc:return 1-Math.sqrt(1-Math.pow(e,2));case l.OutCirc:return Math.sqrt(1-Math.pow(e-1,2));case l.InOutCirc:return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2;case l.InBack:return P*e*e*e-b*e*e;case l.OutBack:return 1+P*Math.pow(e-1,3)+b*Math.pow(e-1,2);case l.InOutBack:return e<.5?Math.pow(2*e,2)*(7.189819*e-x)/2:(Math.pow(2*e-2,2)*((x+1)*(2*e-2)+x)+2)/2;case l.InElastic:return 0===e?0:1===e?1:-Math.pow(2,10*e-10)*Math.sin((10*e-10.75)*T);case l.OutElastic:return 0===e?0:1===e?1:Math.pow(2,-10*e)*Math.sin((10*e-.75)*T)+1;case l.InOutElastic:return 0===e?0:1===e?1:e<.5?-Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*C)/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*C)/2+1;case l.InBounce:return 1-this.easeOutBounce(1-e);case l.OutBounce:return this.easeOutBounce(e);case l.InOutBounce:return e<.5?(1-this.easeOutBounce(1-2*e))/2:(1+this.easeOutBounce(2*e-1))/2;default:return e}}static easeOutBounce(t){return t<1/k?I*t*t:t<2/k?I*(t-=1.5/k)*t+.75:t<2.5/k?I*(t-=2.25/k)*t+.9375:I*(t-=2.625/k)*t+.984375}}class M{static init(){this.tweens=[]}static addTween(t){this.tweens.includes(t)||this.tweens.push(t)}static removeTween(t){const e=this.tweens.indexOf(t);-1!==e&&this.tweens.splice(e,1)}static update(){for(const t of this.tweens)t.update()}}class j{constructor(t,e){this.target=t,this.duration=e,this.easing=l.Linear,this.startTime=y.time,this.properties={},M.addTween(this)}to(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(this.target,e)){const s=this.target[e],i=t[e]-s;this.properties[e]={start:s,delta:i}}return this}setEasing(t){return this.easing=t,this}onComplete(t){return this.onCompleteCallback=t,this}update(){const t=y.time-this.startTime,e=Math.min(t/this.duration,1);for(const t in this.properties)if(Object.prototype.hasOwnProperty.call(this.properties,t)){const s=this.properties[t],i=B.EaseFuction(this.easing,e)*s.delta+s.start;this.target[t]=i}e>=1&&this.complete()}complete(){var t;M.removeTween(this);for(const t in this.properties)Object.prototype.hasOwnProperty.call(this.properties,t)&&delete this.properties[t];null===(t=this.onCompleteCallback)||void 0===t||t.call(this.onCompleteCallback)}}class A{constructor(t,e,s){this.pool=[],this.createObject=t,this.getObject=e,this.resetObject=s}get(){let t=null;return t=0===this.pool.length?this.createObject():this.pool.pop(),this.getObject(t),t}release(t){-1===this.pool.indexOf(t)&&(this.resetObject(t),this.pool.push(t))}clear(){this.pool.length=0}}class G extends m{constructor(){super("Hole"),this.sprite=new u(this,2),this.sprite.setSprite("assets/images/hole.png");const t=new f(this);t.isTrigger=!0,t.scale=new o(.5,.5),this.addComponent(this.sprite),this.addComponent(t)}update(){super.update(),this.transform.position.y+this.sprite.height/2<-r.size.y/2&&V.holePool.release(this)}}const z=["assets/images/monster-1.png"];class F extends m{constructor(){super("Monster");const t=new f(this);t.isTrigger=!0,this.sprite=new u(this,2),this.sprite.setSprite(z[0]),this.addComponent(t),this.addComponent(this.sprite)}update(){super.update(),this.transform.position.y+this.sprite.height/2<-r.size.y/2&&V.monsterPool.release(this)}}const E=new o(50,200);class R extends v{constructor(){super(),this.name="BluePlatform",this.sprite.setSprite("assets/images/blue-platform.png"),this.moveDirection=o.right}update(){super.update(),this.transform.position.x>r.size.x/2?this.moveDirection=o.left:this.transform.position.x<-r.size.x/2&&(this.moveDirection=o.right),this.transform.position=this.transform.position.add(this.moveDirection.mul(O.RandomFloat(E.x,E.y)*y.deltaTime))}}const D=["assets/images/brown-platform-0.png","assets/images/brown-platform-1.png","assets/images/brown-platform-2.png","assets/images/brown-platform-3.png"];class Q extends v{constructor(){super(),this.name="BrownPlatform",this.sprite.setSprite(D[0]),this.spriteIndex=0,this.isBreaking=!1,this.timer=.02,this.rigidBody=new w(this,0),this.addComponent(this.rigidBody)}onEnabled(){super.onEnabled(),this.isBreaking=!1,this.rigidBody.gravityScale=0,this.rigidBody.velocity=o.zero,this.spriteIndex=0,this.sprite.setSprite(D[0])}setIsBreaking(t){this.isBreaking!==t&&(this.isBreaking=t,this.isBreaking&&(S.playBreakSound(),this.rigidBody.gravityScale=.08))}update(){super.update(),this.timer-=y.deltaTime,this.isBreaking&&this.timer<0&&(this.timer=.02,++this.spriteIndex<D.length&&this.sprite.setSprite(D[this.spriteIndex]))}}class L extends v{constructor(){super(),this.name="WhitePlatform",this.sprite.setSprite("assets/images/white-platform.png")}}class H{static getPlaformTypes(t){for(const e in this.scoreToPlatformTypeSpawn)if(t<parseFloat(e))return this.scoreToPlatformTypeSpawn[e];const e=Object.keys(this.scoreToPlatformTypeSpawn),s=e[e.length-1];return this.scoreToPlatformTypeSpawn[parseFloat(s)]}static getObstacleTypes(t){for(const e in this.obstacleSpawnChances)if(t<parseFloat(e))return this.obstacleSpawnChances[e];const e=Object.keys(this.obstacleSpawnChances),s=e[e.length-1];return this.obstacleSpawnChances[parseFloat(s)]}static getPlatfomSpawnDistances(t){for(const e in this.scoreToPlatfomSpawnDistances)if(t<parseFloat(e))return this.scoreToPlatfomSpawnDistances[e];const e=Object.keys(this.scoreToPlatfomSpawnDistances),s=e[e.length-1];return this.scoreToPlatfomSpawnDistances[parseFloat(s)]}}H.powerUpSpawnChances=[85,10,5],H.obstacleSpawnChances={8e3:[100,0,0],1e4:[55,5,35],15e3:[50,10,40]},H.scoreToPlatfomSpawnDistances={1e3:new o(20,50),3e3:new o(20,55),6e3:new o(20,60),8e3:new o(20,70),1e4:new o(20,80),15e3:new o(30,90),2e4:new o(30,100)},H.scoreToPlatformTypeSpawn={1e3:[90,10,0,0],4e3:[85,10,5,0],8e3:[60,10,40,0],12e3:[30,10,70,0],2e4:[50,10,10,30]};class _ extends m{constructor(){super("Text"),this.text="",this.font="28px Arial",r.registerText(this)}}class K extends m{constructor(){super("ScoreManager"),this.enviroment=ut.Find("Enviroment"),this.scoreText=new _,this.scoreText.font="600 32px DoodleJump",this.scoreText.transform.position=new o(-150,-230),this.scoreText.name="ScoreText",K.score=0,K.highScore=0}update(){super.update(),lt.getGameState()===t.Playing?(K.score=this.enviroment.point()<=0?0:Math.floor(this.enviroment.point()),this.scoreText.text=K.score.toString(),K.score>K.highScore&&(K.highScore=K.score)):K.score=0}static getScore(){return this.score}static getHighScore(){return this.highScore}}class U extends m{constructor(){super("Hat");const t=new u(this,2);t.setSprite("assets/images/hat.png");const e=new f(this);e.isTrigger=!0,this.addComponent(t),this.addComponent(e)}}class W extends m{constructor(){super("Jetpack");const t=new u(this,2);t.setSprite("assets/images/jetpack.png");const e=new f(this);this.addComponent(e),this.addComponent(t)}}class J extends m{constructor(){super("Spring"),this.sprite=new u(this,2),this.sprite.setSprite("assets/images/spring-0.png");const t=new f(this);t.isTrigger=!0,this.addComponent(this.sprite),this.addComponent(t)}activeSpring(){this.sprite.setSprite("assets/images/spring-1.png")}}class q{static init(t,e){this.isInitialGenerated=!1,this.player=t,this.enviroment=e,this.platforms=[]}static update(){for(let t=0;t<this.platforms.length;t++)this.platforms[t].active&&this.platforms[t].transform.position.y+this.platformSprite.height/2<-r.size.y/2&&V.releasePlatform(this.platforms[t]);this.isInitialGenerated&&this.player.transform.position.y+this.maxDistance>this.previousPlatformGenerated.transform.position.y&&(this.spawnPlatform(),O.RandomPercent(10)&&X.spawnObstacle())}static spawnPlatform(){let t=null;switch(O.WeightPick(H.getPlaformTypes(K.getScore()))){case 0:t=V.basePlatformsPool.get(),this.addPowerUp(t);break;case 1:t=V.brownPlatformsPool.get(),this.setPlatformPosition(V.basePlatformsPool.get(),K.getScore());break;case 2:t=V.bluePlatformsPool.get(),this.addPowerUp(t);break;case 3:t=V.whitePlatformsPool.get();break;default:t=V.basePlatformsPool.get()}this.setPlatformPosition(t,K.getScore()),this.previousPlatformGenerated=t}static setPlatformPosition(t,e){t.transform.position=new o(O.RandomFloat(-r.size.x/2+20,r.size.x/2-20),this.previousPlatformGenerated.transform.position.y+O.RandomFloat(H.getPlatfomSpawnDistances(e).x,H.getPlatfomSpawnDistances(e).y))}static readySpawn(){this.reset();const t=V.basePlatformsPool.get();t.transform.position=new o(-80,-200),this.platformSprite=t.getComponent(u)}static playingStateSpawn(){this.reset(),this.enviroment.transform.position=o.zero;const t=V.basePlatformsPool.get();t.transform.position=new o(0,-200),this.platformSprite=t.getComponent(u),this.previousPlatformGenerated=t;for(let t=0;t<20;t++)this.spawnPlatform();this.maxDistance=this.previousPlatformGenerated.transform.position.y-this.player.transform.position.y,this.isInitialGenerated=!0}static reset(){for(const t of this.platforms)V.releasePlatform(t)}static addPowerUp(t){if(this.platforms.length>20&&O.RandomPercent(10))switch(O.WeightPick(H.powerUpSpawnChances)){case 0:t.addPowerUp(new J);break;case 1:t.addPowerUp(new U);break;case 2:t.addPowerUp(new W)}}}class X{static init(){this.obstacles=[]}static spawnObstacle(){let t=null;switch(O.WeightPick(H.getObstacleTypes(K.getScore()))){case 0:break;case 1:default:t=V.holePool.get();break;case 2:t=V.monsterPool.get()}t&&(t.transform.position=q.previousPlatformGenerated.transform.position.add(new o(0,200)))}static reset(){for(const t of this.obstacles)V.releaseObstacle(t)}}class V{static init(t){this.basePlatformsPool=new A((()=>{const e=new v;return e.parent=t,q.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.bluePlatformsPool=new A((()=>{const e=new R;return e.parent=t,q.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.brownPlatformsPool=new A((()=>{const e=new Q;return e.parent=t,q.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.whitePlatformsPool=new A((()=>{const e=new L;return e.parent=t,q.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.holePool=new A((()=>{const e=new G;return e.parent=t,X.obstacles.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.monsterPool=new A((()=>{const e=new F;return e.parent=t,X.obstacles.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)}))}static releasePlatform(t){switch(t.name){case"BasePlatform":this.basePlatformsPool.release(t);break;case"BluePlatform":this.bluePlatformsPool.release(t);break;case"BrownPlatform":this.brownPlatformsPool.release(t);break;case"WhitePlatform":this.whitePlatformsPool.release(t)}}static releaseObstacle(t){switch(t.name){case"Hole":this.holePool.release(t);break;case"Monster":this.monsterPool.release(t)}}}class Y{constructor(){this.position=new o(0,0)}}class N{static init(){const t=r.canvas;t.addEventListener("keydown",(t=>this.handleKeyDown(t))),t.addEventListener("keyup",(t=>this.handleKeyUp(t))),t.addEventListener("mousedown",(()=>this.handleMouseDown())),t.addEventListener("mouseup",(()=>this.handleMouseUp())),t.addEventListener("touchstart",this.handleTouchStart),t.addEventListener("touchend",this.handleTouchEnd),this.touch=new Y,this.isTouching=!1,this.isHeld=!1}static getKeyDown(t){return this.previousKeyStates.has(t)}static getKey(t){return this.heldKeyStates.has(t)}static getMouseDown(){return this.isMouseDown}static handleKeyDown(t){const e=t.code;this.heldKeyStates.has(e)||this.heldKeyStates.add(e),this.isHeld||this.previousKeyStates.has(e)||(this.isHeld=!0,this.previousKeyStates.add(e))}static handleKeyUp(t){const e=t.code;this.isHeld=!1,this.heldKeyStates.delete(e)}static handleMouseDown(){this.isMouseDown=!0}static handleMouseUp(){this.isMouseDown=!1}static handleTouchStart(t){N.isTouching=!0;const e=t.target.getBoundingClientRect(),s=t.targetTouches[0].pageX-e.left,i=t.targetTouches[0].pageY-e.top;N.touch.position=new o(s-r.size.x/2,r.size.y/2-i)}static handleTouchEnd(){N.isTouching=!1}static getTouch(){return this.touch}static reset(){this.previousKeyStates.clear(),this.isMouseDown=!1}}N.previousKeyStates=new Set,N.heldKeyStates=new Set;class Z{getMovementInput(){if(N.getKey("KeyD")||N.getKey("ArrowRight"))return 1;if(N.getKey("KeyA")||N.getKey("ArrowLeft"))return-1;if(N.isTouching){const t=N.getTouch();return console.log(t),t.position.x>0?1:t.position.x<0?-1:0}return 0}}class $ extends m{constructor(){super("Player"),this.OnTriggerStay=e=>{if(e.gameObject instanceof v&&this.isFalling&&!this.isMonsterTouched){if(this.transform.position.y-this.collider.size.y/2<e.gameObject.transform.position.y)return;"BrownPlatform"==e.gameObject.name?e.gameObject.setIsBreaking(!0):(this.jump(5),"WhitePlatform"==e.gameObject.name?(V.whitePlatformsPool.release(e.gameObject),S.playWhiteSound()):S.playJumpSound())}else"Spring"===e.gameObject.name&&this.isFalling&&!this.isMonsterTouched&&(e.gameObject.activeSpring(),this.jump(8),S.playSpringSound());this.isImmortal||("Hat"!==e.gameObject.name||this.isMonsterTouched?"Jetpack"!==e.gameObject.name||this.isMonsterTouched?"Hole"!==e.gameObject.name||this.isHoleTouched?"Monster"!==e.gameObject.name||this.isMonsterTouched||(this.isMonsterTouched=!0,S.playMonsterHitSound()):(this.isHoleTouched=!0,this.rigidBody.gravityScale=0,this.rigidBody.velocity=o.zero,S.playHoleSound(),new j(this.transform,1).to({scale:0,rotation:20}).setEasing(l.OutQuart).onComplete((()=>{lt.updateGameState(t.GameOver)}))):(this.jetpackTimer=2.5,e.gameObject.setActive(!1),this.jump(25),S.playJetpackSound()):(this.hatTimer=2.5,e.gameObject.setActive(!1),this.rigidBody.velocity=o.zero,S.playHatSound()))},this.OnGameStateChanged=e=>{switch(e){case t.Ready:this.transform.position=new o(-80,0),this.rigidBody.velocity=o.zero,this.transform.scale=1,this.transform.rotation=0,this.rigidBody.gravityScale=.08;break;case t.Playing:this.isHoleTouched=!1,this.isMonsterTouched=!1,this.transform.scale=1,this.transform.rotation=0,this.transform.position=o.zero,this.rigidBody.gravityScale=.08;break;case t.GameOver:this.gameOverDelayTimer=.5}},this.rigidBody=new w(this,.08),this.sprite=new u(this,1),this.sprite.setSprite("assets/images/lik-left.png"),this.collider=new f(this),this.collider.isTrigger=!0,this.collider.scale=new o(.5,1),this.addComponent(this.sprite),this.addComponent(this.rigidBody),this.addComponent(this.collider),this.isHoleTouched=!1,this.isMonsterTouched=!1,lt.OnGameStateChanged.subscribe(this.OnGameStateChanged),this.playerInput=new Z}update(){if(super.update(),this.hatTimer-=y.deltaTime,this.jetpackTimer-=y.deltaTime,this.gameOverDelayTimer-=y.deltaTime,this.hatTimer>0&&this.rigidBody.addForce(o.up.mul(12*y.deltaTime),c.Force),lt.getGameState()!==t.Ready&&!this.isHoleTouched&&!this.isMonsterTouched){const t=2*this.playerInput.getMovementInput();this.rigidBody.velocity=new o(t,this.rigidBody.velocity.y),t>0?this.sprite.flipX=!0:t<0&&(this.sprite.flipX=!1)}(this.transform.position.y>=0||lt.getGameState()===t.GameOver&&this.gameOverDelayTimer>0)&&(this.transform.position=new o(this.transform.position.x,0)),this.transform.position.x+this.sprite.width/2<-r.size.x/2&&(this.transform.position=new o(r.size.x/2+this.sprite.width/2,this.transform.position.y)),this.transform.position.x-this.sprite.width/2>r.size.x/2&&(this.transform.position=new o(-r.size.x/2-this.sprite.width/2,this.transform.position.y)),this.transform.position.y+this.sprite.height/2<-r.size.y/2&&(lt.getGameState()!==t.Playing&&lt.getGameState()!==t.Ready||lt.updateGameState(t.GameOver))}jump(t){this.rigidBody.addForce(new o(0,t),c.VelocityChange)}get isFalling(){return this.rigidBody.velocity.y<0}get isImmortal(){return this.hatTimer>0||this.jetpackTimer>0}}class tt extends m{constructor(t){super("Enviroment"),this.player=t,this.playerRb=this.player.getComponent(w),this.rigidBody=new w(this,.08),this.addComponent(this.rigidBody)}update(){super.update(),this.rigidBody.velocity=o.zero,this.rigidBody.gravityScale=0,lt.getGameState()!==t.GameOver&&this.player.transform.position.y>=0&&!this.player.isFalling?(this.rigidBody.gravityScale=.08,this.rigidBody.velocity=new o(0,-this.playerRb.velocity.y)):lt.getGameState()===t.GameOver&&this.rigidBody.addForce(o.up.mul(20),c.VelocityChange)}point(){return-this.transform.position.y}}class et extends m{constructor(){super("TopBar");const t=new u(this,0);t.setSprite("assets/images/top-score.png"),this.addComponent(t),this.transform.position=new o(0,r.size.y/2-t.height/2)}}class st extends m{constructor(){super("PlatformGenerator"),this.OnGameStateChange=e=>{switch(e){case t.Ready:this.handleReady();break;case t.Playing:this.handlePlaying()}};const e=ut.Find("Enviroment"),s=ut.Find("Player");V.init(e),q.init(s,e),X.init(),lt.OnGameStateChanged.subscribe(this.OnGameStateChange)}update(){super.update(),q.update()}handlePlaying(){q.playingStateSpawn()}handleReady(){q.readySpawn(),X.reset()}}class it extends m{constructor(){super("BlackImage"),this.sprite=new u(this,0),this.sprite.setSprite("assets/images/black-image.png"),this.sprite.alpha=0}update(){super.update()}show(){new j(this.sprite,1).to({alpha:1}).onComplete((()=>{lt.updateGameState(t.Playing),new j(this.sprite,0).to({alpha:0})}))}}class at extends m{constructor(t,e){super(t),this.sprite=new u(this,0),this.sprite.setSprite(e),this.addComponent(this.sprite),n.add(this)}get width(){return this.sprite.width*this.transform.scale}get height(){return this.sprite.height*this.transform.scale}}const nt="assets/images/play.png";class ot extends at{constructor(){super("PlayButton",nt)}onEnabled(){this.sprite.setSprite(nt)}onClick(){this.sprite.setSprite("assets/images/play-on.png"),ut.Find("BlackImage").show()}}class rt extends m{constructor(){super("MainMenu"),this.OnGameStateChanged=e=>{switch(e){case t.Ready:this.playButton.setActive(!0),this.title.setActive(!0);break;case t.Playing:this.playButton.setActive(!1),this.title.setActive(!1)}},this.playButton=new ot,this.title=new m("Title");const e=new u(this.title,0);e.setSprite("assets/images/doodle-jump.png"),this.title.addComponent(e),this.playButton.transform.position=new o(-45,90),this.title.transform.position=new o(-45,150),lt.OnGameStateChanged.subscribe(this.OnGameStateChanged)}}class ht extends at{constructor(){super("ReturnMenuButton","assets/images/menu.png")}onClick(){lt.updateGameState(t.Ready)}}class ct extends m{constructor(){super("GameOverCanvas"),this.OnGameStateChanged=e=>{switch(e){case t.Ready:case t.Playing:this.setActive(!1);break;case t.GameOver:this.setActive(!0),this.scoreText.text="your score: "+K.getScore(),this.highScoreText.text="your high score: "+K.getHighScore()}},this.playButton=new ot,this.returnMenuButton=new ht,this.playButton.transform.position=new o(30,-120),this.returnMenuButton.transform.position=new o(100,-170),this.scoreText=new _,this.highScoreText=new _,this.scoreText.transform.position=new o(-100,-10),this.highScoreText.transform.position=new o(-125,30),this.scoreText.font="600 30px DoodleJump",this.highScoreText.font="600 30px DoodleJump",lt.OnGameStateChanged.subscribe(this.OnGameStateChanged)}setActive(t){super.setActive(t),this.playButton.setActive(t),this.returnMenuButton.setActive(t),this.scoreText.setActive(t),this.highScoreText.setActive(t)}}class lt{static init(){a.add("Background"),i.setInteractiveLayer("Background","Background",!1),this.OnGameStateChanged=new s;const e=new $;new g,new et,new tt(e),new st,new rt,new ct,this.blackImage=new it,new K,this.updateGameState(t.Ready)}static updateGameState(e){switch(this.gameState=e,this.gameState){case t.Ready:case t.Playing:break;case t.GameOver:S.playGameOverSound()}this.OnGameStateChanged.invoke(this.gameState)}static getGameState(){return this.gameState}}const pt=["assets/images/green-platform.png","assets/images/blue-platform.png","assets/images/brown-platform-0.png","assets/images/brown-platform-1.png","assets/images/brown-platform-2.png","assets/images/brown-platform-3.png","assets/images/white-platform.png","assets/images/lik-left.png","assets/images/spring-0.png","assets/images/spring-1.png","assets/images/hat.png","assets/images/jetpack.png","assets/images/play-on.png","assets/images/top-score.png","assets/images/doodle-jump.png","assets/images/play.png","assets/images/play-on.png","assets/images/monster-1.png","assets/images/hole.png"];class ut{constructor(){p.init(),p.load(pt).then((()=>{y.init(),n.init(),r.init("game"),N.init(),a.init(),S.init(),M.init(),lt.init(),lt.updateGameState(t.Ready),this.loop()}))}loop(){y.deltaTime>=1/300&&(i.update(),ut.update(),M.update(),r.draw(),N.reset(),y.lastFrameTime=window.performance.now()),window.requestAnimationFrame((()=>{this.loop()}))}static update(){for(let t=0;t<this.gameObjects.length;t++)this.gameObjects[t].executeUpdate()}static registerGameObject(t){ut.gameObjects.push(t)}static unregisterGameObject(t){ut.gameObjects.slice(ut.gameObjects.indexOf(t),1)}static Find(t){for(let e=0;e<ut.gameObjects.length;e++)if(ut.gameObjects[e].name==t)return ut.gameObjects[e];return null}}ut.gameObjects=[],new ut})();