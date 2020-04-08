let imgPathBase = '/images/';
let imgs = [];
let consoleGUI = [];
let bgImg;
let toDisplay = 0;
let topColor;
let white;
let thickFont;
let regFont;
let currentStatus = [0, 0, 0, 0, 0, 0];

let calibrated = false;

let selectedRecipe = null;

let imgHeight;
let imgWidth;

function preload() {
  var i;
  for (i = 1; i < 13; i++) {
    imgs.push(loadImage(imgPathBase + 'img' + i + '.jpg'));
  }
  bgImg = loadImage(imgPathBase + 'background.jpg');
  thickFont = loadFont('/fonts/Montserrat-Bold.ttf');
  regFont = loadFont('/fonts/Montserrat-Medium.ttf');
}

function setup() {
  setToken();
  setInterval(setToken, 1200000);
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  topColor = color(0);
  topColor.setAlpha(75);
  white = color(255);
  white.setAlpha(255);
  var toHTMLimg = toDisplay + 1
  document.getElementById("currDisplay").src = imgPathBase + 'img' + toHTMLimg + '.jpg';
}

function draw() {
  image(bgImg, 0, 0)
  noStroke();
  fill(topColor);
  imgWidth = imgs[toDisplay].width * 0.69 * min(windowWidth / 1680, windowHeight / 979)
  imgHeight = imgs[toDisplay].height * 0.74 * min(windowWidth / 1680, windowHeight / 979);
  rect(0, 0, windowWidth, imgHeight + 40);
  image(imgs[toDisplay], windowWidth / 7 * 4 - imgs[toDisplay].width * 0.69 * min(windowWidth / 1680, windowHeight / 979) / 2, 20, imgWidth, imgHeight, imgs[toDisplay].width * 0.15, imgs[toDisplay].height * 0.10, imgs[toDisplay].width * 0.69, imgs[toDisplay].height * 0.74);
  fill(255);
  textAlign(CENTER, CENTER)
  textFont(thickFont);
  textSize(80 * min(windowWidth / 1680, windowHeight / 979));
  text('Fridge View', windowWidth / 7 * 1.4, imgHeight / 5 * 1.75 + 20);
  textFont(regFont);
  textSize(50 * min(windowWidth / 1680, windowHeight / 979));
  text('View #' + toDisplay, windowWidth / 7 * 1.4, imgHeight / 5 * 3.25 + 20);
  dispViews();
  dispButtons();
  dispConsole();
  dispRecipeConsole();
  if (selectedRecipe != null) {
    dispRecipeInfo(selectedRecipe);
  }
  dispRecipeList();
}

function dispConsole() {
  topColor.setAlpha(35);
  fill(topColor);
  rect(windowWidth / 3, imgHeight + 60, windowWidth / 5 - 20, windowHeight - (imgHeight + 60) - 20)

  fill(255);

  textAlign(CENTER, CENTER);
  textFont(regFont);
  textSize(30 * min(windowWidth / 1680, windowHeight / 979));
  text('Console', windowWidth / 3 + (windowWidth / 5 - 20) / 2, (windowHeight - (imgHeight + 60) - 20) / 12 + imgHeight + 60);

  for (var i = 3; i < consoleGUI.length + 3; i++) {
    if (i > 3 + 6) {
      white.setAlpha(255 - 255 / 5 * (i - 9));
    }
    fill(white)
    textSize(20 * min(windowWidth / 1680, windowHeight / 979));
    text(consoleGUI[consoleGUI.length - 1 - (i - 3)], windowWidth / 3 + (windowWidth / 5 - 20) / 2, (windowHeight - (imgHeight + 60) - 20) / 15 * ((13 + 3) - i) + imgHeight + 60);
    white.setAlpha(255);
  }

  topColor.setAlpha(75);
}

