const graceHover = document.querySelector(".grace-hover");
const graceLetters = document.querySelectorAll(".grace-letter");
const hoverLetters = document.querySelectorAll(".hover-letter");


/* =========================================
   SETTINGS
========================================= */

// Main "Hi, I'm Grace" curve
const graceRadius = 190;
const graceArcDegrees = 120;

// Smaller instruction curve
const hoverRadius = 222;
const hoverArcDegrees = 126;

// Font size of Hi, I'm Grace
const graceFontSize = 42;


/* =========================================
   HI, I'M GRACE — CURVED
========================================= */

function curveGraceLetters() {

  const totalLetters = graceLetters.length;

  graceLetters.forEach((letter, index) => {

    const progress =
      index / (totalLetters - 1);

    const angleDegrees =
      -90 -
      graceArcDegrees / 2 +
      progress * graceArcDegrees;

    const angle =
      angleDegrees * (Math.PI / 180);


    // Position on an actual circle
    const x =
      Math.cos(angle) * graceRadius;

    const y =
      Math.sin(angle) * graceRadius;


    letter.style.left =
      `calc(50% + ${x}px)`;

    letter.style.top =
      `${y + graceRadius + 25}px`;


    // Rotate each letter with the circle
    const rotation =
      angleDegrees + 90;

    letter.style.transform =
      `translate(-50%, -50%) rotate(${rotation}deg)`;


    // Smooth stagger when returning to curve
    letter.style.transitionDelay =
      `${(totalLetters - index) * 10}ms`;

  });
}


/* =========================================
   HOVER TO GET TO KNOW ME — CURVED
========================================= */

function curveHoverLetters() {

  const totalLetters = hoverLetters.length;

  hoverLetters.forEach((letter, index) => {

    const progress =
      index / (totalLetters - 1);

    const angleDegrees =
      -90 -
      hoverArcDegrees / 2 +
      progress * hoverArcDegrees;

    const angle =
      angleDegrees * (Math.PI / 180);


    const x =
      Math.cos(angle) * hoverRadius;

    const y =
      Math.sin(angle) * hoverRadius;


    letter.style.left =
      `calc(50% + ${x}px)`;

    /*
      This controls the vertical padding
      between the two curved lines.
    */
    letter.style.top =
      `${y + hoverRadius + 72}px`;


    const rotation =
      angleDegrees + 90;

    letter.style.transform =
      `translate(-50%, -50%) rotate(${rotation}deg)`;

  });
}


/* =========================================
   MEASURE NATURAL STRAIGHT TEXT
========================================= */

function getStraightPositions() {

  const text = "Hi, I'm Grace";

  const graceStyle =
    window.getComputedStyle(graceLetters[0]);


  // Hidden text used only for measuring
  const measuringText =
    document.createElement("span");

  measuringText.textContent = text;

  measuringText.style.position = "absolute";
  measuringText.style.visibility = "hidden";
  measuringText.style.whiteSpace = "pre";
  measuringText.style.fontSize =
    `${graceFontSize}px`;
  measuringText.style.fontWeight = "bold";
  measuringText.style.lineHeight = "1";
  measuringText.style.fontFamily =
    graceStyle.fontFamily;

  document.body.appendChild(measuringText);


  const totalWidth =
    measuringText.getBoundingClientRect().width;

  measuringText.remove();


  const positions = [];


  /*
    Measure where the center of every
    individual character naturally belongs.
  */

  for (
    let index = 0;
    index < graceLetters.length;
    index++
  ) {

    const before =
      document.createElement("span");

    const throughCurrent =
      document.createElement("span");


    before.textContent =
      text.slice(0, index);

    throughCurrent.textContent =
      text.slice(0, index + 1);


    [before, throughCurrent].forEach((element) => {

      element.style.position = "absolute";
      element.style.visibility = "hidden";
      element.style.whiteSpace = "pre";

      element.style.fontSize =
        `${graceFontSize}px`;

      element.style.fontWeight = "bold";
      element.style.lineHeight = "1";

      element.style.fontFamily =
        graceStyle.fontFamily;

      document.body.appendChild(element);

    });


    const beforeWidth =
      before.getBoundingClientRect().width;

    const currentWidth =
      throughCurrent.getBoundingClientRect().width;


    const characterWidth =
      currentWidth - beforeWidth;


    const x =
      beforeWidth +
      characterWidth / 2 -
      totalWidth / 2;


    positions.push(x);


    before.remove();
    throughCurrent.remove();
  }


  return positions;
}


/* =========================================
   HI, I'M GRACE — STRAIGHT
========================================= */

function straightenGraceLetters() {

  const positions =
    getStraightPositions();


  graceLetters.forEach((letter, index) => {

    const x =
      positions[index];


    // Keeps the flowing animation
    letter.style.transitionDelay =
      `${index * 10}ms`;


    // Natural typography spacing
    letter.style.left =
      `calc(50% + ${x}px)`;

    letter.style.top =
      "55px";

    letter.style.transform =
      "translate(-50%, -50%) rotate(0deg)";

  });
}


/* =========================================
   STARTING POSITION
========================================= */

curveGraceLetters();
curveHoverLetters();


/* =========================================
   HOVER OPEN
========================================= */

graceHover.addEventListener(
  "mouseenter",
  () => {

    straightenGraceLetters();

  }
);


/* =========================================
   HOVER CLOSE
========================================= */

graceHover.addEventListener(
  "mouseleave",
  () => {

    curveGraceLetters();

  }
);