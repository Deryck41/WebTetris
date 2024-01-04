import colors from "./colors.js" 
import Figure from "./figure.js" 
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
		this.#ctx.fillRect(extraSpace + x, extraSpace + y, this.#blockSize, this.#blockSize);

		this.#ctx.fillStyle = colors[color]["borderColors"][0];
		this.#ctx.beginPath();
		this.#ctx.moveTo(extraSpace + x, extraSpace + y);
		this.#ctx.lineTo(x, y);
		this.#ctx.lineTo(x , y + (extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + extraSpace, y + this.#blockSize + extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][1];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + extraSpace, y + this.#blockSize + extraSpace);
		this.#ctx.lineTo(x, y + (extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + (extraSpace * 2) + this.#blockSize, y + (extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + this.#blockSize + extraSpace, y + this.#blockSize + extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][2];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize + extraSpace, y + this.#blockSize + extraSpace);
		this.#ctx.lineTo(x + (extraSpace * 2) + this.#blockSize, y + (extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + (extraSpace * 2) + this.#blockSize, y);
		this.#ctx.lineTo(x + this.#blockSize + extraSpace, y + extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][3];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize + extraSpace, y + extraSpace);
		this.#ctx.lineTo(x + (extraSpace * 2) + this.#blockSize, y);
		this.#ctx.lineTo(x, y);
		this.#ctx.lineTo(x + extraSpace, y + extraSpace);
		this.#ctx.fill();
	}

	DrawField(){
		

		for (let y = 0; y < 20; y++){
			for (let x = 0; x < 10; x++){
				this.#ctx.fillStyle = (x + y) % 2 === 0 ? "#101010" : "#131313";
				this.#ctx.fillRect(x* 28, y * 28, 28, 28);
			}
		}

		this.#ctx.beginPath();
		this.#ctx.moveTo(0,0);
		this.#ctx.lineTo(0,560);
		this.#ctx.lineTo(280,560);
		this.#ctx.lineTo(280,0);
		this.#ctx.lineTo(0,0);
		this.#ctx.stroke();

		this.#ctx.beginPath();
		this.#ctx.moveTo(0,0);
		this.#ctx.lineTo(0,560);
		this.#ctx.lineTo(600,560);
		this.#ctx.lineTo(600,0);
		this.#ctx.lineTo(0,0);
		this.#ctx.stroke();


	}

	DrawFigure(figure){
		let cells = figure.GetCells();
		let figureX = figure.GetX();
		let figureY = figure.GetY();
		let color = figure.GetColor();

		for (let y = 0; y < 4; y++){
			for (let x = 0; x < 4; x++){
				if (cells[y][x]){
					this.DrawBlock(x * 28 + figureX * 28, y * 28 + figureY * 28, color);
				}
			}
		}
	}

	DrawScore(){
		this.#ctx.font = "25px PS2P";	
		this.#ctx.textAlign = "center";
		this.#ctx.fillStyle = "#FFF";
		this.#ctx.fillText("Score: ", 450, 370);
	}

}
