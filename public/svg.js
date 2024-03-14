
fetch('http://localhost:3001/store/Sova')
.then(response => response.json())
.then(stores => {
console.log(stores)
var keysArray = Object.keys(stores);
var size = keysArray.length;

var rectY = 350-size         
var rectElement = document.querySelector('.NumberOfSova');

rectElement.setAttribute('y', rectY);
rectElement.setAttribute('height', size);    
});


fetch('http://localhost:3001/store/Shoppa')
.then(response => response.json())
.then(stores => {
console.log(stores)
var keysArray = Object.keys(stores);
var size = keysArray.length;

var rectY = 350-size         
var rectElement = document.querySelector('.NumberOfShoppa');

rectElement.setAttribute('y', rectY);
rectElement.setAttribute('height', size);    
});

fetch('http://localhost:3001/store/Upplev')
.then(response => response.json())
.then(stores => {
console.log(stores)
var keysArray = Object.keys(stores);
var size = keysArray.length;

var rectY = 350-size         
var rectElement = document.querySelector('.NumberOfUpplev');

rectElement.setAttribute('y', rectY);
rectElement.setAttribute('height', size);    
});


fetch('http://localhost:3001/store/Må bra')
.then(response => response.json())
.then(stores => {
console.log(stores)

var keysArray = Object.keys(stores);
var size = keysArray.length;

var rectY = 350-size         
var rectElement = document.querySelector('.NumberOfMåBra');

rectElement.setAttribute('y', rectY);
rectElement.setAttribute('height', size);
});


fetch('http://localhost:3001/store/Äta')

.then(response => response.json())

.then(stores => {
console.log(stores)

var keysArray = Object.keys(stores);
var size = keysArray.length;

var rectY = 350-size         
var rectElement = document.querySelector('.NumberOfÄta');

rectElement.setAttribute('y', rectY);
rectElement.setAttribute('height', size);
})

