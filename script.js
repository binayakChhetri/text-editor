// Storing all the required elelments in the variables
const writingSection = document.querySelector("#text-area");

const alignLeft = document.querySelector("#align-left");
const alignCenter = document.querySelector("#align-center");
const alignRight = document.querySelector("#align-right");

const boldButton = document.querySelector("#bold");
const italicButton = document.querySelector("#italic");
const underlineButton = document.querySelector("#underline");

const fontSize = document.querySelector("#font-size");

let totalWords = document.querySelector("#total-words");
let totalLetters = document.querySelector("#total-letters");
let totalSpaces = document.querySelector("#total-spaces");

const chooseFont = document.querySelector("#font-family");

// Defining the font names in an array

const fonts = [
  "Verdana",
  "Geneva",
  "Tahoma",
  "sans-serif",
  "Impact",
  "Haettenschweiler",
  "Arial",
  "Narrow Bold",
  "Courier New",
  "Courier",
  "monospace",
  "Franklin Gothic Medium",
  "Arial Narrow",
  "Lucida Sans",
  "Times New Roman",
  "Georgia",
  "Times",
];

// Adding all the fonts to the select element for the selection

window.addEventListener("load", () => {
  fonts.forEach((font) => {
    const fontOptions = document.createElement("option");
    fontOptions.textContent = font;
    chooseFont.appendChild(fontOptions);
  });
});

// storing the color choosing button in variable

const colorChoosingBtn = document.querySelector("#color");

// Creating object for tracking all the texts that the user writes

let tracker = {
  text: "",
  totalWrds: 0,
  totalLttrs: 0,
  totalSpcs: 0,
  totaVwls: 0,
  totalCons: 0,

  belowZero: true,
};

// Adding event listener to the writing section

writingSection.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") {
    eraseLtrsWrds();
  } else if (e.key.length === 1) {
    countTotalWords(e);
    countTotalLetters(e);
  }
});

// Defining the funciton that counts the numbers of words
function countTotalWords(e) {
  let tWords = 1;
  let letter = e.key;

  tracker.text += letter;

  for (i of tracker.text) {
    if (i === " ") {
      tWords += 1;
    }
  }

  tracker.totalWrds = tWords;
  totalWords.textContent = tracker.totalWrds;

  // Here we will also calculate the total spaces in the text
  totalSpaces.textContent = tWords - 1;
}

// Defining the function that counts the total number of letters

function countTotalLetters(e) {
  tracker.totalLttrs = tracker.text.length;
  totalLetters.textContent = tracker.totalLttrs;
}

// Defining the function that erase the text and updates the total letters and words
function eraseLtrsWrds() {
  // Letters

  // This updates the text by removing the last letter from the text
  let updateText = tracker.text.slice(0, tracker.text.length - 1);
  tracker.text = updateText;

  tracker.totalLttrs = tracker.text.length;
  totalLetters.textContent = tracker.totalLttrs;

  // Words

  //This checks the mumber of words in the textarea and as per the need updates it
  let tWords = 1;

  for (i of tracker.text) {
    if (i === " ") {
      tWords += 1;
    }
  }

  tracker.totalWrds = tWords;
  totalWords.textContent = tracker.totalWrds;

  // Here we will also update the total spaces in the text
  totalSpaces.textContent = tWords - 1;

  // This code sets the total letters and word's value to zero if the textarea has nothing in it
  if (writingSection.value == "") {
    totalWords.textContent = 0;
    tracker.totalLttrs = 0;
    totalLetters.textContent = tracker.totalLttrs;
    totalSpaces.textContent = 0;
  }
}

// Adding event listner to all the text aligining buttons
const textAlignButtons = [alignLeft, alignCenter, alignRight];

textAlignButtons.forEach((button) => {
  button.addEventListener("click", changeTextAlignment);
});

function changeTextAlignment() {
  if (this.id == "align-left") {
    writingSection.classList.remove("right");
    writingSection.classList.remove("center");
    writingSection.classList.add("left");

    transitionAlignBtns(this);
  } else if (this.id == "align-center") {
    writingSection.classList.remove("right");
    writingSection.classList.remove("left");
    writingSection.classList.add("center");

    transitionAlignBtns(this);
  } else {
    writingSection.classList.remove("center");
    writingSection.classList.remove("left");
    writingSection.classList.add("right");

    transitionAlignBtns(this);
  }
}

// Adding event listners ot the bold, italic and underline button
const biu = [boldButton, italicButton, underlineButton];

biu.forEach((button) => {
  button.addEventListener("click", biuFunction);
});

function biuFunction() {
  switch (this.id) {
    case "bold":
      writingSection.classList.toggle("bold");
      this.classList.toggle("bg");
      break;

    case "italic":
      writingSection.classList.toggle("italic");
      this.classList.toggle("bg");

      break;

    case "underline":
      writingSection.classList.toggle("underline");
      this.classList.toggle("bg");

      break;
  }
}

// This function transition the align buttons
function transitionAlignBtns(button) {
  let removeButton = textAlignButtons.filter((btn) => {
    return btn.classList == "bg";
  });

  button.classList.add("bg");

  console.log(textAlignButtons);
  console.log(removeButton);

  removeButton[0].classList.remove("bg");
}

// Adding event listner to the font size changing button

fontSize.addEventListener("change", changeFontSize);

function changeFontSize() {
  if (fontSize.value <= 0) {
    alert("Font size less than or equal to zero are not allowed");
  } else {
    writingSection.style.fontSize = fontSize.value + "px";
  }
}

// Adding event listner to the color choosing button
colorChoosingBtn.addEventListener("change", changeColor);

// This function changes the color of the text
function changeColor() {
  writingSection.style.color = colorChoosingBtn.value;
}

// Adding event to the choose font button
chooseFont.addEventListener("change", changeFontFamily);

//Default font family setting
writingSection.style.fontFamily = chooseFont.value;

// This funciton changes to font family
function changeFontFamily() {
  writingSection.style.fontFamily = chooseFont.value;
}
