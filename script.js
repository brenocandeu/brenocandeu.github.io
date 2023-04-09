const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["the web.", "mobile devices.", "desktop applications."];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});


const menuLinks = document.querySelectorAll('nav ul li a');
const navbar = document.querySelector('nav');

menuLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const section = document.querySelector(link.getAttribute('href'));
    section.scrollIntoView({ behavior: "smooth" });
    section.classList.add('scroll-up');
    setTimeout(() => {
      section.classList.remove('scroll-up');
    }, 500);
    const navbarHeight = navbar.offsetHeight + 60; // adiciona 20px
    const sectionTop = section.offsetTop - navbarHeight;
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth"
    });
  });
});

// Get all the Meters
const meters = document.querySelectorAll('svg[data-value] .meter');

meters.forEach((path) => {
  // Get the length of the path
  let length = path.getTotalLength();
  
  // console.log(length);
  
  // Just need to set this once manually on the .meter element and then can be commented out
  // path.style.strokeDashoffset = length;
  // path.style.strokeDasharray = length;

  // Get the value of the meter
  let value = parseInt(path.parentNode.getAttribute('data-value'));
  // Calculate the percentage of the total length
  let to = length * ((100 - value) / 100);
  // Trigger Layout in Safari hack https://jakearchibald.com/2013/animated-line-drawing-svg/
  path.getBoundingClientRect();
  // Set the Offset
  path.style.strokeDashoffset = Math.max(0, to);   path.nextElementSibling.textContent = `${value}%`;
});

var scene = document.querySelector('.scene');
var parallax = new Parallax(scene);

