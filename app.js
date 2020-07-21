//================= Global vars ===========================
var productArray = [];
var totalClicks = 0;
var maxClicks = 5;

// ================= Function Definitions =================
function busImage(imageName, src){
  this.imageName = imageName;
  this.imageSrc = src;
  this.votes = 0;
  this.shown = 0;
  productArray.push(this);
}

//================================ Functions =======
busImage.prototype.renderImageHtml = function() {
  var target = document.getElementById('list-of-images');
  var busHomeLi = document.createElement('li');

  var busImg = document.createElement('img');
  busImg.alt = this.imageName;
  busImg.src = this.imageSrc;
  busHomeLi.appendChild(busImg);

  var imageTextp = document.createElement('p');
  imageTextp.textContent = this.imageName;
  busHomeLi.appendChild(imageTextp);

  target.appendChild(busHomeLi);
};


function handleClickOnImg(event) {
  console.log(event.target.alt);
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    for (var imageIndex = 0; imageIndex < productArray.length; imageIndex++) {
      if (productArray[imageIndex].imageSrc === event.target.getAttribute('src')) {
        productArray[imageIndex].votes++;
      }
    }


// this if statement controls the total amount of rounds a user is presented with.
    displayImages();
    if(totalClicks === maxClicks){
      var busList = document.getElementById('list-of-images');
      busList.innerHTML = '';
      listOfImg.removeEventListener('click', handleClickOnImg);
      renderVotes();
    }
  }
}


function renderVotes(){
  var target = document.getElementById('image-vote');
  var renderTotalsText = document.createElement('li');
  renderTotalsText.textContent = 'Totals per product: '
  target.appendChild(renderTotalsText);
  for(var i = 0; i < productArray.length; i++){
    var votesLi = document.createElement('li');
    votesLi.textContent = productArray[i].imageName + ': ' + productArray[i].votes + ' votes and was shown ' + productArray[i].shown;
    target.appendChild(votesLi);
  }
}


function displayImages(){
  var index1 = Math.floor(Math.random() * productArray.length);
  var index2 = Math.floor(Math.random() * productArray.length);
  var index3 = Math.floor(Math.random() * productArray.length);

  var newImage1 = productArray[index1];
  var newImage2 = productArray[index2];
  var newImage3 = productArray[index3];
  // TODO: make that random
  // create separate array with a while loop
  var busList = document.getElementById('list-of-images');
  busList.innerHTML = '';
  newImage1.renderImageHtml();
  newImage1.shown++;
  newImage2.renderImageHtml();
  newImage2.shown++;
  newImage3.renderImageHtml();
  newImage3.shown++;
}

// for loops that iterates through
// events / if / happens at a specific target, then counter ++


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