//================= Global vars ===========================
var productArray = [];
var totalClicks = 0;
var maxClicks = 25;
var imageIndexCurrentlyDisplayed =[];

// ================= Function Definitions =================
function SkymallProduct(imageName, src){
  this.imageName = imageName;
  this.imageSrc = src;
  this.votes = 0;
  this.shown = 0;
  productArray.push(this);
}

//================================ Functions =======
SkymallProduct.prototype.renderImageHtml = function() {
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


function renderNewImages(){
  var index1 = Math.floor(Math.random() * productArray.length);
  while(index1 === imageIndexCurrentlyDisplayed[0] || index1 === imageIndexCurrentlyDisplayed[1]){
    Math.floor(Math.random() * productArray.length);
  }

  var index2 = Math.floor(Math.random() * productArray.length);
  while(
    index1 === index2 || 
    index2 === imageIndexCurrentlyDisplayed[0] || 
    index2 === imageIndexCurrentlyDisplayed[1]
   ) {
      index2 = math.floor(Math.random() * productArray.length);
  }

  var index3 = Math.floor(Math.random() * productArray.length);
  while(index2 === index3){
    index3 = math.floor(Math.random() * productArray.length);
  }

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

  imageIndexCurrentlyDisplayed[]
}


function handleClickOnImg(event) {
  console.log(event.target.alt);
  if (event.target.tagName === 'IMG') {
    totalClicks++;
    for (var imageIndex = 0; imageIndex < productArray.length; imageIndex++) {
      if (productArray[imageIndex].imageSrc === event.target.getAttribute('src')) {
        productArray[imageIndex].votes++;
      }
    }
    renderNewImages();
    //====== this if statement will stop rendering images and display blank
    if(totalClicks === maxClicks){
      var busList = document.getElementById('list-of-images');
      busList.innerHTML = '';
      listOfImg.removeEventListener('click', handleClickOnImg);
      renderVotesList();
    }
  }
}


function renderVotesList(){
  var list = document.getElementById('image-vote');
  var listItem = document.createElement('li');
  listItem.textContent = 'Votes per product: '
  list.appendChild(listItem);
  for(var i = 0; i < productArray.length; i++){
    var votesLi = document.createElement('li');
    votesLi.textContent = productArray[i].imageName + ': ' + productArray[i].votes + ' votes and was shown ' + productArray[i].shown;
    list.appendChild(votesLi);
  }
}


var listOfImg = document.getElementById('list-of-images');
listOfImg.addEventListener('click', handleClickOnImg);


new SkymallProduct('R2-D2', 'images/bag.jpg');
new SkymallProduct('Banana', 'images/banana.jpg');
new SkymallProduct('Chair', 'images/chair.jpg');
new SkymallProduct('Toasterboi', 'images/breakfast.jpg');
new SkymallProduct('Bubbleyum', 'images/bubblegum.jpg');
new SkymallProduct('Goodboi', 'images/dog-duck.jpg');