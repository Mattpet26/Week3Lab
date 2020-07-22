//================= Global vars ===========================
SkymallProduct.productArray = [];
var totalClicks = 0;
var maxClicks = 5;
var previousImageDisplayed =[1, 2, 3];

// ================= Function Definitions =================
function SkymallProduct(imageName, src){
  this.imageName = imageName;
  this.imageSrc = src;
  this.votes = 0;
  this.shown = 0;
  SkymallProduct.productArray.push(this);
}

//======================= Functions =====================
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
  var index1 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  while(
    index1 === previousImageDisplayed[0] || 
    index1 === previousImageDisplayed[1] ||
    index1 === previousImageDisplayed[2]){
      index1 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  }
  var index2 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  while(
    index2 === index1 || 
    index2 === previousImageDisplayed[0] || 
    index2 === previousImageDisplayed[1] ||
    index2 === previousImageDisplayed[2]){
      index2 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  }
  var index3 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  while(
    index3 === index2 || 
    index3 === index1 ||
    index3 === previousImageDisplayed[0] || 
    index3 === previousImageDisplayed[1] ||
    index3 === previousImageDisplayed[2]){
      index3 = Math.floor(Math.random() * SkymallProduct.productArray.length);
  }
  previousImageDisplayed = [index1, index2, index3];
  console.log(previousImageDisplayed)
  var newImage1 = SkymallProduct.productArray[index1];
  var newImage2 = SkymallProduct.productArray[index2];
  var newImage3 = SkymallProduct.productArray[index3];

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
    for (var imageIndex = 0; imageIndex < SkymallProduct.productArray.length; imageIndex++) {
      if (SkymallProduct.productArray[imageIndex].imageSrc === event.target.getAttribute('src')) {
        SkymallProduct.productArray[imageIndex].votes++;
      }
    }
    renderNewImages();
    renderVotesList();
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
  for(var i = 0; i < SkymallProduct.productArray.length; i++){
    var votesLi = document.createElement('li');
    votesLi.textContent = SkymallProduct.productArray[i].imageName + ': ' + SkymallProduct.productArray[i].votes + ' votes and was shown ' + SkymallProduct.productArray[i].shown;
    list.appendChild(votesLi);
  }
}

function saveLocalVotes(){

}

function displayLocalSavedVotes(){

}

//============================== event listener ==================
var listOfImg = document.getElementById('list-of-images');
listOfImg.addEventListener('click', handleClickOnImg);

//============================= new images ======================
new SkymallProduct('R2-D2', 'images/bag.jpg');
new SkymallProduct('Banana', 'images/banana.jpg');
new SkymallProduct('Chair', 'images/chair.jpg');
new SkymallProduct('Toasterboi', 'images/breakfast.jpg');
new SkymallProduct('Bubbleyum', 'images/bubblegum.jpg');
new SkymallProduct('Goodboi', 'images/dog-duck.jpg');
// new SkymallProduct('Dragon', 'images/dragon.jpg');
// new SkymallProduct('Pen', 'images/pen.jpg');
// new SkymallProduct('PetSweeper', 'images/pet-sweep.jpg');
// new SkymallProduct('Scissors', 'images/scissors.jpg');
// new SkymallProduct('Sharkie', 'images/shark.jpg');
// new SkymallProduct('Sweeper', 'images/sweep.png');

renderNewImages()

//======================= local storage ==========================
// function Cat(name, humanScratched){
//   this.name = name;
//   this.humanScratched = humanScratched;
// }
// Cat.prototype.brag = function(){
//   console.log('I scratched ' + humanSCratched + ' times');
// }

// var snowdrop = new Cat('snowdrop', 0);

// snowdrop.humanSCratched++;
// snowdrop.humanSCratched++;
// snowdrop.humanSCratched++;
// //this is what saves the info
// var stringySnow = JSON.stringify(snowdrop);
// localStorage.setItem('snowdrop', stringySnow);
// //this passes it from storage back to page. put at bottom of page.
// var lsSnow = localStorage.getItems('snowdrop');
// var parsedSnow = JSON.parse(lsSNow);

// var reconsitutedSnowDrop = new Cat(parsedSnow.name, parsedSnow.humanScratched);
// reconstitutedSnowDrop.brag();

//stringified and stored in local storage
//retrieved from local storage and parsed
// now pass our parsed object through constructor so we have prototype methods

//expected behavior: snowdrop has 5 scratches
//actual outcome: snowdrop had 0 scratches
//reason: constructor only takes in a name parameter
//resolution: give the constructor a parameter for scratches

//expected: snowdrop has 5 scratches
// outcome: snowdrop had null scratches
//reason: when snowdrop was made, we did not pass scratch count
// resolution: update original constuctor instance to pass parameter

//=============================== Chart =========================
function makeMyChart (){

var labelArray = [];
for(var i = 0; i < SkymallProduct.productArray.length; i++){
  labelArray.push(SkymallProduct.productArray[i].imageName)
}

var imageDataArray = [];
for(var j = 0; j < SkymallProduct.productArray.length; j++){
  imageDataArray.push(SkymallProduct.productArray[j].votes);
}

var shownArray = [];
for(var q = 0; q < SkymallProduct.productArray.length; q++){
  shownArray.push(SkymallProduct.productArray[q].shown)
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
          }, {
            label: '# of times shown',
            data: shownArray,
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