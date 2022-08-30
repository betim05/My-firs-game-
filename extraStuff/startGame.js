import { canvas, startConteiner, player } from "../game.js";
import { state } from "../state.js";
import { countHtml, countRecord } from "./countRecord.js";
export function startGame() {
    player.makeMoreEnemys = true;
    countHtml.textContent = 0;
    countRecord.count = 0;
    startConteiner.style.display = 'none';
    state.gameStart = true;
    canvas.style.display = 'block';
}