function dispRecipeList() {
  var ULC = [windowWidth / 3 + windowWidth / 5 + windowWidth / 3.2, imgHeight + 60];
  var dims = [windowWidth * 37 / 240 - 20, windowHeight - (imgHeight + 60) - 20];

  topColor.setAlpha(35);
  fill(topColor);
  rect(ULC[0], ULC[1], dims[0], dims[1]);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont(regFont);
  textSize(30 * min(windowWidth / 1680, windowHeight / 979));
  text('Recipes', ULC[0] + dims[0] / 2, ULC[1] + dims[1] / 12);
  topColor.setAlpha(20);
  for (var i = 0; i < recipeList.length; i++) {
    if (selectedRecipe == i) {
      topColor.setAlpha(0);
    }
    fill(topColor);
    rect(ULC[0] + dims[0] / 20, ULC[1] + dims[1] / 6 * (i + 1), dims[0] / 20 * 18, dims[1] / 6 - 10);
    fill(255);
    textSize(20 * min(windowWidth / 1680, windowHeight / 979));
    text(recipeList[i], ULC[0] + dims[0] / 20, ULC[1] + dims[1] / 6 * (i + 1), dims[0] / 20 * 18, dims[1] / 6 - 10);
    topColor.setAlpha(20);
  }

  topColor.setAlpha(75);
}

function dispRecipeConsole() {
  var ULC = [windowWidth / 3 + windowWidth / 5, imgHeight + 60];
  var dims = [windowWidth / 3.2 - 20, windowHeight - (imgHeight + 60) - 20];

  topColor.setAlpha(35);
  fill(topColor);
  rect(ULC[0], ULC[1], dims[0], dims[1]);
  fill(255);
  textAlign(CENTER, CENTER);
  textFont(regFont);
  textSize(30 * min(windowWidth / 1680, windowHeight / 979));
  text('Recipe Information', ULC[0] + dims[0] / 2, ULC[1] + dims[1] / 12)

  topColor.setAlpha(75);
}

function dispRecipeInfo(num) {
  var ULC = [windowWidth / 3 + windowWidth / 5, imgHeight + 60];
  var dims = [windowWidth / 3.2 - 20, windowHeight - (imgHeight + 60) - 20];

  var somethingMissing = false;

  fill(255);
  textAlign(CENTER, CENTER);
  textFont(regFont);
  textSize(25 * min(windowWidth / 1680, windowHeight / 979));
  text('Required', ULC[0] + dims[0] / 4, ULC[1] + dims[1] / 12 * 2.25);
  textSize(17 * min(windowWidth / 1680, windowHeight / 979));
  var countInternal = 3.25;
  Object.entries(glob_recipes[num]).forEach(([key, value]) => {
    var textToDisp = value + "x " + key;
    text(textToDisp, ULC[0] + dims[0] / 4, ULC[1] + dims[1] / 12 * countInternal)
    countInternal += 1;
  })
  textSize(25 * min(windowWidth / 1680, windowHeight / 979));
  text('Missing', ULC[0] + dims[0] / 4 * 3 - 10, ULC[1] + dims[1] / 12 * 2.25);
  textSize(17 * min(windowWidth / 1680, windowHeight / 979));
  var countInternal = 3.25;
  var missing = missing_ingredients(currentStatus, num)
  Object.entries(missing).forEach(([key, value]) => {
    if (value != 0) {
      somethingMissing = true;
      var textToDisp = value + "x " + key;
      text(textToDisp, ULC[0] + dims[0] / 4 * 3 - 10, ULC[1] + dims[1] / 12 * countInternal)
      countInternal += 1;
    }
  })

  if (somethingMissing) {
    topColor.setAlpha(20);
    fill(topColor);
    rect(ULC[0] + dims[0] * 1 / 20, ULC[1] + dims[1] * 4 / 5, dims[0] * 18 / 20, dims[1] * 1 / 5 - (dims[0] * 1 / 20));
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(regFont);
    textSize(25 * min(windowWidth / 1680, windowHeight / 979));
    text('Add to Kroger\'s cart', ULC[0] + dims[0] * 1 / 20 + (dims[0] * 18 / 20) / 2, ULC[1] + dims[1] * 4 / 5 + (dims[1] * 1 / 5 - (dims[0] * 1 / 20)) / 2);
  }
  topColor.setAlpha(75);
}

