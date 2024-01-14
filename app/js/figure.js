export default class Figure{
	#cells;
	#x;
	#y;
	#color;
	constructor (x, y, cells, color){
		this.#cells = cells;
		this.#x = x;
		this.#y = y;
		this.#color = color;
	}

	GetX(){
		return this.#x;
	}
	GetY(){
		return this.#y;
	}
	GetColor(){
		return this.#color;
	}
	GetCells(){
		return this.#cells;
	}

	Move(x, y){
		this.#x += x;
		this.#y += y;
	}

	MoveX(x){
		this.#x += x;
	}

	MoveY(y){
		this.#y += y;
	}
}