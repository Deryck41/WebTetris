import colors from "./colors.js" 
import Figure from "./figure.js" 
export default class Drawer{
	#ctx;
	#blockSize;
	#fullSize;
	#extraSpace;
	constructor(ctx, blockSize){
		this.#ctx = ctx;
		this.#blockSize = blockSize;
		this.#extraSpace = parseInt(this.#blockSize / 5);
		this.#fullSize = (this.#extraSpace * 2) + this.#blockSize;
	}

	DrawBlock(x, y, color){

		this.#ctx.fillStyle = colors[color]["primaryColor"];
		this.#ctx.fillRect(this.#extraSpace + x, this.#extraSpace + y, this.#blockSize, this.#blockSize);

		this.#ctx.fillStyle = colors[color]["borderColors"][0];
		this.#ctx.beginPath();
		this.#ctx.moveTo(this.#extraSpace + x, this.#extraSpace + y);
		this.#ctx.lineTo(x, y);
		this.#ctx.lineTo(x , y + (this.#extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + this.#extraSpace, y + this.#blockSize + this.#extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][1];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#extraSpace, y + this.#blockSize + this.#extraSpace);
		this.#ctx.lineTo(x, y + (this.#extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + (this.#extraSpace * 2) + this.#blockSize, y + (this.#extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + this.#blockSize + this.#extraSpace, y + this.#blockSize + this.#extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][2];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize + this.#extraSpace, y + this.#blockSize + this.#extraSpace);
		this.#ctx.lineTo(x + (this.#extraSpace * 2) + this.#blockSize, y + (this.#extraSpace * 2) + this.#blockSize);
		this.#ctx.lineTo(x + (this.#extraSpace * 2) + this.#blockSize, y);
		this.#ctx.lineTo(x + this.#blockSize + this.#extraSpace, y + this.#extraSpace);
		this.#ctx.fill();

		this.#ctx.fillStyle = colors[color]["borderColors"][3];
		this.#ctx.beginPath();
		this.#ctx.moveTo(x + this.#blockSize + this.#extraSpace, y + this.#extraSpace);
		this.#ctx.lineTo(x + (this.#extraSpace * 2) + this.#blockSize, y);
		this.#ctx.lineTo(x, y);
		this.#ctx.lineTo(x + this.#extraSpace, y + this.#extraSpace);
		this.#ctx.fill();
	}

	DrawField(){

		for (let y = 0; y < 20; y++){
			for (let x = 0; x < 10; x++){
				this.#ctx.fillStyle = (x + y) % 2 === 0 ? "#101010" : "#121212";
				this.#ctx.fillRect(x* this.#fullSize, y * this.#fullSize, this.#fullSize, this.#fullSize);
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

		cells.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    this.DrawBlock(x * this.#fullSize + figureX * this.#fullSize, y * this.#fullSize + figureY * this.#fullSize, color);
                }
            });
        });
	}

	DrawScore(){
		this.#ctx.font = "25px PS2P";	
		this.#ctx.textAlign = "center";
		this.#ctx.fillStyle = "#FFF";
		this.#ctx.fillText("Score: ", 450, 370);
	}

}
