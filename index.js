// spaghetti

// variables
const randomButton = document.getElementById("randomColorButton");
const resetColorButton = document.getElementById("resetButton");

const HEXImport = document.getElementById("importButton");
const hexText = document.getElementById("HEXText");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const aSlider = document.getElementById("aSlider");

const Sliders = document.getElementsByClassName("slider");
const Spans = document.getElementsByClassName("sliderSpan");

const RGBDiv = document.getElementById("Editable");

// functions
function randomRGB() {
  let rngNumber = Math.floor(Math.random() * 255) + 1;
  let rgbText = "rgb(" + rngNumber.toString();
  
  for (let i = 0; i < 2; i++) {
    rngNumber = Math.floor(Math.random() * 255) + 1;
    rgbText += "," + rngNumber.toString();
  }
  
  rgbText += ")";

  return rgbText;
}

function ChangeColor(item, bgColor, bdColor) {
    item.style.backgroundColor = bgColor;
    item.style.borderColor = bdColor;
}

function rgbToHEX(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) {
    r = "0" + r
  }
  if (g.length == 1) {
    g = "0" + g
  }
  if (b.length == 1) {
    b = "0" + b
  }
  return ["#", r, g, b].join("")
}

function HEXtoRGB(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function sliderUpdate() {  
  for (let SpanIndex in Spans) {
      if (Spans[SpanIndex].id !== "undefined" && Spans[SpanIndex].id !== undefined) {
        let CurrentSpan = Spans[SpanIndex];
        let colonPosition = CurrentSpan.innerHTML.indexOf(":") + 1;

        CurrentSpan.innerHTML = CurrentSpan.innerHTML.substring(0, colonPosition) + " " + Sliders[SpanIndex].value;
    }
  }

  ChangeColor(RGBDiv, ["rgba(", rSlider.value, ",", gSlider.value, ",", bSlider.value, ",", aSlider.value, ")"].join(""));
  hexText.innerHTML = "HEX: " + rgbToHEX(Number(rSlider.value), Number(gSlider.value), Number(bSlider.value));
}

// event stuff
randomButton.onclick = function() {ChangeColor(randomButton, randomRGB(), randomRGB())};

rSlider.addEventListener("input", sliderUpdate); 
gSlider.addEventListener("input", sliderUpdate); 
bSlider.addEventListener("input", sliderUpdate);
aSlider.addEventListener("input", sliderUpdate);

sliderUpdate();

HEXImport.onclick = function() {
  const HEXInput = document.getElementById("HEXInput");

  RGBDiv.style.backgroundColor = "rgb(" + HEXtoRGB(HEXInput.value).r + "," + HEXtoRGB(HEXInput.value).g + "," + HEXtoRGB(HEXInput.value).b + ")";

  rSlider.value = HEXtoRGB(HEXInput.value).r;
  gSlider.value = HEXtoRGB(HEXInput.value).g;
  bSlider.value = HEXtoRGB(HEXInput.value).b;

  sliderUpdate();
}

resetColorButton.onclick = function() {
  rSlider.value = "128"; Spans[0].innerHTML = "Red: 128";
  gSlider.value = "128"; Spans[1].innerHTML = "Green: 128";
  bSlider.value = "128"; Spans[2].innerHTML = "Blue: 128";
  aSlider.value = "1"; Spans[3].innerHTML = "Alpha: 1";

  hexText.innerHTML = "HEX: #808080"
  RGBDiv.style.backgroundColor = "rgb(128, 128, 128)";
  
  sliderUpdate();
}