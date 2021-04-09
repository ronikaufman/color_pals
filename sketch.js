let contentDiv;
let palettes;

window.onload = function() {
  contentDiv = document.getElementById("content");
  let myp5 = new p5((sketch) => {
    palettes = sketch.loadJSON("palettes.json", makePalettes);
  });
};

function makePalettes() {
  for (let i = 0; i < Object.keys(palettes).length; i++) {
    createPalette(palettes[i]);
  }

  let uselessCanvas = document.getElementById("defaultCanvas0");
  uselessCanvas.parentNode.removeChild(uselessCanvas);
}

function createPalette(p) {
  let palettep5 = new p5((sketch) => {
    sketch.setup = () => {
      let container = sketch.createDiv();
      container.class("palette");

      let title = sketch.createP(p.name);
      title.class("palette_name");
      title.parent(container);

      let canvas = sketch.createCanvas(500, 100);
      sketch.noStroke();
      let w = canvas.width/p.colors.length;
      let x = 0;
      for (let c of p.colors) {
        sketch.fill(c);
        sketch.rect(x, 0, w+1, canvas.height);
        x += w;
      }
      sketch.stroke(0);
      sketch.strokeWeight(4);
      sketch.noFill();
      sketch.rect(0, 0, canvas.width, canvas.height);
      canvas.parent(container);

      let codeString = "[";
      for (let c of p.colors) {
        codeString += c + ", ";
      }
      codeString = codeString.substring(0, codeString.length-2) + "]";
      let code = sketch.createP(codeString);
      code.class("code");
      code.parent(container);
    };
  }, contentDiv);
}
