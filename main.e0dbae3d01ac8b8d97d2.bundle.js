(()=>{"use strict";var t,e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};e.d({},{l:()=>ft});class s{constructor(){this.listeners=[]}subscribe(t){this.listeners.push(t)}unsubscribe(t){const e=this.listeners.indexOf(t);-1!==e&&this.listeners.splice(e,1)}invoke(t){for(const e of this.listeners)e(t)}}!function(t){t[t.Ready=0]="Ready",t[t.Playing=1]="Playing",t[t.GameOver=2]="GameOver",t[t.Pause=3]="Pause"}(t||(t={}));class i{static init(){this.scenes=[]}static update(){for(const t of this.scenes)t.active&&t.update()}static registerScene(t){0===this.scenes.length&&t.setActive(!0),this.scenes.push(t)}static getSceneByName(t){for(const e of this.scenes)if(e.name===t)return e;return null}static loadScene(t){for(const e of this.scenes)if(e===t)e.setActive(!0);else{for(const s of e.gameObjects)s.dontDestroyOnLoad&&(e.unregisterGameObject(s),t.registerGameObject(s));e.setActive(!1)}}}class a{static RandomFloat(t,e){return Math.random()*(e-t)+t}static RandomInt(t,e){return Math.floor(Math.random()*(e-t+1)+t)}static RandomPercent(t){return this.RandomFloat(0,100)<=t}static Lerp(t,e,s){return t+(e-t)*Math.max(0,Math.min(1,s))}static WeightPick(t){let e=0;const s=[];for(let i=0;i<t.length;i++)e+=t[i],s[i]=e;const i=this.RandomFloat(0,1)*e;for(let t=0;t<s.length;t++)if(s[t]>=i)return t;return-1}}var n=function(t,e,s,i){return new(s||(s=Promise))((function(a,n){function o(t){try{c(i.next(t))}catch(t){n(t)}}function r(t){try{c(i.throw(t))}catch(t){n(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,r)}c((i=i.apply(t,e||[])).next())}))};class o{static init(){return n(this,void 0,void 0,(function*(){this.jumpAudio=yield this.loadAudio("assets/audios/jump.mp3"),this.hatAudio=yield this.loadAudio("assets/audios/propeller.mp3"),this.jetpackAudio=yield this.loadAudio("assets/audios/jetpack.mp3"),this.fallingAudio=yield this.loadAudio("assets/audios/falling.mp3"),this.monsterHitAudio=yield this.loadAudio("assets/audios/monster_hit.mp3"),this.holeAudio=yield this.loadAudio("assets/audios/black_hole.mp3"),this.springAudio=yield this.loadAudio("assets/audios/spring.mp3"),this.breakAudio=yield this.loadAudio("assets/audios/break_platform.mp3"),this.whiteAudio=yield this.loadAudio("assets/audios/white.mp3"),this.jumpOnMonsterAudio=yield this.loadAudio("assets/audios/jumponmonster.mp3")}))}static loadAudio(t){return n(this,void 0,void 0,(function*(){const e=yield fetch(t),s=yield e.blob(),i=URL.createObjectURL(s);return new Audio(i)}))}static playJumpSound(){this.jumpAudio.volume=.5,this.jumpAudio.playbackRate=a.RandomFloat(.9,1.1),this.jumpAudio.play().catch((()=>{}))}static playSpringSound(){this.springAudio.volume=.5,this.springAudio.playbackRate=a.RandomFloat(.9,1.1),this.springAudio.play()}static playWhiteSound(){this.whiteAudio.volume=.4,this.whiteAudio.playbackRate=a.RandomFloat(.9,1.1),this.whiteAudio.play()}static playHatSound(){this.hatAudio.volume=.2,this.hatAudio.play()}static playJetpackSound(){this.jetpackAudio.volume=.2,this.jetpackAudio.play()}static playGameOverSound(){this.fallingAudio.volume=.2,this.fallingAudio.play()}static playMonsterHitSound(){this.monsterHitAudio.volume=.2,this.monsterHitAudio.play()}static playJumpOnMonsterSound(){this.jumpOnMonsterAudio.playbackRate=a.RandomFloat(.9,1.1),this.jumpOnMonsterAudio.play(),this.jumpOnMonsterAudio.volume=.2}static playHoleSound(){this.holeAudio.volume=.2,this.holeAudio.play()}static playBreakSound(){this.breakAudio.volume=.5,this.breakAudio.playbackRate=a.RandomFloat(.9,1.1),this.breakAudio.play()}}class r{static init(){this.OnGameStateChanged=new s}static updateGameState(e){switch(this.gameState=e,this.gameState){case t.Ready:this.handleReadyState();break;case t.Playing:this.handlePlayingState();break;case t.GameOver:o.playGameOverSound()}this.OnGameStateChanged.invoke(this.gameState)}static handleReadyState(){const t=i.getSceneByName("MainMenuScene");t&&i.loadScene(t)}static handlePlayingState(){const t=i.getSceneByName("GameplayScene");t&&i.loadScene(t)}static getGameState(){return this.gameState}}class c{static init(){c.startTime=window.performance.now(),c.lastFrameTime=0}static get time(){return(window.performance.now()-c.startTime)/1e3}static get deltaTime(){return(window.performance.now()-c.lastFrameTime)/1e3}}class h{static init(){h.buttons=[]}static add(t){this.buttons.push(t)}}class l{constructor(t,e){this._x=t,this._y=e}add(t){return new l(this._x+t._x,this._y+t._y)}sub(t){return new l(this._x-t._x,this._y-t._y)}mul(t){return new l(this._x*t,this._y*t)}static get zero(){return new l(0,0)}static get up(){return new l(0,1)}static get left(){return new l(-1,0)}static get right(){return new l(1,0)}get x(){return this._x}get y(){return this._y}get magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}get normalize(){const t=this.magnitude;return 0!==t?new l(this._x/t,this._y/t):l.zero}dot(t){return this._x*t._x+this._y*t._y}}class p{static init(t){this.canvas=document.getElementById(t),this.canvas.width=p.size.x,this.canvas.height=p.size.y,this.canvas.addEventListener("click",p.handleClick),p.context=this.canvas.getContext("2d")}static draw(){if(p.context){for(const t of this.sprites){const e=t.gameObject;if(!e.active)continue;const s=this.size.x/2,i=this.size.y/2,a=t.width/2*e.transform.scale,n=t.height/2*e.transform.scale,o=e.transform.position.x+s,r=-e.transform.position.y+i;p.context.save(),p.context.globalAlpha=t.alpha,p.context.translate(o,r),p.context.rotate(e.transform.rotation),t.flipX&&p.context.scale(-1,1),t.flipY&&p.context.scale(1,-1),t.image.complete&&0!==t.image.naturalWidth&&p.context.drawImage(t.image,-a,-n,t.width*e.transform.scale,t.height*e.transform.scale),p.context.restore()}for(const t of this.texts)t.active&&(p.context.font=t.font,p.context.fillText(t.text,t.transform.position.x+this.size.x/2,-t.transform.position.y+this.size.y/2))}}static registerSprite(t){p.sprites.push(t),p.sprites.sort(((t,e)=>e.order-t.order))}static registerText(t){p.texts.push(t)}static handleClick(t){const e=new l(t.offsetX-p.size.x/2,-t.offsetY+p.size.y/2);for(const t of h.buttons){if(!t.active)continue;const s=t.transform.position;e.x>=s.x-t.width/2&&e.x<=s.x+t.width/2&&e.y>=s.y-t.height/2&&e.y<=s.y+t.height/2&&t.onClick()}}}p.size=new l(320,512),p.sprites=[],p.texts=[];class u{static init(){u.add("Default")}static add(t){d.registerInteractiveLayer(t),this.layers.push(t)}static remove(t){this.layers.splice(this.layers.indexOf(t))}}u.layers=[];class d{static get bounciness(){return.75}static registerCollider(t){d.colliders.push(t)}static registerInteractiveLayer(t){for(const e of u.layers)d.setInteractiveLayer(e,t,!0),d.setInteractiveLayer(t,e,!0);d.setInteractiveLayer(t,t,!0)}static setInteractiveLayer(t,e,s){d.interactiveLayers[`${t},${e}`]=s,d.interactiveLayers[`${e},${t}`]=s}static isInteractiveLayer(t,e){var s;return null!==(s=d.interactiveLayers[`${t},${e}`])&&void 0!==s&&s}static update(){const t=d.colliders.length;for(let e=0;e<t-1;e++){const s=d.colliders[e];if(s.gameObject.active)for(let i=e+1;i<t;i++){const t=d.colliders[i];if(!t.gameObject.active)continue;const e=s.gameObject.layer,a=t.gameObject.layer;d.isInteractiveLayer(e,a)&&d.checkCollision(s,t)&&(s.colliding(t),t.colliding(s))}}}static checkCollision(t,e){const s=t.gameObject.transform.position,i=e.gameObject.transform.position;return s.x+t.size.x/2>=i.x-e.size.x/2&&s.x-t.size.x/2<=i.x+e.size.x/2&&s.y+t.size.y/2>=i.y-e.size.y/2&&s.y-t.size.y/2<=i.y+e.size.y/2}}d.colliders=[],d.interactiveLayers={};class m{constructor(){this.position=new l(0,0)}}class g{static init(){const t=p.canvas;document.addEventListener("keydown",(t=>this.handleKeyDown(t))),document.addEventListener("keyup",(t=>this.handleKeyUp(t))),t.addEventListener("mousedown",(()=>this.handleMouseDown())),t.addEventListener("mouseup",(()=>this.handleMouseUp())),t.addEventListener("touchstart",this.handleTouchStart),t.addEventListener("touchend",this.handleTouchEnd),this.touch=new m,this.isTouching=!1,this.isHeld=!1}static getKeyDown(t){return this.previousKeyStates.has(t)}static getKey(t){return this.heldKeyStates.has(t)}static getMouseDown(){return this.isMouseDown}static handleKeyDown(t){const e=t.code;this.heldKeyStates.has(e)||this.heldKeyStates.add(e),this.isHeld||this.previousKeyStates.has(e)||(this.isHeld=!0,this.previousKeyStates.add(e))}static handleKeyUp(t){const e=t.code;this.isHeld=!1,this.heldKeyStates.delete(e)}static handleMouseDown(){this.isMouseDown=!0}static handleMouseUp(){this.isMouseDown=!1}static handleTouchStart(t){g.isTouching=!0;const e=t.target.getBoundingClientRect(),s=t.targetTouches[0].pageX-e.left,i=t.targetTouches[0].pageY-e.top;g.touch.position=new l(s-p.size.x/2,p.size.y/2-i)}static handleTouchEnd(){g.isTouching=!1}static getTouch(){return this.touch}static reset(){this.previousKeyStates.clear(),this.isMouseDown=!1}}g.previousKeyStates=new Set,g.heldKeyStates=new Set;class y{static init(){this.tweens=[]}static addTween(t){this.tweens.includes(t)||this.tweens.push(t)}static removeTween(t){const e=this.tweens.indexOf(t);-1!==e&&this.tweens.splice(e,1)}static update(){for(const t of this.tweens)t.update()}}var f,w;class O{static init(){this.images={}}static load(t){return e=this,s=void 0,a=function*(){const e=[];for(const s of t){const t=new Promise((t=>{const e=new Image;e.src=s,this.images[s]=e,e.onload=()=>{t()}}));e.push(t)}yield Promise.all(e),console.log("All images have been loaded")},new((i=void 0)||(i=Promise))((function(t,n){function o(t){try{c(a.next(t))}catch(t){n(t)}}function r(t){try{c(a.throw(t))}catch(t){n(t)}}function c(e){var s;e.done?t(e.value):(s=e.value,s instanceof i?s:new i((function(t){t(s)}))).then(o,r)}c((a=a.apply(e,s||[])).next())}));var e,s,i,a}static getImage(t){return this.images[t]}}O.images={};class b{constructor(t){this.gameObject=t}update(){}destroy(){}}class S extends b{constructor(t,e){super(t),this.order=e||0,this.name="Sprite",this.flipX=!1,this.flipY=!1,this.alpha=1,p.registerSprite(this)}setSprite(t){const e=O.getImage(t);void 0===e?(this.image=new Image,this.image.src=t):this.image=e}get width(){return this.image.width}get height(){return this.image.height}}class v extends b{constructor(t){super(t),this.OnCollisionStay=new s,this.OnTriggerStay=new s,this.scale=new l(1,1),this.isTrigger=!1,this.name="Collider",d.registerCollider(this)}get size(){const t=this.gameObject.getComponent("Sprite");return new l(t.width*this.scale.x,t.height*this.scale.y).mul(this.gameObject.transform.scale)}update(){super.update()}colliding(t){if(t.gameObject.active)if(this.isTrigger)this.OnTriggerStay.invoke(t);else{const e=this.gameObject.getComponent("RigidBody");if(!e)return;if(e.isStatic)return;const s=t.gameObject.getComponent("RigidBody"),i=(s?s.velocity:l.zero).sub(e.velocity.mul(d.bounciness));e.velocity=i.magnitude<.005?l.zero:i,this.OnCollisionStay.invoke(t)}}}class x extends b{constructor(t){super(t),this.name="Transform",this.worldPosition=l.zero,this.rotation=0,this.scale=1,this.localPosition=l.zero}update(){null!==this.gameObject.parent&&(this.position=this.gameObject.parent.transform.position.add(this.localPosition))}set position(t){this.localPosition=t.sub(this.gameObject.parent?this.gameObject.parent.transform.position:l.zero),this.worldPosition=t}get position(){return this.worldPosition}}class P{constructor(t){var e;this.parent=null,this.children=[],this.transform=new x(this),this.name=t,this.layer="Default",this.components={},this.isActive=!0,this.dontDestroyOnLoad=!1,this.addComponent(this.transform),ft.registerGameObject(this),(null===(e=this.parent)||void 0===e?void 0:e.scene)&&this.parent.scene.registerGameObject(this)}update(){for(const t in this.components){const e=this.components[t];this.isActive&&e.update()}}addComponent(t){this.components[t.name]=t,t instanceof v&&(t.OnCollisionStay.subscribe(this.OnCollisionStay),t.OnTriggerStay.subscribe(this.OnTriggerStay))}getComponent(t){return this.components[t]}executeStart(){this.start();for(const t of this.children)t.executeStart()}executeUpdate(){if(this.isActive){this.update();for(const t of this.children)t.executeUpdate()}}setChild(t){this.children.includes(t)||(this.children.push(t),t.parent=this,this.scene&&this.scene.registerGameObject(t))}removeChild(t){const e=this.children.indexOf(t);-1!==e&&this.children.splice(e,1)}setParent(t){t.setChild(this)}setActive(t){this.isActive=t,this.isActive?this.onEnabled():this.onDisabled()}get active(){var t;return this.isActive&&(null===(t=this.scene)||void 0===t?void 0:t.active)}start(){}onEnabled(){}onDisabled(){}OnCollisionStay(t){}OnTriggerStay(t){}destroy(){this.parent&&this.parent.removeChild(this);for(const t of this.children)t.destroy();ft.unregisterGameObject(this)}}class T{constructor(t){this.name=t,this.gameObjects=[],this.active=!1,i.registerScene(this)}update(){if(this.active)for(const t of this.gameObjects)t.update()}setActive(t){this.active=t}registerGameObject(t){this.gameObjects.push(t),t.scene=this}unregisterGameObject(t){this.gameObjects.slice(this.gameObjects.indexOf(t),1)}}class j extends P{constructor(){super("Background"),this.transform.scale=.5;const t=new S(this,3);t.setSprite("assets/images/bck.png"),this.addComponent(t)}}class C extends P{constructor(){super("BasePlatform"),this.onDisabled=()=>{this.powerUp&&this.powerUp.setActive(!1)};const t=new v(this);t.isTrigger=!0,this.sprite=new S(this,2),this.sprite.setSprite("assets/images/green-platform.png"),this.addComponent(this.sprite),this.addComponent(t)}addPowerUp(t){this.setChild(t);const e=t.getComponent("Sprite");t.transform.localPosition=new l(a.RandomFloat(-this.sprite.width/2+e.width/2,this.sprite.width/2-e.width/2),this.sprite.height/2+e.height/2-2),this.powerUp=t}}!function(t){t[t.Force=0]="Force",t[t.VelocityChange=1]="VelocityChange"}(f||(f={}));class B extends b{constructor(t,e){super(t),this.name="RigidBody",this.gravityScale=e||1,this.velocity=l.zero,this.isStatic=!1}addForce(t,e=f.Force){e==f.Force?this.velocity=this.velocity.add(t):e==f.VelocityChange&&(this.velocity=new l(t.x,t.y))}update(){this.gravityScale&&(this.velocity=this.velocity.add(new l(0,-100*this.gravityScale).mul(c.deltaTime))),this.velocity.magnitude>.1&&(this.gameObject.transform.position=this.gameObject.transform.position.add(this.velocity.mul(100*c.deltaTime)))}}!function(t){t[t.Linear=0]="Linear",t[t.InSine=1]="InSine",t[t.OutSine=2]="OutSine",t[t.InOutSine=3]="InOutSine",t[t.InQuad=4]="InQuad",t[t.OutQuad=5]="OutQuad",t[t.InOutQuad=6]="InOutQuad",t[t.InCubic=7]="InCubic",t[t.OutCubic=8]="OutCubic",t[t.InOutCubic=9]="InOutCubic",t[t.InQuart=10]="InQuart",t[t.OutQuart=11]="OutQuart",t[t.InOutQuart=12]="InOutQuart",t[t.InQuint=13]="InQuint",t[t.OutQuint=14]="OutQuint",t[t.InOutQuint=15]="InOutQuint",t[t.InExpo=16]="InExpo",t[t.OutExpo=17]="OutExpo",t[t.InOutExpo=18]="InOutExpo",t[t.InCirc=19]="InCirc",t[t.OutCirc=20]="OutCirc",t[t.InOutCirc=21]="InOutCirc",t[t.InElastic=22]="InElastic",t[t.OutElastic=23]="OutElastic",t[t.InOutElastic=24]="InOutElastic",t[t.InBack=25]="InBack",t[t.OutBack=26]="OutBack",t[t.InOutBack=27]="InOutBack",t[t.InBounce=28]="InBounce",t[t.OutBounce=29]="OutBounce",t[t.InOutBounce=30]="InOutBounce"}(w||(w={}));const I=1.70158,k=1.525*I,A=I+1,M=2*Math.PI/3,G=2*Math.PI/4.5,z=7.5625,R=2.75;class F{static EaseFuction(t,e){switch(t){case w.Linear:return e;case w.InSine:return 1-Math.cos(e*Math.PI/2);case w.OutSine:return Math.sin(e*Math.PI/2);case w.InOutSine:return.5*(1-Math.cos(Math.PI*e/2));case w.InQuad:return e*e;case w.OutQuad:return-e*(e-2);case w.InOutQuad:return e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;case w.InCubic:return e*e*e;case w.OutCubic:return(e-1)*(e-1)*(e-1)+1;case w.InOutCubic:return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2;case w.InQuart:return e*e*e*e;case w.OutQuart:return-((e-1)*(e-1)*(e-1)-1);case w.InOutQuart:return e<.5?8*e*e*e*e:1-Math.pow(-2*e+2,4)/2;case w.InQuint:return e*e*e*e*e;case w.OutQuint:return 1-Math.pow(1-e,5);case w.InOutQuint:return e<.5?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2;case w.InExpo:return 0===e?0:Math.pow(2,10*e-10);case w.OutExpo:return 1===e?1:1-Math.pow(2,-10*e);case w.InOutExpo:return 0===e?0:1===e?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2;case w.InCirc:return 1-Math.sqrt(1-Math.pow(e,2));case w.OutCirc:return Math.sqrt(1-Math.pow(e-1,2));case w.InOutCirc:return e<.5?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2;case w.InBack:return A*e*e*e-I*e*e;case w.OutBack:return 1+A*Math.pow(e-1,3)+I*Math.pow(e-1,2);case w.InOutBack:return e<.5?Math.pow(2*e,2)*(7.189819*e-k)/2:(Math.pow(2*e-2,2)*((k+1)*(2*e-2)+k)+2)/2;case w.InElastic:return 0===e?0:1===e?1:-Math.pow(2,10*e-10)*Math.sin((10*e-10.75)*M);case w.OutElastic:return 0===e?0:1===e?1:Math.pow(2,-10*e)*Math.sin((10*e-.75)*M)+1;case w.InOutElastic:return 0===e?0:1===e?1:e<.5?-Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*G)/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*G)/2+1;case w.InBounce:return 1-this.easeOutBounce(1-e);case w.OutBounce:return this.easeOutBounce(e);case w.InOutBounce:return e<.5?(1-this.easeOutBounce(1-2*e))/2:(1+this.easeOutBounce(2*e-1))/2;default:return e}}static easeOutBounce(t){return t<1/R?z*t*t:t<2/R?z*(t-=1.5/R)*t+.75:t<2.5/R?z*(t-=2.25/R)*t+.9375:z*(t-=2.625/R)*t+.984375}}class D{constructor(t,e){this.target=t,this.duration=e,this.easing=w.Linear,this.startTime=c.time,this.properties={},y.addTween(this)}to(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(this.target,e)){const s=this.target[e],i=t[e]-s;this.properties[e]={start:s,delta:i}}return this}setEasing(t){return this.easing=t,this}onComplete(t){return this.onCompleteCallback=t,this}update(){const t=c.time-this.startTime,e=Math.min(t/this.duration,1);for(const t in this.properties)if(Object.prototype.hasOwnProperty.call(this.properties,t)){const s=this.properties[t],i=F.EaseFuction(this.easing,e)*s.delta+s.start;this.target[t]=i}e>=1&&this.complete()}complete(){var t;y.removeTween(this);for(const t in this.properties)Object.prototype.hasOwnProperty.call(this.properties,t)&&delete this.properties[t];null===(t=this.onCompleteCallback)||void 0===t||t.call(this.onCompleteCallback)}}class E{constructor(t,e,s){this.pool=[],this.createObject=t,this.getObject=e,this.resetObject=s}get(){let t=null;return t=0===this.pool.length?this.createObject():this.pool.pop(),this.getObject(t),t}release(t){-1===this.pool.indexOf(t)&&(this.resetObject(t),this.pool.push(t))}clear(){this.pool.length=0}}class L extends P{constructor(){super("Hole"),this.sprite=new S(this,2),this.sprite.setSprite("assets/images/hole.png");const t=new v(this);t.isTrigger=!0,t.scale=new l(.1,.1),this.addComponent(this.sprite),this.addComponent(t)}update(){super.update(),this.transform.position.y+this.sprite.height/2<-p.size.y/2&&et.holePool.release(this)}}const Q=["assets/images/monster-1.png","assets/images/monster-2.png"];class H extends P{constructor(){super("Monster");const t=new v(this);t.isTrigger=!0,this.sprite=new S(this,2),this.sprite.setSprite(Q[a.RandomInt(0,Q.length-1)]),this.addComponent(t),this.addComponent(this.sprite)}update(){super.update(),this.transform.position.y+this.sprite.height/2<-p.size.y/2&&et.monsterPool.release(this)}}const _=new l(50,200);class K extends C{constructor(){super(),this.name="BluePlatform",this.sprite.setSprite("assets/images/blue-platform.png"),this.moveDirection=l.right}update(){super.update(),this.transform.position.x>p.size.x/2?this.moveDirection=l.left:this.transform.position.x<-p.size.x/2&&(this.moveDirection=l.right),this.transform.position=this.transform.position.add(this.moveDirection.mul(a.RandomFloat(_.x,_.y)*c.deltaTime))}}const U=["assets/images/brown-platform-0.png","assets/images/brown-platform-1.png","assets/images/brown-platform-2.png","assets/images/brown-platform-3.png"];class J extends C{constructor(){super(),this.name="BrownPlatform",this.sprite.setSprite(U[0]),this.spriteIndex=0,this.isBreaking=!1,this.timer=.02,this.rigidBody=new B(this,0),this.addComponent(this.rigidBody)}onEnabled(){super.onEnabled(),this.isBreaking=!1,this.rigidBody.gravityScale=0,this.rigidBody.velocity=l.zero,this.spriteIndex=0,this.sprite.setSprite(U[0])}setIsBreaking(t){this.isBreaking!==t&&(this.isBreaking=t,this.isBreaking&&(o.playBreakSound(),this.rigidBody.gravityScale=.08))}update(){super.update(),this.timer-=c.deltaTime,this.isBreaking&&this.timer<0&&(this.timer=.02,++this.spriteIndex<U.length&&this.sprite.setSprite(U[this.spriteIndex]))}}class W extends C{constructor(){super(),this.name="WhitePlatform",this.sprite.setSprite("assets/images/white-platform.png")}}class q{static getPlaformTypes(t){for(const e in this.scoreToPlatformTypeSpawn)if(t<parseFloat(e))return this.scoreToPlatformTypeSpawn[e];const e=Object.keys(this.scoreToPlatformTypeSpawn),s=e[e.length-1];return this.scoreToPlatformTypeSpawn[parseFloat(s)]}static getObstacleTypes(t){for(const e in this.obstacleSpawnChances)if(t<parseFloat(e))return this.obstacleSpawnChances[e];const e=Object.keys(this.obstacleSpawnChances),s=e[e.length-1];return this.obstacleSpawnChances[parseFloat(s)]}static getPlatfomSpawnDistances(t){for(const e in this.scoreToPlatfomSpawnDistances)if(t<parseFloat(e))return this.scoreToPlatfomSpawnDistances[e];const e=Object.keys(this.scoreToPlatfomSpawnDistances),s=e[e.length-1];return this.scoreToPlatfomSpawnDistances[parseFloat(s)]}}q.powerUpSpawnChances=[85,10,5],q.obstacleSpawnChances={8e3:[100,0,0],1e4:[55,5,35],15e3:[50,10,40]},q.scoreToPlatfomSpawnDistances={1e3:new l(20,50),3e3:new l(20,55),6e3:new l(20,60),8e3:new l(20,70),1e4:new l(20,80),15e3:new l(30,90),2e4:new l(30,100)},q.scoreToPlatformTypeSpawn={1e3:[90,10,0,0],4e3:[85,10,5,0],8e3:[60,10,40,0],12e3:[30,10,70,0],2e4:[50,10,10,30]};class X extends P{constructor(){super("Text"),this.text="",this.font="28px Arial",p.registerText(this)}}class $ extends P{constructor(){super("ScoreManager"),this.enviroment=ft.Find("Enviroment"),this.scoreText=new X,this.scoreText.font="600 32px DoodleJump",this.scoreText.transform.position=new l(-150,230),this.scoreText.name="ScoreText";const t=i.getSceneByName("GameplayScene");t&&t.registerGameObject(this.scoreText),$.score=0,$.highScore=0}update(){super.update(),r.getGameState()===t.Playing?($.score=this.enviroment.point()<=0?0:Math.floor(this.enviroment.point()),this.scoreText.text=$.score.toString(),$.score>$.highScore&&($.highScore=$.score)):$.score=0}static getScore(){return this.score}static getHighScore(){return this.highScore}}class N extends P{constructor(){super("Hat");const t=new S(this,2);t.setSprite("assets/images/hat.png");const e=new v(this);e.isTrigger=!0,this.addComponent(t),this.addComponent(e)}}class V extends P{constructor(){super("Jetpack");const t=new S(this,2);t.setSprite("assets/images/jetpack.png");const e=new v(this);this.addComponent(e),this.addComponent(t)}}class Y extends P{constructor(){super("Spring"),this.sprite=new S(this,2),this.sprite.setSprite("assets/images/spring-0.png");const t=new v(this);t.isTrigger=!0,this.addComponent(this.sprite),this.addComponent(t)}activeSpring(){this.sprite.setSprite("assets/images/spring-1.png")}}class Z{static init(t,e){this.isInitialGenerated=!1,this.player=t,this.enviroment=e,this.platforms=[]}static update(){for(let t=0;t<this.platforms.length;t++)this.platforms[t].active&&this.platforms[t].transform.position.y+this.platformSprite.height/2<-p.size.y/2&&et.releasePlatform(this.platforms[t]);this.isInitialGenerated&&this.player.transform.position.y+this.maxDistance>this.previousPlatformGenerated.transform.position.y&&(this.spawnPlatform(),a.RandomPercent(10)&&tt.spawnObstacle())}static spawnPlatform(){let t=null;switch(a.WeightPick(q.getPlaformTypes($.getScore()))){case 0:t=et.basePlatformsPool.get(),this.addPowerUp(t);break;case 1:t=et.brownPlatformsPool.get(),this.setPlatformPosition(et.basePlatformsPool.get(),$.getScore());break;case 2:t=et.bluePlatformsPool.get(),this.addPowerUp(t);break;case 3:t=et.whitePlatformsPool.get();break;default:t=et.basePlatformsPool.get()}this.setPlatformPosition(t,$.getScore()),this.previousPlatformGenerated=t}static setPlatformPosition(t,e){t.transform.position=new l(a.RandomFloat(-p.size.x/2+20,p.size.x/2-20),this.previousPlatformGenerated.transform.position.y+a.RandomFloat(q.getPlatfomSpawnDistances(e).x,q.getPlatfomSpawnDistances(e).y))}static readySpawn(){this.reset();const t=et.basePlatformsPool.get();t.transform.position=new l(-80,-200),this.platformSprite=t.getComponent("Sprite")}static playingStateSpawn(){this.reset(),this.enviroment.transform.position=l.zero;const t=et.basePlatformsPool.get();t.transform.position=new l(0,-200),this.platformSprite=t.getComponent("Sprite"),this.previousPlatformGenerated=t;for(let t=0;t<20;t++)this.spawnPlatform();this.maxDistance=this.previousPlatformGenerated.transform.position.y-this.player.transform.position.y,this.isInitialGenerated=!0}static reset(){for(const t of this.platforms)et.releasePlatform(t)}static addPowerUp(t){if(this.platforms.length>20&&a.RandomPercent(10))switch(a.WeightPick(q.powerUpSpawnChances)){case 0:t.addPowerUp(new Y);break;case 1:t.addPowerUp(new N);break;case 2:t.addPowerUp(new V)}}}class tt{static init(){this.obstacles=[]}static spawnObstacle(){let t=null;switch(a.WeightPick(q.getObstacleTypes($.getScore()))){case 0:break;case 1:default:t=et.holePool.get();break;case 2:t=et.monsterPool.get()}if(t){const e=t.getComponent("Sprite");t.transform.position=Z.previousPlatformGenerated.transform.position.add(new l(a.RandomFloat(-p.size.x/2+e.width,p.size.x/2-e.width),200))}}static reset(){for(const t of this.obstacles)et.releaseObstacle(t)}}class et{static init(t){this.basePlatformsPool=new E((()=>{const e=new C;return e.setParent(t),Z.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.bluePlatformsPool=new E((()=>{const e=new K;return e.setParent(t),Z.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.brownPlatformsPool=new E((()=>{const e=new J;return e.setParent(t),Z.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.whitePlatformsPool=new E((()=>{const e=new W;return e.setParent(t),Z.platforms.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.holePool=new E((()=>{const e=new L;return e.setParent(t),tt.obstacles.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)})),this.monsterPool=new E((()=>{const e=new H;return e.setParent(t),tt.obstacles.push(e),e}),(t=>{t.setActive(!0)}),(t=>{t.setActive(!1)}))}static releasePlatform(t){switch(t.name){case"BasePlatform":this.basePlatformsPool.release(t);break;case"BluePlatform":this.bluePlatformsPool.release(t);break;case"BrownPlatform":this.brownPlatformsPool.release(t);break;case"WhitePlatform":this.whitePlatformsPool.release(t)}}static releaseObstacle(t){switch(t.name){case"Hole":this.holePool.release(t);break;case"Monster":this.monsterPool.release(t)}}}class st{getMovementInput(){if(g.getKey("KeyD")||g.getKey("ArrowRight"))return 1;if(g.getKey("KeyA")||g.getKey("ArrowLeft"))return-1;if(g.isTouching){const t=g.getTouch();return t.position.x>0?1:t.position.x<0?-1:0}return 0}}class it extends P{constructor(){super("Player"),this.OnTriggerStay=e=>{if(e.gameObject instanceof C&&this.isFalling&&!this.isMonsterTouched){if(this.transform.position.y-this.collider.size.y/2<e.gameObject.transform.position.y)return;"BrownPlatform"==e.gameObject.name?e.gameObject.setIsBreaking(!0):(this.jump(5),"WhitePlatform"==e.gameObject.name?(et.whitePlatformsPool.release(e.gameObject),o.playWhiteSound()):o.playJumpSound())}else"Spring"===e.gameObject.name&&this.isFalling&&!this.isMonsterTouched&&(e.gameObject.activeSpring(),this.jump(8),o.playSpringSound());this.isImmortal||("Hat"!==e.gameObject.name||this.isMonsterTouched?"Jetpack"!==e.gameObject.name||this.isMonsterTouched?"Hole"!==e.gameObject.name||this.isHoleTouched?"Monster"!==e.gameObject.name||this.isMonsterTouched||(this.transform.position.y-this.collider.size.y/2>e.gameObject.transform.position.y&&this.isFalling?(this.jump(5),o.playJumpOnMonsterSound()):(this.isMonsterTouched=!0,o.playMonsterHitSound())):(this.isHoleTouched=!0,this.rigidBody.gravityScale=0,this.rigidBody.velocity=l.zero,o.playHoleSound(),new D(this.transform,1).to({scale:0,rotation:20}).setEasing(w.OutQuart).onComplete((()=>{r.updateGameState(t.GameOver)}))):(this.jetpackTimer=2.5,e.gameObject.setActive(!1),this.jump(25),o.playJetpackSound()):(this.hatTimer=2.5,e.gameObject.setActive(!1),this.rigidBody.velocity=l.zero,o.playHatSound()))},this.OnGameStateChanged=e=>{switch(e){case t.Ready:this.transform.position=new l(-80,0),this.transform.scale=1,this.transform.rotation=0,this.rigidBody.velocity=l.zero,this.rigidBody.gravityScale=.08;break;case t.Playing:this.isHoleTouched=!1,this.isMonsterTouched=!1,this.transform.scale=1,this.transform.rotation=0,this.transform.position=l.zero,this.rigidBody.velocity=l.zero,this.rigidBody.gravityScale=.08;break;case t.GameOver:this.gameOverDelayTimer=.5}},this.rigidBody=new B(this,.08),this.sprite=new S(this,1),this.sprite.setSprite("assets/images/lik-left.png"),this.collider=new v(this),this.collider.isTrigger=!0,this.collider.scale=new l(.5,1),this.addComponent(this.sprite),this.addComponent(this.rigidBody),this.addComponent(this.collider),this.isHoleTouched=!1,this.isMonsterTouched=!1,r.OnGameStateChanged.subscribe(this.OnGameStateChanged),this.playerInput=new st}update(){if(super.update(),this.hatTimer-=c.deltaTime,this.jetpackTimer-=c.deltaTime,this.gameOverDelayTimer-=c.deltaTime,this.hatTimer>0&&this.rigidBody.addForce(l.up.mul(12*c.deltaTime),f.Force),r.getGameState()!==t.Ready&&!this.isHoleTouched&&!this.isMonsterTouched){const t=2*this.playerInput.getMovementInput();this.rigidBody.velocity=new l(t,this.rigidBody.velocity.y),t>0?this.sprite.flipX=!0:t<0&&(this.sprite.flipX=!1)}(this.transform.position.y>=0||r.getGameState()===t.GameOver&&this.gameOverDelayTimer>0)&&(this.transform.position=new l(this.transform.position.x,0)),this.transform.position.x+this.sprite.width/2<-p.size.x/2&&(this.transform.position=new l(p.size.x/2+this.sprite.width/2,this.transform.position.y)),this.transform.position.x-this.sprite.width/2>p.size.x/2&&(this.transform.position=new l(-p.size.x/2-this.sprite.width/2,this.transform.position.y)),this.transform.position.y+this.sprite.height/2<-p.size.y/2&&(r.getGameState()!==t.Playing&&r.getGameState()!==t.Ready||r.updateGameState(t.GameOver))}jump(t){this.rigidBody.addForce(new l(0,t),f.VelocityChange)}get isFalling(){return this.rigidBody.velocity.y<0}get isImmortal(){return this.hatTimer>0||this.jetpackTimer>0}}class at extends P{constructor(){super("BlackImage"),this.sprite=new S(this,0),this.sprite.setSprite("assets/images/black-image.png"),this.sprite.alpha=0}update(){super.update()}show(){new D(this.sprite,1).to({alpha:1}).onComplete((()=>{r.updateGameState(t.Playing),new D(this.sprite,0).to({alpha:0})}))}}class nt extends P{constructor(t,e){super(t),this.sprite=new S(this,0),this.sprite.setSprite(e),this.addComponent(this.sprite),h.add(this)}get width(){return this.sprite.width*this.transform.scale}get height(){return this.sprite.height*this.transform.scale}}const ot="assets/images/play.png";class rt extends nt{constructor(){super("PlayButton",ot)}onEnabled(){this.sprite.setSprite(ot)}onClick(){this.sprite.setSprite("assets/images/play-on.png"),ft.Find("BlackImage").show()}}class ct extends T{constructor(){super("MainMenuScene"),this.OnGameStateChanged=e=>{switch(e){case t.Ready:this.playButton.setActive(!0),this.title.setActive(!0);break;case t.Playing:this.playButton.setActive(!1),this.title.setActive(!1)}},this.playButton=new rt,this.playButton.transform.position=new l(-45,90),this.playButton.dontDestroyOnLoad=!0;const e=new it;e.transform.position=new l(-80,0),this.title=new P("Title");const s=new S(this.title,0);s.setSprite("assets/images/doodle-jump.png"),this.title.addComponent(s),this.title.transform.position=new l(-45,150);const i=new C;i.transform.position=new l(-80,-200);const a=new j;a.dontDestroyOnLoad=!0;const n=new at;n.dontDestroyOnLoad=!0,this.registerGameObject(e),this.registerGameObject(this.playButton),this.registerGameObject(this.title),this.registerGameObject(i),this.registerGameObject(a),this.registerGameObject(n),r.OnGameStateChanged.subscribe(this.OnGameStateChanged)}}class ht extends P{constructor(t){super("Enviroment"),this.player=t,this.playerRb=this.player.getComponent("RigidBody"),this.rigidBody=new B(this,.08),this.addComponent(this.rigidBody)}update(){super.update(),this.rigidBody.velocity=l.zero,this.rigidBody.gravityScale=0,r.getGameState()!==t.GameOver&&this.player.transform.position.y>=0&&!this.player.isFalling?(this.rigidBody.gravityScale=.08,this.rigidBody.velocity=new l(0,-this.playerRb.velocity.y)):r.getGameState()===t.GameOver&&this.rigidBody.addForce(l.up.mul(20),f.VelocityChange)}point(){return-this.transform.position.y}}class lt extends P{constructor(){super("PlatformGenerator"),this.OnGameStateChange=e=>{switch(e){case t.Ready:this.handleReady();break;case t.Playing:this.handlePlaying()}};const e=ft.Find("Enviroment"),s=ft.Find("Player");et.init(e),Z.init(s,e),tt.init(),r.OnGameStateChanged.subscribe(this.OnGameStateChange)}update(){super.update(),Z.update()}handlePlaying(){Z.playingStateSpawn()}handleReady(){Z.readySpawn(),tt.reset()}}class pt extends nt{constructor(){super("ReturnMenuButton","assets/images/menu.png")}onClick(){r.updateGameState(t.Ready)}}const ut=new l(0,-100);class dt extends P{constructor(){super("GameOverCanvas"),this.OnGameStateChanged=e=>{switch(e){case t.Ready:case t.Playing:this.setActive(!1);break;case t.GameOver:this.setActive(!0),this.scoreText.text="your score: "+$.getScore(),this.highScoreText.text="your high score: "+$.getHighScore()}};const e=i.getSceneByName("GameplayScene");e&&(this.scene=e),this.playButton=new rt,this.returnMenuButton=new pt,this.playButton.transform.position=new l(30,-120),this.returnMenuButton.transform.position=new l(100,-170),this.scoreText=new X,this.highScoreText=new X,this.scoreText.transform.position=new l(-100,30),this.highScoreText.transform.position=new l(-125,-10),this.scoreText.font="600 30px DoodleJump",this.highScoreText.font="600 30px DoodleJump",this.playButton.setParent(this),this.returnMenuButton.setParent(this),this.scoreText.setParent(this),this.highScoreText.setParent(this),this.transform.position=ut,r.OnGameStateChanged.subscribe(this.OnGameStateChanged)}setActive(t){super.setActive(t),this.playButton.setActive(t),this.returnMenuButton.setActive(t),this.scoreText.setActive(t),this.highScoreText.setActive(t)}}class mt extends P{constructor(){super("TopBar");const t=new S(this,0);t.setSprite("assets/images/top-score.png"),this.addComponent(t),this.transform.position=new l(0,p.size.y/2-t.height/2)}}class gt extends T{constructor(){super("GameplayScene");const t=new it;this.registerGameObject(new mt),this.registerGameObject(t),this.registerGameObject(new ht(t)),this.registerGameObject(new lt),this.registerGameObject(new dt),this.registerGameObject(new $)}}const yt=["assets/images/green-platform.png","assets/images/blue-platform.png","assets/images/brown-platform-0.png","assets/images/brown-platform-1.png","assets/images/brown-platform-2.png","assets/images/brown-platform-3.png","assets/images/white-platform.png","assets/images/lik-left.png","assets/images/spring-0.png","assets/images/spring-1.png","assets/images/hat.png","assets/images/jetpack.png","assets/images/play-on.png","assets/images/top-score.png","assets/images/doodle-jump.png","assets/images/play.png","assets/images/play-on.png","assets/images/monster-1.png","assets/images/hole.png"];class ft{constructor(){O.init(),o.init().then((()=>{O.load(yt).then((()=>{c.init(),h.init(),p.init("game"),g.init(),u.init(),y.init(),u.add("Background"),d.setInteractiveLayer("Background","Background",!1),r.init(),i.init(),r.updateGameState(t.Ready),new ct,new gt,this.loop()}))}))}loop(){c.deltaTime>=1/300&&(d.update(),y.update(),i.update(),p.draw(),g.reset(),c.lastFrameTime=window.performance.now()),window.requestAnimationFrame((()=>{this.loop()}))}static registerGameObject(t){ft.gameObjects.push(t)}static unregisterGameObject(t){ft.gameObjects.slice(ft.gameObjects.indexOf(t),1)}static Find(t){for(let e=0;e<ft.gameObjects.length;e++)if(ft.gameObjects[e].name==t)return ft.gameObjects[e];return null}}ft.gameObjects=[],new ft})();