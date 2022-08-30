import { state } from "./state.js";
export function inputDown(key) {
    switch (key.keyCode) {
        case 39:
            state.right = true;
            state.left = false;
            break;
        case 37:
            state.left = true;
            state.right = false;
            break;
        case 32:
            state.fire = true;
            break;
    }
}
export function inputUp(key) {
    switch (key.keyCode) {
        case 39:
            state.right = false;
            break;
        case 37:
            state.left = false;
            break;
        case 32:
            state.fire = false;
            break;
    }
}