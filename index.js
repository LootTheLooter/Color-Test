// spaghetti

// variables
const randomButton = document.getElementById("randomColorButton");
const resetColorButton = document.getElementById("resetButton");
const HEXImport = document.getElementById("importButton");

const hexText = document.getElementById("HEXText");
const rSpan = document.getElementById("redSpan");
const gSpan = document.getElementById("greenSpan");
const bSpan = document.getElementById("blueSpan");
const aSpan = document.getElementById("alphaSpan")

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");
const aSlider = document.getElementById("aSlider")
const HEXInput = document.getElementById("HEXInput");

const RGBDiv = document.getElementById("Editable");

// functions
function randomRGB() {
  let rngNumber = Math.floor(Math.random() * 255) + 1;
  let rgbText = "rgb(" + rngNumber.toString()
  for (let i = 0; i < 1; i++) {
    rngNumber = Math.floor(Math.random() * 255) + 1;
    rgbText += "," + rngNumber.toString()
  }
  rgbText += "," + rngNumber.toString() + ")"
  return rgbText
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

function sliderUpdate(slider, spanElement, text) {
  spanElement.innerHTML = text + slider.value
  ChangeColor(RGBDiv, ["rgba(", rSlider.value, ",", gSlider.value, ",", bSlider.value, ",", aSlider.value, ")"].join(""))
  hexText.innerHTML = "HEX: " + rgbToHEX(Number(rSlider.value), Number(gSlider.value), Number(bSlider.value))
}

// connecting events
randomButton.onclick = function() {ChangeColor(randomButton, randomRGB(), randomRGB())}

HEXImport.onclick = function() {
  RGBDiv.style.backgroundColor = "rgb(" + HEXtoRGB(HEXInput.value).r + "," + HEXtoRGB(HEXInput.value).g + "," + HEXtoRGB(HEXInput.value).b + ")"
  rSlider.value = HEXtoRGB(HEXInput.value).r
  gSlider.value = HEXtoRGB(HEXInput.value).g
  bSlider.value = HEXtoRGB(HEXInput.value).b

  sliderUpdate(rSlider, rSpan, "Red: ")
  sliderUpdate(gSlider, gSpan, "Green: ")
  sliderUpdate(bSlider, bSpan, "Blue: ")
}

rSlider.oninput = function() {sliderUpdate(rSlider, rSpan, "Red: ")};
gSlider.oninput = function() {sliderUpdate(gSlider, gSpan, "Green: ")};
bSlider.oninput = function() {sliderUpdate(bSlider, bSpan, "Blue: ")};
aSlider.oninput = function() {sliderUpdate(aSlider, aSpan, "Alpha: ")}

sliderUpdate(rSlider, rSpan, "Red: "); sliderUpdate(gSlider, gSpan, "Green: "); sliderUpdate(bSlider, bSpan, "Blue: "); sliderUpdate(aSlider, aSpan, "Alpha: ")

resetColorButton.onclick = function() {
  rSlider.value = "128"; rSpan.innerHTML = "Red: 128";
  gSlider.value = "128"; gSpan.innerHTML = "Green: 128";
  bSlider.value = "128"; bSpan.innerHTML = "Blue: 128";
  aSlider.value = "1"; aSpan.innerHTML = "Alpha: 1";

  hexText.innerHTML = "HEX: " + rgbToHEX(Number(rSlider.value), Number(gSlider.value), Number(bSlider.value))
  RGBDiv.style.backgroundColor = "rgb(128, 128, 128)";
}

