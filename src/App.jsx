import { BrowserRouter } from "react-router-dom";
import { About, Contact, Hero, Navbar, Tech, StarsCanvas, Three, } from "./components";


const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary '>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>

        </div>

        <Navbar />
        <Three />
        <Hero />
        <About />
        <Tech />
        <Contact />
        <StarsCanvas />

      </div>
    </BrowserRouter>
  );
}

//mouse animation


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#87135e",
  " #921a7f",
  "#98219d",
  "#8a2aa8",
  "#7b33b3",
  "#6d3dbe",
  "#5e48c8",
  "#5457d3",
  "#607cde",
  "#6da1e9",
  "#7bc6f4",
  "#8ae9ff"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;

});

function animateCircles() {

  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
export default App;



