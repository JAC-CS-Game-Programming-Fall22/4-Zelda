import Vector from "../../lib/Vector.js";
import Direction from "../enums/Direction.js";
import GameObject from "./GameObject.js";
import Room from "./Room.js";
import Tile from "./Tile.js";

export default class Doorway extends GameObject {
	static VERTICAL_WIDTH = 16;
	static VERTICAL_HEIGHT = 32;
	static HORIZONTAL_WIDTH = 32;
	static HORIZONTAL_HEIGHT = 16;
	static TOP_OPEN_SPRITES = [97, 98, 116, 117];
	static BOTTOM_OPEN_SPRITES = [140, 141, 159, 160];
	static LEFT_OPEN_SPRITES = [180, 181, 199, 200];
	static RIGHT_OPEN_SPRITES = [171, 172, 190, 191];
	static TOP_CLOSE_SPRITES = [133, 134, 152, 153];
	static BOTTOM_CLOSE_SPRITES = [215, 216, 234, 235];
	static LEFT_CLOSE_SPRITES = [218, 219, 237, 238];
	static RIGHT_CLOSE_SPRITES = [173, 174, 192, 193];

	/**
	 * One of four doors that appears on each side of a room.
	 * The player can walk through this door when open to go
	 * to an adjacent room.
	 *
	 * @param {number} direction
	 * @param {Room} room
	 */
	constructor(dimensions, position, direction, room) {
		super(dimensions, position);

		this.direction = direction;
		this.room = room;
		this.isOpen = false;
		this.openSprites = this.initializeOpenSprites(room.sprites);
		this.closeSprites = this.initializeCloseSprites(room.sprites);
		this.spriteLocations = this.initializeSpriteLocations();
		this.sprites = this.closeSprites;
		this.renderPriority = -1;
	}

	render() {
		this.sprites.forEach((sprite, index) => {
			sprite.render(this.spriteLocations[index].x, this.spriteLocations[index].y);
		});
	}

	static getPositionFromDirection(direction) {
		const position = new Vector();

		if (direction === Direction.Left) {
			position.x = Room.RENDER_OFFSET_X;
			position.y = Room.RENDER_OFFSET_Y + (Room.HEIGHT / 2) * Tile.TILE_SIZE - Tile.TILE_SIZE / 2;
		}
		else if (direction === Direction.Right) {
			position.x = Room.RENDER_OFFSET_X + (Room.WIDTH * Tile.TILE_SIZE) - Tile.TILE_SIZE;
			position.y = Room.RENDER_OFFSET_Y + (Room.HEIGHT / 2 * Tile.TILE_SIZE) - Tile.TILE_SIZE / 2;
		}
		else if (direction === Direction.Up) {
			position.x = Room.RENDER_OFFSET_X + (Room.WIDTH / 2 * Tile.TILE_SIZE) - Tile.TILE_SIZE;
			position.y = Room.RENDER_OFFSET_Y;
		}
		else {
			position.x = Room.RENDER_OFFSET_X + (Room.WIDTH / 2 * Tile.TILE_SIZE) - Tile.TILE_SIZE;
			position.y = Room.RENDER_OFFSET_Y + (Room.HEIGHT * Tile.TILE_SIZE) - Tile.TILE_SIZE;
		}

		return position;
	}

	static getDimensionsFromDirection(direction) {
		const dimensions = new Vector();

		if (direction === Direction.Left) {
			dimensions.x = Doorway.VERTICAL_WIDTH;
			dimensions.y = Doorway.VERTICAL_HEIGHT;
		}
		else if (direction === Direction.Right) {
			dimensions.x = Doorway.VERTICAL_WIDTH;
			dimensions.y = Doorway.VERTICAL_HEIGHT;
		}
		else if (direction === Direction.Up) {
			dimensions.x = Doorway.HORIZONTAL_WIDTH;
			dimensions.y = Doorway.HORIZONTAL_HEIGHT;
		}
		else {
			dimensions.x = Doorway.HORIZONTAL_WIDTH;
			dimensions.y = Doorway.HORIZONTAL_HEIGHT;
		}

		return dimensions;
	}

