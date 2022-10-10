import Images from "../lib/Images.js";
import StateMachine from "../lib/StateMachine.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
export const CANVAS_WIDTH = 384;
export const CANVAS_HEIGHT = 208;

export const keys = {};
export const images = new Images(context);
export const stateMachine = new StateMachine();

// If true, render all hitboxes.
export const DEBUG = false;
