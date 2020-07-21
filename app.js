//================= Global vars ===========================
var productArray = [];
var totalClicks = 0;
var maxClicks = 25;
var previousImageDisplayed =[1, 2, 3];

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
  console.log('entered the function');
  var index1 = Math.floor(Math.random() * productArray.length);
  while(
    index1 === previousImageDisplayed[0] || 
    index1 === previousImageDisplayed[1] ||
    index1 === previousImageDisplayed[2]){
      index1 = Math.floor(Math.random() * productArray.length);
  }
  console.log('found first index');
  var index2 = Math.floor(Math.random() * productArray.length);
  while(
    index2 === index1 || 
    index2 === previousImageDisplayed[0] || 
    index2 === previousImageDisplayed[1] ||
    index2 === previousImageDisplayed[2]){
      index2 = Math.floor(Math.random() * productArray.length);
  }
  console.log('found second index');
  var index3 = Math.floor(Math.random() * productArray.length);
  while(
    index3 === index2 || 
    index3 === index1 ||
    index3 === previousImageDisplayed[0] || 
    index3 === previousImageDisplayed[1] ||
    index3 === previousImageDisplayed[2]){
      index3 = Math.floor(Math.random() * productArray.length);
  }
  console.log('found third index');
  previousImageDisplayed = [index1, index2, index3];
  console.log(previousImageDisplayed)
  var newImage1 = productArray[index1];
  var newImage2 = productArray[index2];
  var newImage3 = productArray[index3];

  var busList = document.getElementById('list-of-images');
  busList.innerHTML = '';
  newImage1.renderImageHtml();
  newImage1.shown++;
  newImage2.renderImageHtml();
  newImage2.shown++;
  newImage3.renderImageHtml();
  newImage3.shown++;

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
    renderVotesList();
    //====== this if statement will stop rendering images and display blank /w votes
    if(totalClicks === maxClicks){
      var busList = document.getElementById('list-of-images');
      busList.innerHTML = '';
      listOfImg.removeEventListener('click', handleClickOnImg);
      makeMyChart ();
    }
  }
}


function renderVotesList(){
  var list = document.getElementById('image-vote');
  list.innerHTML = '';
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

renderNewImages()


//=============================== Chart =========================
function makeMyChart (){

var labelArray = [];
for(var i = 0; i < productArray.length; i++){
  labelArray.push(productArray[i].imageName)
}

var imageDataArray = [];
for(var j =0; j < productArray.length; j++){
  imageDataArray.push(productArray[j].votes);
}

var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labelArray,
        datasets: [{
            label: '# of Votes',
            data: imageDataArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}