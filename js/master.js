//random background option
let backgroundOption = true;
//variable to control the interval
let backgroundInterval;
//local storage background
let bgImgUrl = localStorage.getItem("background-option");//get image url form loacl
if (bgImgUrl != null) {

  if (bgImgUrl === 'true') {

    backgroundOption = true;
  }
  else {
    backgroundOption = false;
  }
  //remove active all span
  document.querySelectorAll('.randomBackground span').forEach(element => {
    element.classList.remove("active");
  });
  if (bgImgUrl === 'true') {
    document.querySelector(".randomBackground .yes").classList.add("active");
  } else {
    document.querySelector(".randomBackground .no").classList.remove("active");
  }
}
//local storage color
let maincolors = localStorage.getItem("color-option");//test local storage
if (maincolors !== null) {
  document.documentElement.style.setProperty("--main-color", maincolors);
  console.log("loccal storage is not empety");
}


//icons
document.querySelector(".icons .bxs-cog").onclick = function () {
  this.classList.toggle("bx-spin");
  //open
  document.querySelector(".setting-box").classList.toggle("open")
};
//switch colors
const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    //set color on local storage
    localStorage.setItem('color-option', e.target.dataset.color);
handleActive(e);


  })
});
//switch random-background 
const randomBack = document.querySelectorAll(".randomBackground span");
randomBack.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true)
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false)
    }
  })
});



//select landing page element
let landingPage = document.querySelector(".landingPage");

//get arry of image
let imgsArray = ["building-glass-facade-during-daytime.jpg", "toned-image-modern-office-buildings-central-hong-kong.jpg", "flat-lay-arrangement-different-architectural-objects-with-copy-space.jpg"];

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change background image url
      landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
    }, 3000);
  }
}
//select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {

  let skillsTop = ourSkills.offsetTop;

  let skillsHeight = ourSkills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > (skillsTop + skillsHeight - windowHeight)) {
    let allSkills = document.querySelectorAll(".skillBox .skillProgess span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}
//create popup with the image
let ourGallery=document.querySelectorAll(".cartImage img");
ourGallery.forEach(img =>{
  img.addEventListener('click',(e) =>{
    //create overlay element
    let overlay = document.createElement("div");
    //add class to overlay
    overlay.className='popup-overlay';
    //append overlay to body
    document.body.appendChild(overlay);
    //create popups
    let popupBox = document.createElement("div");
    popupBox.className ='popup-box';
    // output alt
    if(img.alt !== null){
      let imageHeading = document.createElement("h3");
      imageHeading.className="imageHeading";
      let imageText = document.createTextNode(img.alt);
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }
    //create image
    let poupImage=document.createElement('img');
    poupImage.src = img.src;
    popupBox.appendChild(poupImage);
    document.body.appendChild(popupBox);
    //create close span
    let closeButton = document.createElement('span');
    let closeButtonText = document.createTextNode("x");
    closeButton.appendChild(closeButtonText);
    closeButton.className="closeButton";
    popupBox.appendChild(closeButton);
   });
});
//close popup
document.addEventListener("click",function (e){
  if(e.target.className == "closeButton"){
    //remove current popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
  }
})
//select bullets or links
const allBullets = document.querySelectorAll(".navBullets .bullet");
const allLinks=document.querySelectorAll(".links a");
function scrollIntoView1(elements){
elements.forEach(ele =>{
  ele.addEventListener("click",(e) =>{
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
}
scrollIntoView1(allBullets);
scrollIntoView1(allLinks);
//handle active
function handleActive(ev){
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });
  //add active class on self
  ev.target.classList.add("active");
}
//show bullets
let bulletSpan = document.querySelectorAll(".bulletsOption span");
let bulletNavbar = document.querySelector(".navBullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if(bulletLocalItem !== null){
 bulletSpan.forEach(span =>{
  span.classList.remove("active");
 });
 if(bulletLocalItem === 'block'){
  bulletNavbar.style.display= 'block';
  document.querySelector(".bulletsOption .yes").classList.add("active");
 }else {
  bulletNavbar.style.display ='none';
  document.querySelector(".bulletsOption .no").classList.add("active");

 }
}
bulletSpan.forEach(span =>{
  span.addEventListener("click", (e) =>{
    if (span.dataset.display === "show"){
       bulletNavbar.style.display= 'block';
       localStorage.setItem("bullets-option",'block')
      }
       else {
        bulletNavbar.style.display ='none';
        localStorage.setItem("bullets-option",'none')
       }
       handleActive(e);
  })
})
//reset button
document.querySelector(".reset-option").onclick =function(){
 // this.localStorage.clear(); clear all values are storage in localstorage
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
}
//toggle menu
let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".header-area .links");
togglebtn.onclick = function (e){
  //stop  Propagation
  e.stopPropagation();
  togglebtn.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
}
//click anywhere outside menu and toggglebtn
document.addEventListener("click", (e) =>{
 if(e.target !== togglebtn && e.target !== tlinks){
  //check if menu is open
if(tlinks.classList.contains("open")){
  togglebtn.classList.toggle("menu-active")
  tlinks.classList.toggle("open")
  console.log("menu is open")
}
 }
})
//stop propagation on menu
tlinks.onclick= function (e){
  e.stopPropagation();
}