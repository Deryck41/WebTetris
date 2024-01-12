export default class Block{
	#x;
	#y;
	#color;
	constructor(x, y, color){
		this.#x = x;
		this.#y = y;
		this.#color = color;
	}

	GetX() { return this.#x;}
	GetY() { return this.#y;}
	GetColor() { return this.#color;}
	MoveDown(level) { this.#y += level}
}