function dispViews() {
  topColor.setAlpha(30);
  fill(topColor);
  rect(windowWidth / 7 * 5.087, 0, windowWidth, imgHeight + 40)
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 4; i++) {
      var ind = 4 * j + i;
      image(imgs[ind], windowWidth / 7 * 5.15 + windowWidth / 7 * 1.85 / 3 * j, 20 + (imgHeight / 4 + imgHeight / 60) * i, imgWidth / 4, imgHeight / 5, imgs[ind].width * 0.15, imgs[ind].height * 0.10, imgs[ind].width * 0.69, imgs[ind].height * 0.74);
    }
  }
  topColor.setAlpha(75);
}

function dispButtons() {
  //Scan + Calibrate Buttons
  topColor.setAlpha(35);
  fill(topColor);
  rect(20, imgHeight + 60, windowWidth / 3 - 40, (windowHeight - (imgHeight + 40)) / 3 - 40);
  rect(20, imgHeight + 60 + (windowHeight - (imgHeight + 40)) / 3 - 20, windowWidth / 3 - 40, (windowHeight - (imgHeight + 40)) / 3 * 2 - 20);
  fill(255);
  textFont(regFont);
  textSize(65 * min(windowWidth / 1680, windowHeight / 979));
  textAlign(CENTER, CENTER)
  text('Calibrate', windowWidth / 6, imgHeight + 60 + ((windowHeight - (imgHeight + 40)) / 3 - 40) / 2);
  text('Scan', windowWidth / 6, imgHeight + 60 + (windowHeight - (imgHeight + 40)) / 3 - 20 + ((windowHeight - (imgHeight + 40)) / 3 * 2 - 20) / 2);
  topColor.setAlpha(75);
}

function addToConsole(a) {
  consoleGUI.push(a);
  if (consoleGUI.length > 11) {
    consoleGUI.shift();
  }
}

