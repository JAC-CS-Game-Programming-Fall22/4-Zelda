import State from "../../../lib/State.js";
import Dungeon from "../../objects/Dungeon.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.dungeon = new Dungeon();
	}

	render() {
		this.dungeon.render();
	}
}
