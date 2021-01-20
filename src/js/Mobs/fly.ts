import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { currentRoom, player } from "../Rooms/startGame";
import { createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { AnimateMobType } from "../types/Types";

class Fly {
    private fly: any;
    private flySheets: any;
    boolDeath: boolean;
    constructor() {
        this.flySheets = {};
        this.boolDeath = true;
        this.fly = {};
    }
    doneLoading() {
        if (!objectOfGameObjects[currentRoom].hasOwnProperty("fly")) return;
        console.log("flyFC");

        this.fly = objectOfGameObjects[currentRoom].fly;
        console.log(objectOfGameObjects[currentRoom]);

        this.flySheets = this.fly.sheets;
        this.fly.forEach((flyOne: any) => {
            flyOne.hp = 3;
            flyOne.angryMob = true;
            flyOne.froze = false;
            flyOne.damage = 2;
            flyOne.play();
        });
        app.ticker.add(() => {
            this.moveFly();
        });
    }
    moveFly() {
        const playerX = player.getBounds().x;
        const playerY = player.getBounds().y;
        this.fly.forEach((flyOne: any, currentFly: number) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                //удаление мух с запуском поледней анимации
                flyOne.textures = this.flySheets.death;
                flyOne.loop = false;
                this.fly.splice(this.fly.indexOf(flyOne), 1);
                flyOne.play();
                this.boolDeath = false;
                flyOne.onComplete = () => {
                    flyOne.dead = true;
                    app.stage.removeChild(flyOne);
                    this.boolDeath = true;
                };
            } else if (flyOne.froze) {
                //анимация нанесения урона
                if (typeof flyOne.froze === "boolean") {
                    const intTint = setInterval(() => {
                        // при добавляем мигание один раз
                        flyOne.tint = 16777215;
                    }, 10);
                    setTimeout(() => {
                        clearInterval(intTint);
                        flyOne.froze = false;
                    }, 400);
                }
                flyOne.froze = currentFly + 1;
                flyOne.tint = 16716853;
            } else {
                const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
                const flyX = flyOne.x;
                const flyY = flyOne.y;
                if (playerX > flyX && randomSymbol > 0) {
                    flyOne.x += 0.9;
                    flyOne.y += 0.6 * randomSymbol;
                } else if (randomSymbol < 0) {
                    flyOne.x -= 0.9;
                    flyOne.y += 0.6 * randomSymbol;
                }
                if (playerY > flyY && randomSymbol < 0) {
                    flyOne.y += 0.9;
                    flyOne.x += 0.6 * randomSymbol;
                } else if (randomSymbol > 0) {
                    flyOne.y -= 0.9;
                    flyOne.x += 0.6 * randomSymbol;
                }
            }
        });
    }
}

export default Fly;
