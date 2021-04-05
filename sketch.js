let palettes;
let contentDiv;

function preload() {
  palettes = loadJSON("palettes.json");
}

function setup() {
  contentDiv = document.getElementById('content');
  for (let i = 0; i < Object.keys(palettes).length; i++) {
    createPalette(palettes[i]);
  }
}

function createPalette(p) {
  let container = createDiv();

  let title = createP(p.name);
  title.parent(container);

  let cvs = createCanvas(500, 100);
  cvs.background(p.colors[0]);
  cvs.parent(container);
  
  container.parent(contentDiv);
}