function mouseClicked() {
  var mx = mouseX;
  var my = mouseY;

  //Check calibrate and Scan
  if (mouseX > 20 && mouseX < windowWidth / 3 - 20) {
    if (mouseY > imgHeight + 60 && mouseY < imgHeight + 60 + ((windowHeight - (imgHeight + 40)) / 3 - 40)) {
      //calibrate button is being used
      console.log("calibrate pressed");
      addToConsole("Calibration Complete.");
      calibrated = true;
    }
    if (mouseY > imgHeight + 60 + (windowHeight - (imgHeight + 40)) / 3 - 20 && mouseY < imgHeight + 60 + (windowHeight - (imgHeight + 40)) / 3 - 20 + (windowHeight - (imgHeight + 40)) / 3 * 2 - 20) {
      //scan button is being used
      console.log("scan pressed");
      if (calibrated == true) {
        addToConsole("Scanning...");
        sleep(3000).then(() => {
          addToConsole("Fridge contents:");
          currentStatus = ims[toDisplay];
          for (var i = 0; i < ims[toDisplay].length; i++) {
            if (ims[toDisplay][i] > 0) {
              var consoleAddition = ims[toDisplay][i] + "x " + foodItems[i];
              addToConsole(consoleAddition);
            }
          }
        })
      } else {
        addToConsole("Please Calibrate.")
      }
    }
  }

  var ULCRecList = [windowWidth / 3 + windowWidth / 5 + windowWidth / 3.2, imgHeight + 60];
  var dimsRecList = [windowWidth * 37 / 240 - 20, windowHeight - (imgHeight + 60) - 20];

  if (mouseX > ULCRecList[0] + dimsRecList[0] / 20 && mouseX < ULCRecList[0] + dimsRecList[0] / 20 * 18) {
    for (var i = 0; i < recipeList.length; i++) {
      if (mouseY > ULCRecList[1] + dimsRecList[1] / 6 * (i + 1) && mouseY < ULCRecList[1] + dimsRecList[1] / 6 * (i + 1) + dimsRecList[1] / 6 - 10) {
        selectedRecipe = i;
      }
    }
  }

  var ULCRecInf = [windowWidth / 3 + windowWidth / 5, imgHeight + 60];
  var dimsRecInf = [windowWidth / 3.2 - 20, windowHeight - (imgHeight + 60) - 20];

  if (mouseX > ULCRecInf[0] + dimsRecInf[0] * 1 / 20 && mouseX < ULCRecInf[0] + dimsRecInf[0] * 1 / 20 + dimsRecInf[0] * 18 / 20) {
    if (mouseY > ULCRecInf[1] + dimsRecInf[1] * 4 / 5 && mouseY < ULCRecInf[1] + dimsRecInf[1] * 4 / 5 + dimsRecInf[1] * 1 / 5 - (dimsRecInf[0] * 1 / 20)) {
      var missingList = missing_ingredients(currentStatus, selectedRecipe);
      console.log(missingList);
      addToCart(missingList, authToken);
      addToConsole("Items added to cart");
    }
  }

  //Check for view change
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 4; i++) {
      var ind = 4 * j + i;
      if (mx > windowWidth / 7 * 5.15 + windowWidth / 7 * 1.85 / 3 * j && mx < windowWidth / 7 * 5.15 + windowWidth / 7 * 1.85 / 3 * j + imgWidth / 4 && my > 20 + (imgHeight / 4 + imgHeight / 60) * i && my < 20 + (imgHeight / 4 + imgHeight / 60) * i + imgHeight / 5) {
        toDisplay = j * 4 + i;
        var toHTMLimg = toDisplay + 1
        document.getElementById("currDisplay").src = imgPathBase + 'img' + toHTMLimg + '.jpg';
        return;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function missing_ingredients(array, choice) {
  const food_pos = ["tomato", "pepper", "lemon", "eggplant", "orange", "potato"];
  var fried_eggplant = {
    "eggplant": 3,
    "pepper": 2,
    "tomato": 5,
    "garlic": 5,
    "bottle vinegar": 1,
    "bottle cooking oil": 1
  };
  var orangeade = {
    "orange": 3,
    "lemon": 1
  };
  var mashed_potatoes = {
    "potato": 4,
    "package butter": 1,
    "bottle milk": 1,
    "package salt": 1
  };

  recipes = [fried_eggplant, orangeade, mashed_potatoes]

  for (var i = 0; i <= 5; i++) {
    if (recipes[choice][food_pos[i]] != null) {
      recipes[choice][food_pos[i]] = recipes[choice][food_pos[i]] - array[i];
    };

    if (recipes[choice][food_pos[i]] < 0) {
      recipes[choice][food_pos[i]] = 0;
    };
  };

  return recipes[choice];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addToCart(dict, tok) {
  var productIDList = {
    "eggplant": "0000000004081",
    "pepper": "0000000004065",
    "tomato": "0000000004799",
    "orange": "0000000004012",
    "lemon": "0000000004053",
    "potato": "0000000004072",
    "package butter": "0001111089305",
    "bottle milk": "0001111040101",
    "package salt": "0002460001003",
    "garlic": "0000000004608",
    "bottle vinegar": "0001111003113",
    "bottle cooking oil": "0001111085605"
  }
  var items_list = [];

  // for (var key in dict) {
  //   productID = productIDList[key];
  //   quantity = dict[key];
  //
  //   item_dict = {
  //     "upc": productID,
  //     "quantity": quantity
  //   };
  //   items_list.push(item_dict);
  // };

  Object.entries(dict).forEach(([key, value]) => {
    var productID = productIDList[key];
    var quantity = value;
    if (quantity != 0) {
      var item_dict = {
        "upc": productID,
        "quantity": quantity
      };
      items_list.push(item_dict);
    }
  })

  console.log(items_list);

  var data = {
    "items": items_list
  }
  var json = JSON.stringify(data);

  var request = new XMLHttpRequest();
  request.open("PUT", "https://api.kroger.com/v1/cart/add", true);
  request.setRequestHeader('Accept', 'application/json');
  request.setRequestHeader('Authorization', 'Bearer ' + tok);
  request.send(json);
}