	initializeOpenSprites(roomSprites) {
		const openSprites = [];

		if (this.direction === Direction.Left) {
			openSprites.push(roomSprites[Doorway.LEFT_OPEN_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.LEFT_OPEN_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.LEFT_OPEN_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.LEFT_OPEN_SPRITES[3]]);
		}
		else if (this.direction === Direction.Right) {
			openSprites.push(roomSprites[Doorway.RIGHT_OPEN_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.RIGHT_OPEN_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.RIGHT_OPEN_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.RIGHT_OPEN_SPRITES[3]]);
		}
		else if (this.direction === Direction.Up) {
			openSprites.push(roomSprites[Doorway.TOP_OPEN_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.TOP_OPEN_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.TOP_OPEN_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.TOP_OPEN_SPRITES[3]]);
		}
		else {
			openSprites.push(roomSprites[Doorway.BOTTOM_OPEN_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_OPEN_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_OPEN_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_OPEN_SPRITES[3]]);
		}

		return openSprites;
	}

	initializeCloseSprites(roomSprites) {
		const openSprites = [];

		if (this.direction === Direction.Left) {
			openSprites.push(roomSprites[Doorway.LEFT_CLOSE_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.LEFT_CLOSE_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.LEFT_CLOSE_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.LEFT_CLOSE_SPRITES[3]]);
		}
		else if (this.direction === Direction.Right) {
			openSprites.push(roomSprites[Doorway.RIGHT_CLOSE_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.RIGHT_CLOSE_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.RIGHT_CLOSE_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.RIGHT_CLOSE_SPRITES[3]]);
		}
		else if (this.direction === Direction.Up) {
			openSprites.push(roomSprites[Doorway.TOP_CLOSE_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.TOP_CLOSE_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.TOP_CLOSE_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.TOP_CLOSE_SPRITES[3]]);
		}
		else {
			openSprites.push(roomSprites[Doorway.BOTTOM_CLOSE_SPRITES[0]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_CLOSE_SPRITES[1]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_CLOSE_SPRITES[2]]);
			openSprites.push(roomSprites[Doorway.BOTTOM_CLOSE_SPRITES[3]]);
		}

		return openSprites;
	}

	initializeSpriteLocations() {
		const spriteLocations = [];

		if (this.direction === Direction.Left) {
			spriteLocations.push(new Vector(this.position.x - Tile.TILE_SIZE, this.position.y));
			spriteLocations.push(new Vector(this.position.x, this.position.y));
			spriteLocations.push(new Vector(this.position.x - Tile.TILE_SIZE, this.position.y + Tile.TILE_SIZE));
			spriteLocations.push(new Vector(this.position.x, this.position.y + Tile.TILE_SIZE));
		}
		else if (this.direction === Direction.Right) {
			spriteLocations.push(new Vector(this.position.x, this.position.y));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y));
			spriteLocations.push(new Vector(this.position.x, this.position.y + Tile.TILE_SIZE));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y + Tile.TILE_SIZE));
		}
		else if (this.direction === Direction.Up) {
			spriteLocations.push(new Vector(this.position.x, this.position.y - Tile.TILE_SIZE));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y - Tile.TILE_SIZE));
			spriteLocations.push(new Vector(this.position.x, this.position.y));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y));
		}
		else {
			spriteLocations.push(new Vector(this.position.x, this.position.y));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y));
			spriteLocations.push(new Vector(this.position.x, this.position.y + Tile.TILE_SIZE));
			spriteLocations.push(new Vector(this.position.x + Tile.TILE_SIZE, this.position.y + Tile.TILE_SIZE));
		}

		return spriteLocations;
	}

	open() {
		if (!this.isOpen) {
			this.isOpen = true;
			this.sprites = this.openSprites;
		}
	}

	close() {
		if (this.isOpen) {
			this.isOpen = false;
			this.sprites = this.closeSprites;
		}
	}
}
