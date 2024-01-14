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

	static RotateFigure(figure){
		let cells = figure.GetCells();
		for (let i = 0; i < 2; i++) {
			for (let j = i; j < 4 - i - 1; j++) {
				const temp = cells[i][j];
				cells[i][j] = cells[3 - j][i];
				cells[3 - j][i] = cells[3 - i][3 - j];
				cells[3 - i][3 - j] = cells[j][3 - i];
				cells[j][3 - i] = temp;
			}
		}
		figure.SetCells(cells);
	}

	static CheckLinesFilled(blocks){
		let rows = {};
		let linesFilled = [];

		blocks.forEach((block) => {
			if (!rows[block.GetY()]) {
                rows[block.GetY()] = 1;
            } else {
                rows[block.GetY()] += 1;
            }
		});

		for (const [row, count] of Object.entries(rows)) {
            if (parseInt(count) === 10) {
                linesFilled.push(parseInt(row));
            }
        }

        return linesFilled;
	}
	static ClearLines(linesFilled, blocks){
		const updatedBlocks = blocks.filter((block) => !linesFilled.includes(block.GetY()));

        for (const line of linesFilled) {
            for (let i = 0; i < updatedBlocks.length; i++) {
                if (updatedBlocks[i].GetY() < line) {
                    updatedBlocks[i].MoveDown(1);
                }
            }
        }

        return updatedBlocks;
	}
}

