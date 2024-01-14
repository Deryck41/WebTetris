import Figure from './figure.js'
import Generator from './generator.js'
import Drawer from './drawer.js'
import Helper from './helper.js'
import Block from './block.js'

export default class GameObject{
	#drawer;
	#speed;  // delta setInterval time
	#figure;
	#blocks;
	#width;
	#height;
	constructor(width, height, drawer, speed){
		this.#width = width;
		this.#height = height;
		this.#drawer = drawer;
		this.#drawer.SetSize(this.#width, this.#height);
		this.#speed = speed;
		this.#blocks = [];
		this.#figure = new Figure(Generator.GenerateRandomCoordX(), -5, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor());
	}

	#FigureToBlocks(){
		const figureX = this.#figure.GetX();
		const figureY = this.#figure.GetY();
		const color = this.#figure.GetColor();

		this.#figure.GetCells().forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    this.#blocks.push(new Block(x + figureX, y + figureY, color));
                }
            });
        });
	}

	#MoveFigureX(x){
		if (!Helper.CheckColideX(this.#figure, x, this.#blocks, this.#width)){
			this.#figure.MoveX(x);
		}
	}

	#HandleInput(event){
		console.log(event.keyCode);
		switch (event.keyCode){
			case 37: // arrowLeft
			case 65: // a
				// left
				console.log(this);
				this.#MoveFigureX(-1);
				break;
			case 39: // arrowRight
			case 68: // d
				//right

				this.#MoveFigureX(1);
				break;
		}
	}
	#Update(){
		if(Helper.CheckIfColide(this.#figure, this.#blocks, this.#height)){
			this.#FigureToBlocks();

			// create new figure with y -4 b'coz height of cell matrix is 4.
			this.#figure = new Figure(Generator.GenerateRandomCoordX(), -4, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor());
			return;
		}
		this.#figure.MoveY(1);

	}
	#Render(){
		this.#drawer.DrawScore();
		this.#drawer.DrawField();
		this.#drawer.DrawFigure(this.#figure);
		this.#blocks.forEach((block) => {
			this.#drawer.DrawBlock(block.GetX(), block.GetY(), block.GetColor());
		});
	}

	MainLoop(){
		document.addEventListener('keydown', this.#HandleInput.bind(this));
		setInterval(() => {
			this.#Update();
			this.#Render();
		}, this.#speed);
	}
}