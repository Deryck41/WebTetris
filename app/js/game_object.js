import Figure from './figure.js'
import Generator from './generator.js'
import Drawer from './drawer.js'
import Helper from './helper.js'
import Block from './block.js'

export default class GameObject{
	#drawer;
	#speed;
	#deltaY;
	#figure;
	#blocks;
	#width;
	#height;
	#targetFPS;
	#lastUpdateTime;
	constructor(width, height, drawer, targetFPS, speed){
		this.#width = width;
		this.#height = height;
		this.#drawer = drawer;
		this.#drawer.SetSize(this.#width, this.#height);
		this.#targetFPS = 1000 / targetFPS;
		this.#blocks = [];
		this.#speed = speed;
		this.#deltaY = 0;
		this.#figure = new Figure(Generator.GenerateRandomCoordX(), -5, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor());
		this.#lastUpdateTime = performance.now();
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

	#RotateFigure(){
		// TODO: Add Colide ceck
		Helper.RotateFigure(this.#figure);

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
			case 38: // upArrow
			case 87: // w
				// rotate

				this.#RotateFigure();
				break;
			case 40: // downArrow
			case 83: // s
				// acselerate move

				this.#deltaY += this.#speed * 2;
		}
	}
	#Update(){
		const currentTime = performance.now();
		const elapsedTime = currentTime - this.#lastUpdateTime;

		if (elapsedTime  > this.#targetFPS){
			if(Helper.CheckIfColide(this.#figure, this.#blocks, this.#height)){
				this.#FigureToBlocks();
				const linesFilled = Helper.CheckLinesFilled(this.#blocks);

				if (linesFilled.length > 0){
					this.#blocks = Helper.ClearLines(linesFilled, this.#blocks);
				}
				// create new figure with y -4 b'coz height of cell matrix is 4.
				this.#figure = new Figure(Generator.GenerateRandomCoordX(), -4, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor());
				return;
			}
			this.#deltaY += this.#speed;
			if (parseInt(this.#deltaY) >= 1){
				this.#figure.MoveY(parseInt(this.#deltaY));
				this.#deltaY = 0;
			}
			
			this.#lastUpdateTime = currentTime;
		}
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

		const animate = () => {
			this.#Update();
			this.#Render();
			requestAnimationFrame(animate);
		};

		requestAnimationFrame(animate);
	}
}