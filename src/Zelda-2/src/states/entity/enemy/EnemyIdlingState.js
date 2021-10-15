import { getRandomPositiveInteger } from "../../../../lib/RandomNumberHelpers.js";
import State from "../../../../lib/State.js";
import Enemy from "../../../entities/enemies/Enemy.js";
import EnemyStateName from "../../../enums/EnemyStateName.js";
import { timer } from "../../../globals.js";

export default class EnemyIdlingState extends State {
	static MOVE_DURATION_MIN = 2;
	static MOVE_DURATION_MAX = 6;

	/**
	 * In this state, the enemy does not move and
	 * starts moving after a random period of time.
	 *
	 * @param {Enemy} enemy
	 * @param {object} animations
	 */
	constructor(enemy, animations) {
		super();

		this.enemy = enemy;
		this.animations = animations;
	}

	enter() {
		this.enemy.currentAnimation = this.animations[this.enemy.direction];
		this.idleDuration = getRandomPositiveInteger(EnemyIdlingState.MOVE_DURATION_MIN, EnemyIdlingState.MOVE_DURATION_MAX);

		this.startTimer();
	}

	startTimer() {
		this.timer = timer.wait(this.idleDuration, () => this.enemy.changeState(EnemyStateName.Walking));
	}
}
