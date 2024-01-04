import colors from "./colors.js" 
export default class Drawer{
	#ctx;
	#blockSize;
	constructor(ctx, blockSize){
		this.#ctx = ctx;
		this.#blockSize = blockSize;
	}

	DrawBlock(x, y, color){
		let extraSpace = parseInt(this.#blockSize / 5);

		this.#ctx.fillStyle = colors[color]["primaryColor"];
		this.#ctx.fillRect(x, y, this.#blockSize, this.#blockSize);

		this.#ctx.fillStyle = colors[color]["borderColors"][0];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y);
		this.#ctx.lineTo(x - extraSpace, y - extraSpace);
		this.#ctx.lineTo(x - extraSpace, y + extraSpace + this.#blockSize);
		this.#ctx.lineTo(x, y + this.#blockSize);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][1];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x, y + this.#blockSize);
		this.#ctx.lineTo(x - extraSpace, y + extraSpace + this.#blockSize);
		this.#ctx.lineTo(x + extraSpace + this.#blockSize, y + extraSpace + this.#blockSize);
		this.#ctx.lineTo(x + this.#blockSize, y + this.#blockSize);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][2];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize, y + this.#blockSize);
		this.#ctx.lineTo(x + extraSpace + this.#blockSize, y + extraSpace + this.#blockSize);
		this.#ctx.lineTo(x + extraSpace + this.#blockSize, y - extraSpace);
		this.#ctx.lineTo(x + this.#blockSize, y);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][3];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize, y);
		this.#ctx.lineTo(x + extraSpace + this.#blockSize, y - extraSpace);
		this.#ctx.lineTo(x - extraSpace, y - extraSpace);
		this.#ctx.lineTo(x, y);
		this.#ctx.fill();
	}
}
