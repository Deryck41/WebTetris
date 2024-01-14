import Drawer from './drawer.js'
import GameObject from './game_object.js'


const canvas = document.getElementById("gameField");
const ctx = canvas.getContext("2d");

let drawer = new Drawer(ctx, 20);
let gameObject = new GameObject(10, 20, drawer, 400);

let font = new FontFace("PS2P", "url(js/assets/PressStart2P-vaV7.ttf)");
	font.load().then(() =>{
	document.fonts.add(font);
	gameObject.MainLoop();
});


