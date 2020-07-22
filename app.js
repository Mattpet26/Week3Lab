//================= Global vars ===========================
SkymallProduct.productArray = [];
var totalClicks = 0;
var maxClicks = 1;
var previousImageDisplayed =[1, 2, 3];

// ================= Function Definitions =================
function SkymallProduct(imageName, src, votes, shown){
  this.imageName = imageName;
  this.imageSrc = src;
  this.votes = votes;
  this.shown = shown;
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
    saveLocalVotes();
    renderNewImages();
    // renderVotesList();
    if(totalClicks === maxClicks){
      var busList = document.getElementById('list-of-images');
      busList.innerHTML = '';
      listOfImg.removeEventListener('click', handleClickOnImg);
      makeMyChart ();
    }
  }
}

// function renderVotesList(){
//   var list = document.getElementById('image-vote');
//   list.innerHTML = '';
//   var listItem = document.createElement('li');
//   listItem.textContent = 'Votes per product: '
//   list.appendChild(listItem);
//   for(var i = 0; i < SkymallProduct.productArray.length; i++){
//     var votesLi = document.createElement('li');
//     votesLi.textContent = SkymallProduct.productArray[i].imageName + ': ' + SkymallProduct.productArray[i].votes + ' votes and was shown ' + SkymallProduct.productArray[i].shown;
//     list.appendChild(votesLi);
//   }
// }

//============================== event listener ==================
var listOfImg = document.getElementById('list-of-images');
listOfImg.addEventListener('click', handleClickOnImg);

//============================= new images ======================
var arrayFromLocalStorage = localStorage.getItem('productArray');
  if(arrayFromLocalStorage !== null){
    var parsedArray = JSON.parse(arrayFromLocalStorage);
    for(i = 0; i < parsedArray.length; i++){
      var parsedName = parsedArray[i].imageName;
      var parsedImg = parsedArray[i].imageSrc;
      var parsedVotes = parsedArray[i].votes;
      var parsedShown = parsedArray[i].shown;
      new SkymallProduct(parsedName, parsedImg, parsedVotes, parsedShown)
    }
  } else {
  new SkymallProduct('R2-D2', 'images/bag.jpg', 0, 0);
  new SkymallProduct('Banana', 'images/banana.jpg', 0, 0);
  new SkymallProduct('Chair', 'images/chair.jpg', 0, 0);
  new SkymallProduct('Toasterboi', 'images/breakfast.jpg', 0, 0);
  new SkymallProduct('Bubbleyum', 'images/bubblegum.jpg', 0, 0);
  new SkymallProduct('Goodboi', 'images/dog-duck.jpg', 0, 0);
  new SkymallProduct('Dragon', 'images/dragon.jpg', 0, 0);
  new SkymallProduct('Pen', 'images/pen.jpg', 0, 0);
  new SkymallProduct('PetSweeper', 'images/pet-sweep.jpg', 0, 0);
  new SkymallProduct('Scissors', 'images/scissors.jpg', 0, 0);
  new SkymallProduct('Sharkie', 'images/shark.jpg', 0, 0);
  new SkymallProduct('Sweeper', 'images/sweep.png', 0, 0);
  new SkymallProduct('TaunTaun', 'images/tauntaun.jpg', 0, 0);
  new SkymallProduct('Unicorn', 'images/unicorn.jpg', 0, 0);
  new SkymallProduct('Usb', 'images/usb.gif', 0, 0);
  new SkymallProduct('Water', 'images/water-can.jpg', 0, 0);
  new SkymallProduct('Wine', 'images/wineglass.jpg', 0, 0);
}
renderNewImages()

//======================= local storage ==========================
function saveLocalVotes(){
  var stringyName = JSON.stringify(SkymallProduct.productArray);
  localStorage.setItem('productArray', stringyName); 
  console.log(stringyName);
}

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
                'rgba(255, 159, 64, 0.2)',
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
                'rgba(255, 159, 64, 1)',
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
                'rgba(255, 159, 64, 0.2)',
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
                'rgba(255, 159, 64, 1)',
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
