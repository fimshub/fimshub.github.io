let avgColors = [
  [
    [100., 40., 30.], "tomato"
  ],
  [
    [125., 65., 63.], "tomato"
  ],
  [
    [123., 38., 24.], "tomato"
  ],
  [
    [80., 105., 60.], "pepper"
  ],
  [
    [67., 80., 40.], "pepper"
  ],
  [
    [107., 116., 81.], "pepper"
  ],
  [
    [29., 37., 13.], "pepper"
  ],
  [
    [39., 64., 9.], "pepper"
  ],
  [
    [140., 101., 11.], "lemon"
  ],
  [
    [124., 114., 30.], "lemon"
  ],
  [
    [114., 92., 44.], "lemon"
  ],
  [
    [132., 107., 59.], "lemon"
  ],
  [
    [49., 27., 22.], "eggplant"
  ],
  [
    [41., 41., 35.], "eggplant"
  ],
  [
    [137., 85., 45.], "orange"
  ],
  [
    [197., 124., 49.], "orange"
  ],
  [
    [140., 93., 28.], "orange"
  ],
  [
    [168., 116., 89.], "orange"
  ],
  [
    [145., 74., 9.], "orange"
  ],
  [
    [100., 72., 43.], "potato"
  ],
  [
    [123., 117., 93.], "potato"
  ],
  [
    [95., 77., 31.], "potato"
  ],
  [
    [118., 83., 57.], "potato"
  ],
  [
    [90., 85., 57.], "potato"
  ],
  [
    [87., 68., 24.], "potato"
  ]
];
let foodItems = ["Tomato", "Pepper", "Lemon", "Eggplant", "Orange", "Potato"];
let ims = [
  [0, 0, 2, 0, 3, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 4, 0],
  [0, 0, 4, 0, 1, 0],
  [2, 2, 0, 3, 0, 0],
  [3, 1, 0, 3, 0, 0],
  [4, 0, 0, 2, 0, 0],
  [0, 2, 0, 3, 0, 0],
  [1, 2, 0, 3, 0, 0],
  [0, 0, 0, 0, 0, 5],
  [1, 1, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0]
];
let rec_fried_eggplant = {
  "eggplant": 3,
  "pepper": 2,
  "tomato": 5,
  "garlic clove": 5,
  "tbsp vinegar": 1,
  "cup cooking oil": 1
};
let rec_orangeade = {
  "orange": 3,
  "lemon": 1
};
let rec_mashed_potatoes = {
  "potato": 4,
  "cup butter": 0.5,
  "cup milk": 1,
  "pinch salt": 1
};

let glob_recipes = [rec_fried_eggplant, rec_orangeade, rec_mashed_potatoes];
let recipeList = ["Fried Eggplant", "Orangeade", "Mashed Potatoes"];