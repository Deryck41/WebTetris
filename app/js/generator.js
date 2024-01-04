export default class Generator{
	static colors = ["yellow", "blue", "orange", "green", "red", "purple", "lightblue"];
	static figures = [
			[
				[false, true, true, true],
				[false, true, false, false],
				[false, false, false, false],
				[false, false, false, false]
				],
			[
				[false, false, true, false],
				[false, false, true, false],
				[false, false, true, false],
				[false, false, true, false]
				],
			[
				[false, true, true, false],
				[false, true, true, false],
				[false, false, false, false],
				[false, false, false, false]
				],
			[
				[false, true, true, true],
				[false, false, true, false],
				[false, false, false, false],
				[false, false, false, false]
				],
			[
				[false, false, false, true],
				[false, false, true, true],
				[false, false, true, false],
				[false, false, false, false]]
			];
	static GenerateRandomFigureCells(){
		return this.figures[Math.floor(Math.random()*this.figures.length)];
	}

	static GenerateRandomColor(){
		return this.colors[Math.floor(Math.random()*this.colors.length)];
	}

	static GenerateRandomCoordX(){
		return Math.floor(Math.random() * 7);
	}
}