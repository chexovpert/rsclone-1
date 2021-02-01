import * as PIXI from "pixi.js";

interface mapCells {
    [mapCellName: string]: PIXI.Graphics;
}

const cellOfRoom: mapCells = {};
const currentCellColor: number = 0xfbfbfb;
let panelContainer: PIXI.Graphics;

function createMap(topPanel: PIXI.Graphics): void {
    panelContainer = new PIXI.Graphics();
    panelContainer.beginFill(0x1b1818);
    panelContainer.lineStyle(15, 0x000000, 1);
    panelContainer.drawRect(0, 0, 800, 105);
    panelContainer.endFill();

    const arrayOfRoomsName: string[] = [
        "inFirstRoom",
        "inSecondRoom",
        "inThirdRoom",
        "inFourthRoom",
        "inFifthRoom",
        "inSixthRoom",
        "inSeventhRoom",
        "inEighthRoom",
        "inNinthRoom",
        "inTenthRoom",
    ];

    const cellHight: number = 12;
    const cellWidth: number = 30;
    const mapCellNumber: number = 10;
    const availableCellColor: number = 0x383838;

    for (let mapCellCounter = 0; mapCellCounter < mapCellNumber; mapCellCounter++) {
        const mapCell: PIXI.Graphics = new PIXI.Graphics();
        mapCell.beginFill(0xffffff).tint = availableCellColor;

        mapCell.lineStyle(5, 0x1a1a1a, 1);
        mapCell.alpha = 0;

        mapCellCounter === 0
            ? mapCell.drawRect(110, 65, cellWidth, cellHight) //1
            : mapCellCounter === 1
            ? mapCell.drawRect(110, 50, cellWidth, cellHight) //2
            : mapCellCounter === 2
            ? mapCell.drawRect(145, 50, cellWidth, cellHight) //3
            : mapCellCounter === 3
            ? mapCell.drawRect(180, 50, cellWidth, cellHight) //4
            : mapCellCounter === 4
            ? mapCell.drawRect(75, 50, cellWidth, cellHight) //5
            : mapCellCounter === 5
            ? mapCell.drawRect(40, 50, cellWidth, cellHight) //6
            : mapCellCounter === 6
            ? mapCell.drawRect(110, 35, cellWidth, cellHight) //7
            : mapCellCounter === 7
            ? mapCell.drawRect(110, 20, cellWidth, cellHight) //8
            : mapCellCounter === 8
            ? mapCell.drawRect(75, 20, cellWidth, cellHight) //9
            : mapCell.drawRect(40, 20, cellWidth, cellHight); //10

        mapCell.endFill();

        cellOfRoom[arrayOfRoomsName[mapCellCounter]] = mapCell;
        //mapRectangle.addChild(mapCell); panelContainer
        panelContainer.addChild(mapCell);
    }

    cellOfRoom["inFirstRoom"].tint = currentCellColor;
    cellOfRoom["inSecondRoom"].tint = availableCellColor;
    cellOfRoom["inFirstRoom"].alpha = cellOfRoom["inSecondRoom"].alpha = 1;
    topPanel.addChild(panelContainer);
}

function updateMap(previousRoom: string, nextRoom: string): void {
    const visitedCellColor: number = 0x757575;
    const mapIconSize: number = 20;

    cellOfRoom[previousRoom].tint = visitedCellColor;

    if (nextRoom === "inSecondRoom") {
        cellOfRoom["inThirdRoom"].alpha = cellOfRoom["inFifthRoom"].alpha = cellOfRoom["inSeventhRoom"].alpha = 1;
    }
    if (nextRoom === "inThirdRoom") {
        cellOfRoom["inFourthRoom"].alpha = 1;
    }
    if (nextRoom === "inFifthRoom") {
        if (cellOfRoom["inSixthRoom"].alpha !== 1) {
            const crown: PIXI.Sprite = PIXI.Sprite.from("../../assets/crown.png");
            crown.width = crown.height = mapIconSize;
            crown.x = crown.y = 45;
            cellOfRoom["inSixthRoom"].addChild(crown);
        }
        cellOfRoom["inSixthRoom"].alpha = 1;
    }
    if (nextRoom === "inSeventhRoom") {
        cellOfRoom["inEighthRoom"].alpha = 1;
    }
    if (nextRoom === "inEighthRoom") {
        cellOfRoom["inNinthRoom"].alpha = 1;
    }
    if (nextRoom === "inNinthRoom") {
        if (cellOfRoom["inTenthRoom"].alpha !== 1) {
            const skull: PIXI.Sprite = PIXI.Sprite.from("../../assets/skull.png");
            skull.width = skull.height = mapIconSize;
            skull.x = 45;
            skull.y = 15;
            cellOfRoom["inTenthRoom"].addChild(skull);
        }
        cellOfRoom["inTenthRoom"].alpha = 1;
    }
    cellOfRoom[nextRoom].tint = currentCellColor;
}
export { createMap, updateMap, panelContainer };
