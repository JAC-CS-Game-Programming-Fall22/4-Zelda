import Images from "../lib/Images.js";
import StateMachine from "../lib/StateMachine.js";

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

export const keys = {};
export const images = new Images(context);
export const stateMachine = new StateMachine();

// If true, render all hitboxes.
export const DEBUG = false;
