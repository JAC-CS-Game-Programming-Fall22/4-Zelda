import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import GameStateName from "../../enums/GameStateName.js";
import { stateMachine } from "../../globals.js";
import Dungeon from "../../objects/Dungeon.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.player = new Player();
		this.dungeon = new Dungeon(this.player);
	}

	enter() {
		this.dungeon = new Dungeon(this.player);
		this.player.reset();
	}

	update(dt) {
		this.dungeon.update(dt);

		if (this.player.isDead) {
			stateMachine.change(GameStateName.GameOver);
		}
	}

	render() {
		this.dungeon.render();
	}
}
