import Drawer from './drawer.js';

const canvas = document.getElementById("gameField");
const ctx = canvas.getContext("2d");

var drawer = new Drawer(ctx, 50);
drawer.DrawBlock(10, 200, "orange");
drawer.DrawBlock(80, 200, "blue");
drawer.DrawBlock(150, 200, "yellow");
drawer.DrawBlock(220, 200, "green");
drawer.DrawBlock(290, 200, "red");
drawer.DrawBlock(360, 200, "purple");
drawer.DrawBlock(430, 200, "lightblue");