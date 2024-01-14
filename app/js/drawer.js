import colors from "./colors.js" 
import Figure from "./figure.js"


export default class Drawer{
	#ctx;
	#blockSize;
	#fullSize;
	#extraSpace;
	#width;
	#height;
	constructor(ctx, blockSize){
		this.#ctx = ctx;
		this.#blockSize = blockSize;
		this.#extraSpace = parseInt(this.#blockSize / 5);
		this.#fullSize = (this.#extraSpace * 2) + this.#blockSize;
	}

	SetSize(width, height){
		this.#width = width;
		this.#height = height;
	}

	DrawBlock(x, y, color){
		x*=this.#fullSize;
		y*=this.#fullSize;
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
		for (let y = 0; y < this.#height; y++){
			for (let x = 0; x < this.#width; x++){
				this.#ctx.fillStyle = (x + y) % 2 === 0 ? "#101010" : "#121212";
				this.#ctx.fillRect(x* this.#fullSize, y * this.#fullSize, this.#fullSize, this.#fullSize);
			}
		}

		this.#ctx.beginPath();
		this.#ctx.moveTo(0,0);
		this.#ctx.lineTo(0, this.#fullSize * this.#height);
		this.#ctx.lineTo(this.#fullSize * this.#width, this.#fullSize * this.#height);
		this.#ctx.lineTo(this.#fullSize * this.#width, 0);
		this.#ctx.lineTo(0,0);
		this.#ctx.stroke();

		this.#ctx.beginPath();
		this.#ctx.moveTo(0,0);
		this.#ctx.lineTo(0,this.#fullSize * this.#height);
		this.#ctx.lineTo(this.#fullSize * this.#width + 320, this.#fullSize * this.#height);
		this.#ctx.lineTo(this.#fullSize * this.#width + 320, 0);
		this.#ctx.lineTo(0,0);
		this.#ctx.stroke();


	}

	DrawFigure(figure){
		let cells = figure.GetCells();
		let figureX = figure.GetX();
		let figureY = figure.GetY();
		let color = figure.GetColor();

		for (let y = 0; y < cells.length; y++) {
	        for (let x = 0; x < cells[y].length; x++) {
	            if (cells[y][x]) {
	                this.DrawBlock(x + figureX, y + figureY, color);
	            }
	        }
	    }
	}

	DrawScore(){
		this.#ctx.font = "25px PS2P";	
		this.#ctx.textAlign = "center";
		this.#ctx.fillStyle = "#FFF";
		this.#ctx.fillText("Score: ", this.#fullSize * this.#width + 170, parseInt(this.#height * this.#fullSize / 1.5));
	}

}
