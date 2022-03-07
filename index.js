// spaghetti

// variables
const HEXImport = document.getElementById("importButton");
const hexText = document.getElementById("HEXText");

const rSlider = document.getElementById("rSlider");
const gSlider = document.getElementById("gSlider");
const bSlider = document.getElementById("bSlider");

const hSlider = document.getElementById("hSlider")
const sSlider = document.getElementById("sSlider")
const lSlider = document.getElementById("lSlider")

const aSlider = document.getElementById("aSlider");
const aSpan = document.getElementById("alphaSpan")

const rSpan = document.getElementById("redSpan")
const gSpan = document.getElementById("greenSpan")
const bSpan = document.getElementById("blueSpan")

const hSpan = document.getElementById("hueSpan")
const sSpan = document.getElementById("saturationSpan")
const lSpan = document.getElementById("lightnessSpan")

const randomButton = document.getElementById("randomColorButton");

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

function HEXToRGB(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return [parseInt(result[1], 16), ",", parseInt(result[2], 16), ",", parseInt(result[3], 16)].join("");
}

function rgbConverter(r, g, b, type) {
  if (type == "hex") {
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
  } else {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h), Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)), Math.round((100 * (2 * l - s)) / 2)]
  }
}

function HSLToRGB(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
}

function sliderUpdate(total, sliderObject, spanObject) {  
  if (total == true) {
    const Sliders = document.getElementsByClassName("slider")
    const Spans = document.getElementsByClassName("sliderSpan")
    for (let SpanIndex in Spans) {
      if (Spans[SpanIndex].id !== "undefined" && Spans[SpanIndex].id !== undefined) {
        let CurrentSlider = Sliders[SpanIndex];
        let CurrentSpan = Spans[SpanIndex];
        let colonPosition = CurrentSpan.innerHTML.indexOf(":") + 1;

        CurrentSpan.innerHTML = CurrentSpan.innerHTML.substring(0, colonPosition) + " " + CurrentSlider.value;
        ChangeColor(RGBDiv, ["rgba(", rSlider.value, ",", gSlider.value, ",", bSlider.value, ",", aSlider.value, ")"].join(""));
      }
    }
    hexText.innerHTML = "HEX: " + rgbConverter(Number(rSlider.value), Number(gSlider.value), Number(bSlider.value), "hex");
  } else {
    let colonPosition = spanObject.innerHTML.indexOf(":") + 1;
    let isRGBActive = false;
    switch(sliderObject.id) {
      //this was broken for a long time because i did not add break at the end :skull:
      case "rSlider": case "gSlider": case "bSlider":
        const convertedRGB = rgbConverter(rSlider.value, gSlider.value, bSlider.value, "hsl");
        isRGBActive = true;
        hSlider.value = convertedRGB[0];
        sSlider.value = convertedRGB[1];
        lSlider.value = convertedRGB[2];
        isRGBActive = false;
        break;
      case "hSlider": case "sSlider": case "lSlider":
        if (isRGBActive == false) {
          const convertedHSL = HSLToRGB(hSlider.value, sSlider.value, lSlider.value);
          rSlider.value = convertedHSL[0];
          gSlider.value = convertedHSL[1];
          bSlider.value = convertedHSL[2];
          break;
        }
    }
    spanObject.innerHTML = spanObject.innerHTML.substring(0, colonPosition) + " " + sliderObject.value  
    sliderUpdate(true)
  }
}

sliderUpdate(true);

// event stuff
rSlider.oninput = function(){sliderUpdate(false, rSlider, rSpan)}; 
gSlider.oninput = function(){sliderUpdate(false, gSlider, gSpan)}; 
bSlider.oninput = function(){sliderUpdate(false, bSlider, bSpan)};

hSlider.oninput = function(){sliderUpdate(false, hSlider, hSpan)}; 
sSlider.oninput = function(){sliderUpdate(false, sSlider, sSpan)}; 
lSlider.oninput = function(){sliderUpdate(false, lSlider, lSpan)};

aSlider.oninput = function(){sliderUpdate(false, aSlider, aSpan)};

HEXImport.onclick = function() {
  const HEXInput = document.getElementById("HEXInput");
  const ConvertedHEX = HEXToRGB(HEXInput.value)
  const SplitRGB = ConvertedHEX.split(",")
  RGBDiv.style.backgroundColor = "rgb(" + ConvertedHEX + ")";

  rSlider.value = SplitRGB[0]; sliderUpdate(false, rSlider, rSpan);
  gSlider.value = SplitRGB[1]; sliderUpdate(false, gSlider, gSpan);
  bSlider.value = SplitRGB[2]; sliderUpdate(false, bSlider, bSpan);

  sliderUpdate(true);
}

randomButton.onclick = function() {
  ChangeColor(RGBDiv, randomRGB());
  const backgroundRGB = RGBDiv.style.backgroundColor.substring(4, RGBDiv.style.backgroundColor.length - 1).split(", ");
  rSlider.value = backgroundRGB[0]; sliderUpdate(false, rSlider, rSpan);
  gSlider.value = backgroundRGB[1]; sliderUpdate(false, gSlider, gSpan);
  bSlider.value = backgroundRGB[2]; sliderUpdate(false, bSlider, bSpan);
  console.debug(backgroundRGB[1]);
}