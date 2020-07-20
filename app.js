
//========================= Global var=================
var goatsArray = [];
var totalClicks = 0;

//========================= Function Definitions=================
function Goat(imgName, src){
  this.liveClicks = 0;
  this.imgName = imgName;
  this.imgSrc = src;

  goatsArray.push(this);
}

//============================= Functions=======================
function handleClickonGoat(event){
  console.log(event.target);
  if(event.target.tagname === 'IMG'){
    totalClicks++
  }
  // increment goat clicks
    for(var goatIndex = 0; goatIndex < goatsArray.length; goatIndex++);
    if(goatArray[goatIndex].imgSrc === event.target.getAttribute('src')){
      goatsArray[goatIndex].liveClicks++;
    }
    displayGoats();

    if(totalclicks === 4)
    var goatList = document.getElementById('list-of-goats');
    goatList.innerHTML = '';
    listOfGoats.removeEventListener('click', handleClickonGoat);
    // display new goats
} else{
    console.log('You didn\'t click an image');
}


function displayGoats(){
  // to get a random goat we need a random index
  var index1 = Math.floor(Math.random() * goatsArray.length);
  var index2 = Math.floor(Math.random() * goatsArray.length);
  var newGoat1 = goatsArray[index1];
  var newGoat2 = goatsArray[index2];
  //TODO: make that random

  var goatList = document.getElementById('list-of-goats');
  goatList.innerHTML = '';
  newGoat1.renderGoat();
  newGoat2.renderGoat();
}


Goat.prototype.renderGoat() {
  var target = document.getElementById('list-of-goats');
  var goatHomeLi = document.createElement('li');
  var goatImg = document.createElement('img');
  goatImg.src = this.imgSrc;
  goatImg.alt = this.imgName;
  goatHomeLi.appendChild(goatImg);   

  var goatText = document.createElement('p');
  goatText.textContent = this.imgName;
  goatHomeLi.appendChild(goatText);
  target.appendChild(goatHomeLi);
}

//========================= Event Listener =================
var listOfGoats = document.getElementById('list-of-goats');
listOfGoats.addEventListener('click', handleClickonGoat);

//========================= Function Calls =================
new Goat('Sweater Goat', 'images/sweater-goat.jpg');
new Goat('Flying Goat', 'images/flying-goat.jpg');
new Goat('Boat Goat', 'images/boat-goat.jpg');
new Goat('Sassy Goat', 'images/sassy-goat.jpg');

/*
Event listener on the img tags with type click and an event handler
Event handler:
  - add 1 to the clicks of the goat image we clicked on
  - TODO: check if image's src attribute matches the obj
  - showClicks
  - display 2 new goat images (displayGoats())

displayGoats(): display 2 new goat iamges
  - pick 2 goats - randomly based on array indexes
  - make the first two disappear, reset the content.
  - display them(renderGoat():)

showClicks() :Show clicks per goat, live (live || after x clicks)
  - Show each click in a list
  - use the constuctor's instances for the info

CSS:
  - Set all image height and width the same

HTML:
  - 

TODO: on day 13 we will differentiate between live clicks and stored clicks.
*/