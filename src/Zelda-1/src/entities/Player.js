import GameEntity from "./GameEntity.js";
import { context, DEBUG, images } from "../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerWalkingState from "../states/entity/player/PlayerWalkingState.js";
import PlayerSwordSwingingState from "../states/entity/player/PlayerSwordSwingingState.js";
import PlayerIdlingState from "../states/entity/player/PlayerIdlingState.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Hitbox from "../../lib/Hitbox.js";
import ImageName from "../enums/ImageName.js";
import Sprite from "../../lib/Sprite.js";
import Room from "../objects/Room.js";
import Direction from "../enums/Direction.js";

export default class Player extends GameEntity {
	static WIDTH = 16;
	static HEIGHT = 22;
	static WALKING_SPRITE_WIDTH = 16;
	static WALKING_SPRITE_HEIGHT = 32;
	static SWORD_SWINGING_SPRITE_WIDTH = 32;
	static SWORD_SWINGING_SPRITE_HEIGHT = 32;
	static MAX_SPEED = 100;

	/**
	 * The hero character the player controls in the map.
	 * Has the ability to swing a sword to kill enemies
	 * and will collide into objects that are collidable.
	 */
	constructor() {
		super();

		this.walkingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.PlayerWalk),
			Player.WALKING_SPRITE_WIDTH,
			Player.WALKING_SPRITE_HEIGHT
		);
		this.swordSwingingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.PlayerSword),
			Player.SWORD_SWINGING_SPRITE_WIDTH,
			Player.SWORD_SWINGING_SPRITE_HEIGHT
		);
		this.sprites = this.walkingSprites;

		/**
		 * Since the regular sprite and sword-swinging sprite are different dimensions,
		 * we need a position offset to make it look like one smooth animation when rendering.
		 */
		this.positionOffset = { x: 0, y: 0 };

		/**
		 * Start the sword's hitbox as nothing for now. Later, in the
		 * PlayerSwordSwingingState, we'll define the actual dimensions.
		 */
		this.swordHitbox = new Hitbox(0, 0, 0, 0, 'blue');

		/**
		 * We don't want the hitbox for the player to be the size of the
		 * whole sprite. Instead, we want a much smaller area relative to
		 * the player's dimensions and position to be used to detect collisions.
		 */
		this.hitboxOffsets = new Hitbox(0, Player.HEIGHT, 0, -Player.HEIGHT + 6);
		this.position.x = Room.CENTER_X - Player.WIDTH / 2;
		this.position.y = Room.CENTER_Y - Player.HEIGHT / 2;
		this.dimensions.x = Player.WIDTH;
		this.dimensions.y = Player.HEIGHT;
		this.speed = Player.MAX_SPEED;
		this.stateMachine = this.initializeStateMachine();
	}

	render() {
		super.render(this.positionOffset);

		if (DEBUG) {
			this.swordHitbox.render(context);
		}
	}

	reset() {
		this.position.x = Room.CENTER_X - Player.WIDTH / 2;
		this.position.y = Room.CENTER_Y - Player.HEIGHT / 2;
		this.direction = Direction.Down;
		this.stateMachine.change(PlayerStateName.Idle);
	}

	initializeStateMachine() {
		const stateMachine = new StateMachine();

		stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
		stateMachine.add(PlayerStateName.SwordSwinging, new PlayerSwordSwingingState(this));
		stateMachine.add(PlayerStateName.Idle, new PlayerIdlingState(this));

		stateMachine.change(PlayerStateName.Idle);

		return stateMachine;
	}
}
