import Figure from './figure.js'
import Generator from './generator.js'
import Drawer from './drawer.js'

export default class GameObject{
	#drawer;
	#speed;
	#figure;
	constructor(drawer, speed){
		this.#drawer = drawer;
		this.#speed = speed;
		this.#figure = new Figure(Generator.GenerateRandomCoordX(), 0, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor());
	}

	#HandleInput(){
		console.log("Handle Input");
	}
	#Update(){
		console.log("Update");
		this.#figure.MoveY(1);
	}
	#Render(){
		this.#drawer.DrawScore();
		this.#drawer.DrawField();
		this.#drawer.DrawFigure(this.#figure);
	}

	MainLoop(){

		setInterval(() => {
			this.#HandleInput();
			this.#Update();
			this.#Render();
		}, this.#speed);
	}
}