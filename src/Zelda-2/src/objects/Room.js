import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import EnemyFactory from "../entities/enemies/EnemyFactory.js";
import Player from "../entities/Player.js";
import EnemyType from "../enums/EnemyType.js";
import ImageName from "../enums/ImageName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from "../globals.js";
import Tile from "./Tile.js";

export default class Room {
	static WIDTH = CANVAS_WIDTH / Tile.TILE_SIZE - 2;
	static HEIGHT = Math.floor(CANVAS_HEIGHT / Tile.TILE_SIZE) - 2;
	static RENDER_OFFSET_X = (CANVAS_WIDTH - (Room.WIDTH * Tile.TILE_SIZE)) / 2;
	static RENDER_OFFSET_Y = (CANVAS_HEIGHT - (Room.HEIGHT * Tile.TILE_SIZE)) / 2;

	static TOP_EDGE = Room.RENDER_OFFSET_Y + Tile.TILE_SIZE;
	static BOTTOM_EDGE = CANVAS_HEIGHT - Room.RENDER_OFFSET_Y - Tile.TILE_SIZE;
	static LEFT_EDGE = Room.RENDER_OFFSET_X + Tile.TILE_SIZE;
	static RIGHT_EDGE = CANVAS_WIDTH - Tile.TILE_SIZE * 2;
	static CENTER_X = Math.floor(Room.LEFT_EDGE + ((Room.RIGHT_EDGE - Room.LEFT_EDGE) / 2));
	static CENTER_Y = Math.floor(Room.TOP_EDGE + ((Room.BOTTOM_EDGE - Room.TOP_EDGE) / 2));

	static TILE_TOP_LEFT_CORNER = 3;
	static TILE_TOP_RIGHT_CORNER = 4;
	static TILE_BOTTOM_LEFT_CORNER = 22;
	static TILE_BOTTOM_RIGHT_CORNER = 23;
	static TILE_EMPTY = 18;
	static TILE_TOP_WALLS = [57, 58, 59];
	static TILE_BOTTOM_WALLS = [78, 79, 80];
	static TILE_LEFT_WALLS = [76, 95, 114];
	static TILE_RIGHT_WALLS = [77, 96, 115];
	static TILE_FLOORS = [
		6, 7, 8, 9, 10, 11, 12,
		25, 26, 27, 28, 29, 30, 31,
		44, 45, 46, 47, 48, 49, 50,
		63, 64, 65, 66, 67, 68, 69,
		87, 88, 106, 107,
	];

	/**
	 * Represents one individual section of the dungeon complete
	 * with its own set of enemies and a switch that can open the doors.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		this.player = player;
		this.dimensions = new Vector(Room.WIDTH, Room.HEIGHT);
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);
		this.tiles = this.generateWallsAndFloors();
		this.entities = this.generateEntities();
		this.renderQueue = this.buildRenderQueue();
	}

	update(dt) {
		this.renderQueue = this.buildRenderQueue();
		this.cleanUpEntities();
		this.updateEntities(dt);
	}

	render() {
		this.renderTiles();

		this.renderQueue.forEach((elementToRender) => {
			elementToRender.render();
		});
	}

	/**
	 * Order the entities by their renderPriority fields. If the renderPriority
	 * is the same, then sort the entities by their bottom positions. This will
	 * put them in an order such that entities higher on the screen will appear
	 * behind entities that are lower down.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	 */
	buildRenderQueue() {
		return this.entities.sort((a, b) => {
			let order = 0;
			const bottomA = a.hitbox.position.y + a.hitbox.dimensions.y;
			const bottomB = b.hitbox.position.y + b.hitbox.dimensions.y;

			if (a.renderPriority < b.renderPriority) {
				order = -1;
			}
			else if (a.renderPriority > b.renderPriority) {
				order = 1;
			}
			else if (bottomA < bottomB) {
				order = -1;
			}
			else {
				order = 1;
			}

			return order;
		});
	}

	cleanUpEntities() {
		this.entities = this.entities.filter((entity) => !entity.isDead);
	}

	updateEntities(dt) {
		this.entities.forEach((entity) => {
			if (entity.health <= 0) {
				entity.isDead = true;
			}
			else {
				entity.update(dt);
			}

			if (entity === this.player) {
				return;
			}

			if (entity.didCollideWithEntity(this.player.swordHitbox)) {
				entity.receiveDamage(this.player.damage);
			}

			if (!entity.isDead && this.player.didCollideWithEntity(entity.hitbox) && !this.player.isInvulnerable) {
				this.player.receiveDamage(entity.damage);
				this.player.becomeInvulnerable();
			}
		});
	}

	renderTiles() {
		this.tiles.forEach((tileRow) => {
			tileRow.forEach((tile) => {
				tile.render();
			});
		});
	}

	/**
	 * Uses the constants defined at the top of the class and determines which
	 * sprites to use for the walls and floor. Since there are several potential
	 * tiles to use for a piece of wall or floor, we can have a slightly different
	 * look each time we create a new room.
	 *
	 * @returns An array containing the walls and floors of the room, randomizing the tiles for visual variety.
	 */
	generateWallsAndFloors() {
		const tiles = [];

		for (let y = 0; y < this.dimensions.y; y++) {
			tiles.push([]);

			for (let x = 0; x < this.dimensions.x; x++) {
				let tileId = Room.TILE_EMPTY;

				if (x === 0 && y === 0) {
					tileId = Room.TILE_TOP_LEFT_CORNER;
				}
				else if (x === 0 && y === this.dimensions.y - 1) {
					tileId = Room.TILE_BOTTOM_LEFT_CORNER;
				}
				else if (x === this.dimensions.x - 1 && y === 0) {
					tileId = Room.TILE_TOP_RIGHT_CORNER;
				}
				else if (x === this.dimensions.x - 1 && y === this.dimensions.y - 1) {
					tileId = Room.TILE_BOTTOM_RIGHT_CORNER;
				}
				// Random left-hand walls, right walls, top, bottom, and floors.
				else if (x === 0) {
					tileId = Room.TILE_LEFT_WALLS[Math.floor(Math.random() * Room.TILE_LEFT_WALLS.length)];
				}
				else if (x === this.dimensions.x - 1) {
					tileId = Room.TILE_RIGHT_WALLS[Math.floor(Math.random() * Room.TILE_RIGHT_WALLS.length)];
				}
				else if (y === 0) {
					tileId = Room.TILE_TOP_WALLS[Math.floor(Math.random() * Room.TILE_TOP_WALLS.length)];
				}
				else if (y === this.dimensions.y - 1) {
					tileId = Room.TILE_BOTTOM_WALLS[Math.floor(Math.random() * Room.TILE_BOTTOM_WALLS.length)];
				}
				else {
					tileId = Room.TILE_FLOORS[Math.floor(Math.random() * Room.TILE_FLOORS.length)];
				}

				tiles[y].push(new Tile(x, y, Room.RENDER_OFFSET_X, Room.RENDER_OFFSET_Y, this.sprites[tileId]));
			}
		}

		return tiles;
	}

	/**
	 * @returns An array of enemies for the player to fight.
	 */
	generateEntities() {
		const entities = [];
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Enemies),
			Tile.TILE_SIZE,
			Tile.TILE_SIZE
		);

		for (let i = 0; i < 1; i++) {
			entities.push(EnemyFactory.createInstance(EnemyType.Skeleton, sprites));
			entities.push(EnemyFactory.createInstance(EnemyType.Slime, sprites));
		}

		entities.push(this.player);

		return entities;
	}
}
