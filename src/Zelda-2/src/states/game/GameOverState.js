import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, keys, stateMachine } from "../../globals.js";

export default class GameOverState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to start a new game.
	 */
	constructor() {
		super();
	}

	update() {
		if (keys.Enter) {
			keys.Enter = false;

			stateMachine.change(GameStateName.Play);
		}
	}

	render() {
		context.font = '60px Zelda';
		context.fillStyle = 'crimson';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		context.font = '30px Zelda';
		context.fillStyle = 'white';
		context.fillText('press enter to continue', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
	}
}
