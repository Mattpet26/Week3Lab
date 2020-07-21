//================= Global vars ===========================
var productArray = [];
var totalClicks = 0;
var maxClicks = 25;

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


function renderNewImages(){
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


var listOfImg = document.getElementById('list-of-images');
listOfImg.addEventListener('click', handleClickOnImg);


new SkymallProduct('Bathroom', 'images/bathroom.jpg');
new SkymallProduct('Boots', 'images/boots.jpg');
new SkymallProduct('Toasterboi', 'images/breakfast.jpg');
new SkymallProduct('Bubbleyum', 'images/bubblegum.jpg');