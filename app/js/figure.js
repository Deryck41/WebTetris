export default class Figure{
	#cells;
	#x;
	#y;
	#color;
	#orientation;
	constructor (x, y, cells, color, orientation){
		this.#cells = cells;
		this.#x = x;
		this.#y = y;
		this.#color = color;
		this.#orientation = orientation;
	}

	GetX() { return this.#x;}
	GetY() { return this.#y;}
	GetColor() { return this.#color;}
	GetCells() { return this.#cells;}

	ChangeX(x){ this.#x = x;}
}