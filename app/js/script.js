import Drawer from './drawer.js';
import Generator from './generator.js'
import Figure from './figure.js'

const canvas = document.getElementById("gameField");
const ctx = canvas.getContext("2d");

let font = new FontFace("PS2P", "url(js/assets/PressStart2P-vaV7.ttf)");
	font.load().then(() =>{
	document.fonts.add(font);
	drawer.DrawScore();
});

var drawer = new Drawer(ctx, 20);
drawer.DrawField();

let figure = new Figure(Generator.GenerateRandomCoordX(), 0, Generator.GenerateRandomFigureCells(), Generator.GenerateRandomColor(), "test");
drawer.DrawFigure(figure);
figure.ChangeX(1);
drawer.DrawFigure(figure);
