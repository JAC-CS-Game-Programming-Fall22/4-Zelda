import Player from "../entities/Player.js";
import Room from "./Room.js";

export default class Dungeon {
	/**
	 * Contains the rooms and player for the game.
	 * Takes care of animating new rooms into view when
	 * the player walks through doors.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		this.player = player;

		// Current room the player is in.
		this.room = new Room(player);
	}

	update(dt) {
		this.room.update(dt);
	}

	render() {
		this.room.render();
	}
}
