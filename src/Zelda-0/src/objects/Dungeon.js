import Room from "./Room.js";

export default class Dungeon {
	/**
	 * Contains the rooms and player for the game.
	 * Takes care of animating new rooms into view when
	 * the player walks through doors.
	 */
	constructor() {
		this.room = new Room();
	}

	render() {
		this.room.render();
	}
}
