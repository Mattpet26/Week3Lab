//================= Global vars ===========================
var busArray = [];
var totalClicks = 0;


// ================= Function Definitions =================
function busImage(imageName, src){
  this.liveClicks = 0;
  this.imageName = imageName;
  this.imageSrc = src;
  this.totalClicks = 0;
  this.individualItemClick = 0;
  busArray.push(this);
}

//================================ Functions =======
busImage.prototype.renderImageHtml = function() {
  var target = document.getElementById('list-of-images');
  var busHomeLi = document.createElement('li');

  var busImg = document.createElement('img');
  busImg.src = this.imageSrc;
  busImg.alt = this.imageName;
  busHomeLi.appendChild(busImg);

  var imageTextp = document.createElement('p');
  imageTextp.textContent = this.imageName;
  busHomeLi.appendChild(imageTextp);

  target.appendChild(busHomeLi);
};


function handleClickOnImg(event) {
  console.log(event.target);
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    for (var imageIndex = 0; imageIndex < busArray.length; imageIndex++) {
      if (busArray[imageIndex].imageSrc === event.target.getAttribute('src')) {
        console.log(totalClicks);
        busArray[imageIndex].liveClicks++;
      }
    }

// this if statement controls the total amount of rounds a user is presented with.
    displayImages();
    if(totalClicks === 20){
      var busList = document.getElementById('list-of-images');
      busList.innerHTML = '';
      listOfImg.removeEventListener('click', handleClickOnImg);
    }
  }
}


function displayImages(){
  var index1 = Math.floor(Math.random() * busArray.length);
  var index2 = Math.floor(Math.random() * busArray.length);
  var index3 = Math.floor(Math.random() * busArray.length);

  var newImage1 = busArray[index1];
  var newImage2 = busArray[index2];
  var newImage3 = busArray[index3];
  // TODO: make that random

  var busList = document.getElementById('list-of-images');
  busList.innerHTML = '';
  newImage1.renderImageHtml();
  newImage2.renderImageHtml();
  newImage3.renderImageHtml();
}

// function displayVote(){
//   var target = document.getElementById('image-vote');
//   var list = document.createAttribute('li');
//   var totalVotesP = document.createAttribute('p');
//   totalVotesP.textContent = 'You voted ' + totalClicks + ' times. Thank you!';
//   list.appendChild(totalVotesP);
//   target.appendChild(list);
// }
// displayVote();

// ================ Function calls =================
// event listener on the img tags with type click and an event handler
// event handler:
// - add 1 to the clicks of the goat image we clicked on
//   - TODO: check if the image's `src` attribute matches the object
//     - showClicks
//     - display 2 new goat images(displayImages())

var listOfImg = document.getElementById('list-of-images');
listOfImg.addEventListener('click', handleClickOnImg);






new busImage('Bathroom', 'images/bathroom.jpg');
new busImage('Boots', 'images/boots.jpg');
new busImage('Breakfast', 'images/breakfast.jpg');
new busImage('Bubbleyum', 'images/bubblegum.jpg');


// How do I count clicks per image
// How do I prevent pictures from duplicating
