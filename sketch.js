let contentDiv;

window.onload = function() {
  contentDiv = document.getElementById("content");
  fetch("./palettes.json")
  .then(response => response.json())
  .then(jsondata => makePalettes(jsondata));
};

function makePalettes(palettes) {
  for (let i = 0; i < Object.keys(palettes).length; i++) {
    createPalette(palettes[i]);
  }
}

function getFixedPointFromHex(hexString) {
  let asFloat = parseInt(hexString, 16) / 255
  return parseFloat(asFloat.toFixed(3));
}

function getBlenderColor(hexString) {
  let hex = hexString.substring(1);
  return [
    getFixedPointFromHex(hex.slice(0, 2)), // red
    getFixedPointFromHex(hex.slice(2, 4)), // green
    getFixedPointFromHex(hex.slice(4, 6)), // blue
    1, // alpha
  ]
}

function isBlenderModeActive() {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("blender");
}

function createPalette(p) {
  let palettep5 = new p5((sketch) => {
    sketch.setup = () => {
      let divWidth = 520;
      if (sketch.windowWidth < 520) divWidth = sketch.windowWidth;

      let container = sketch.createDiv();
      container.class("palette");
      container.style("width", (divWidth-40)+"px");

      let title = sketch.createP(p.name);
      title.class("palette_name");
      title.parent(container);

      let canvas = sketch.createCanvas(divWidth-40, 100);
      sketch.noStroke();
      let w = canvas.width/p.colors.length;
      let x = 0;
      for (let c of p.colors) {
        sketch.fill(c);
        sketch.rect(x, 0, w+1, canvas.height);
        x += w;
      }
      let sw = 3;
      sketch.strokeWeight(sw);
      sketch.noFill();
      sketch.stroke(255);
      sketch.rect(sw/2, sw/2, canvas.width-sw, canvas.height-sw, 0);
      sketch.stroke(0);
      sketch.rect(sw/2, sw/2, canvas.width-sw, canvas.height-sw, 9);
      canvas.parent(container);

      let codeString;
      if (isBlenderModeActive()) {
        // write four-tuple float colors
        codeString = "";
        for (let c of p.colors) {
          codeString += "[";
          codeString += getBlenderColor(c);
          codeString += "] ";
        }
      } else {
        // write hex colors
        codeString = "[\"";
        for (let c of p.colors) {
          codeString += c + "\", \"";
        }
        codeString = codeString.substring(0, codeString.length-3) + "]";
      }

      let codeP = sketch.createP(codeString);
      codeP.class("code");
      //codeP.style("width", (divWidth-40)+"px");
      codeP.parent(container);
    };
  }, contentDiv);
}
