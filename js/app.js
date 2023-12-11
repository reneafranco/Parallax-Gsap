const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,  yValue = 0;

let rotateDegree = xValue / (window.innerWidth / 2) * 20;


function update(cursorPosition){
    parallax_el.forEach((el) => {

        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotatedSpeed = el.dataset.rotation;
    
        
        let isInLeft =  parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft *  0.1;
    
       
    
    
        el.style.transform = `perspective(2300px) translateZ(${zValue * speedz}px)
        rotateY(${rotateDegree * rotatedSpeed}deg)
        translateX(calc(-50% + ${-xValue * speedx}px))
        translateY(calc(-50% + ${yValue * speedy}px))`;
       })
}
update(0);

window.addEventListener("mousemove", (e)=>{

    if(timeline.isActive()) return;
     
    xValue = e.clientX - innerWidth / 2;
    yValue = e.clientY - innerHeight / 2;

    update(xValue);
  
});


// GSAP

let timeline = gsap.timeline();
Array.from(parallax_el)
.filter(el => !el.classList.contains("text"))
.forEach((el) =>{
    
timeline.from(el,
{
    top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
    duration : 3,
    ease: "power3.out"
 
},
"1"
)
});


// Text Animation 
timeline.from(".text h1",{
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top,
    duration: 2, 
}, "2.5").from(".text h2", {
    y:-150,
    opacity:0,
    duration: 1.5
}, "3").from(".hide", {
    opacity:0,
    duration: 1.5,

}, "3");

// timeLine.from(".bg-img ",{

//         top: `${document.querySelector(".bg-img").offsetHeight / 2 - 200}px`,
//     duration : 1.5,
     
// },
// "1"
// )