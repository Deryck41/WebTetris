import Figure from './figure.js'


export default class Helper{
	static CheckIfColide(figure, blocks, height){
		const figureY = figure.GetY();
        const figureX = figure.GetX();
		const cells = figure.GetCells();

		for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x]) {
                    if (y + figureY >= height - 1) {
                        return true;
                    }

                    for (let i = 0; i < blocks.length; i++){
                        if (blocks[i].GetX() === x + figureX && blocks[i].GetY() - 1 === y + figureY){
                            return true;
                        }
                    }
                }
            }
        }

        return false;
	}

    static CheckColideX(figure, deltaX, blocks, width){
        const figureY = figure.GetY();
        const figureX = figure.GetX();
        const cells = figure.GetCells();

        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x]) {
                    if (!(x + figureX + deltaX >= 0 && x + figureX + deltaX <= width - 1)){
                        return true;
                    }

                    for (let i = 0; i < blocks.length; i++){
                        if (blocks[i].GetY() === y + figureY && blocks[i].GetX() === x + figureX + deltaX){
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }
}