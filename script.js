let profuctsGrid = document.getElementById('products-grid')
let productsArray = []
let xhr = new XMLHttpRequest()
let url = 'https://my-json-server.typicode.com/guzukdanilo/darnica'

xhr.open('GET',url + '/products')
xhr.responseType = 'json'
xhr.onload = function() {
	productsArray = xhr.response
	profuctsGrid.innerHTML = null
	productsArray.forEach(p => {
		productsArray.push(p)
		let pElem = document.createElement('div')
		pElem.classList.add('product')
		pElem.innerHTML = `
		<h2 class='product-name'>${p.name}<h2>
		<img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
		<p class='product-price'><b>Price: </b>${p.price}$</p>
		<button onclick="addProductToCart(${p.id})">Buy</button>




		`
		productsGrid.append(pElem)
	})
	

}
xhr.send()



// function addProductToCart(id) {
// 	xhr.open('GET', `${url}/products/${id}`)
// 	xhr.responseType = "json"
// 	xhr.onload = function() {

// 	}
// }


let cartProd = document.getElementById('cart-products')

let cart = []
if(localStorage.getItem('cart')) {
	cart = JSON.parse(localStorage.getItem('cart'))
	drawCartProducts()
}


function addProductToCart(id) {
	let product = productArray.find(function(p){
		return p.id == id
	})
	cart.push(product)
	drawCartProducts()
	localStorage.setItem("cart", JSON.stringify(cart))
	document.getElementById('cart-button').classList.add('active')
	setTimeout(function(){
		document.getElementById('cart-button').classList.remove()
	},500)
	
}

function drawCartProduct(){
	if(cart.lenght === 0) return cartProd.innerHTML = 'Cart is empty'
	cartProd.innerHTML = null
    let sum = 0
    cart.forEach(function(p){
    	cartProd.innerHTML += `
    	<p><img src="${p.photo_url}"> ${p.name} |${p.price}$</p>
    	<hr>

    	`
    	sum += Number(p.price)

    })
    cartProd.innerHTML += `
    <p>Total Price: ${sum}$</p>
    <button onclick="buyAll()"Buy All</button>
    `
}

function buyAll(){
	cart = []
	cartProd.innerHTML = 'Money was withdrawn from your credit card'
	localStorage.setItem("cart", '[]')
}
function openCart() {
	cartProd.classList.toggle('hide')
}