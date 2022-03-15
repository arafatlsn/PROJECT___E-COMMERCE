const makeUrlFrSrch = () => {
	const searchButton = document.getElementById('searchButton');

	searchButton.addEventListener('click', function(){
	
	const inputField = document.getElementById('inputField');
	const inputFieldValue = inputField.value;
		const url = `https://amazon-data-scraper58.p.rapidapi.com/search/${inputFieldValue}`;

		fetchApi(url)
	})

	
}

const makeUrlFrBtn = () => {

	const loadProductsBtns = document.getElementsByClassName('load-products');

	for(const loadProductsBtn of loadProductsBtns){

		loadProductsBtn.addEventListener('click', function(){
			const url = `https://amazon-data-scraper58.p.rapidapi.com/search/${this.textContent}`;
			fetchApi(url)
		})
	}

}

const fetchApi = url => {
	fetch(url || 'https://amazon-data-scraper58.p.rapidapi.com/search/fashion', {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "amazon-data-scraper58.p.rapidapi.com",
			"x-rapidapi-key": "935e459a34msh9b21f34a05627a8p18229cjsn191fbd4a59a4"
		}
	})
.then(res => res.json()).then(data => makeCardFunct(data))

}


const makeCardFunct = data => {

	

	const prntCard = document.getElementById('prnt-card');
	prntCard.innerHTML = '';

	const dataRslts = data.results;

	for(const elArr of dataRslts){

		let makeDivFrCard = document.createElement('div');
		makeDivFrCard.classList.add('card');
		makeDivFrCard.setAttribute('style', 'width: 18rem;');
	
		makeDivFrCard.innerHTML = `
		
		<div style="overflow: hidden; position: relative;
		width: 272px;
		height: 272px;">
			<img id="card-img" src=${elArr.image} alt="..." style="
			width: 272px;
			height: 272px;
			object-fit: contain;
			">
			<div style="position: absolute; top: 5px; right: 0;">
				<h6 class="m-0 p-1 my-1 fw-bold" style="background-color: #277CD9; color: white"><i class="fa-solid fa-circle-question"></i> NEW</h6>
				<h6 class="m-0 p-1 my-1 fw-bold" style="background-color: #FEE15B; color: white;"><i class="fa-solid fa-fire" style="color: #f52d08;"></i> HOT</h6>
			</div>
		</div>
		<div class="card-body">
			<div class="d-flex justify-content-between border-bottom mb-1">
				<h6 class="m-0">Sarah Boom</h6>
				<h6 class="m-0">${elArr.type}</h6>
			</div>
			<div>
				<div class="d-flex flex-column align-items-center">
					<h6 class="m-0" style="white-space: nowrap;">${elArr.name.length > 25 ? elArr.name.slice(0, 25) + '...' : elArr.name}</h6>
					<p class="m-0 fw-bolder">$<span>${elArr.price ? elArr.price : 'not found'}</span></p>
				</div>
				<div class="d-flex bg-dark text-white justify-content-between align-items-center py-1">
					<div>
						<h6 id="buyNow-btn">Buy Now <i class="fa-solid fa-bag-shopping fs-4"></i></h6>
					</div>
					<div>
					<span class="cart-Btn mx-1 p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
						<i class="fa-solid fa-cart-arrow-down fs-4" style="cursor: pointer;"></i>
					</span>
					<span class="heartBtn ms-1 me-2 p-0">
						<i class="fa-regular fa-heart fs-4" style="cursor: pointer;"></i>
					</span>
					</div>
				</div>
			</div>
		</div>
	
		`;

		prntCard.appendChild(makeDivFrCard);

		setStrg(makeDivFrCard)

		
	}
	

};


const setStrg = data => {

	const allCartBtns = document.getElementsByClassName('cart-Btn');
	for(const cartButton of allCartBtns){
		cartButton.addEventListener('click', function(){

			const itemName = this.parentNode.parentNode.parentNode.children[0].children[0].innerText;

			const itemPrice = this.parentNode.parentNode.parentNode.children[0].children[1].children[0].innerText;

			const itemImage = this.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].src;
			
			const getData = sessionStorage.getItem('shoping-cart');
			let itemObj;
			let itemObjSub;
			
			if(getData){

				itemObj  = JSON.parse(getData);

				itemObjSub = {};

				itemObjSub['name'] = itemName;
				itemObjSub['price'] = Number(itemPrice);
				itemObjSub['image'] = itemImage;
				itemObjSub['quantity'] = 1;

				itemObj[itemName.includes(' ') ? itemName.split(' ') : 'nothing more'] = itemObjSub;

				const itemObjStrngfy = JSON.stringify(itemObj);
				
				sessionStorage.setItem('shoping-cart', itemObjStrngfy);

			}
			else{
				itemObj = {};
				itemObjSub = {};

				itemObjSub['name'] = itemName;
				itemObjSub['price'] = Number(itemPrice);
				itemObjSub['image'] = itemImage;
				itemObjSub['quantity'] = 1;

				itemObj[itemName.includes(' ') ? itemName.split(' ') : 'nothing more'] = itemObjSub;

				const itemObjStrngfy = JSON.stringify(itemObj);
				
				sessionStorage.setItem('shoping-cart', itemObjStrngfy);

			}

			makeCart()

		})
	}

}


let subTotalArr = []; 


const makeCart = () => {

	const offcanvasBody = document.getElementById('offcanvasBody');
	const subTotal = document.getElementById('sub-total');
	offcanvasBody.innerHTML = '';

	const itemQuantity = document.getElementById('item-quantity');
	const totalCost = document.getElementById('total-cost');

	const getDataStrg = sessionStorage.getItem('shoping-cart');
	const getDataStrgPrse = JSON.parse(getDataStrg);

	for(const elGetData in getDataStrgPrse){

		const data = getDataStrgPrse[elGetData];

		const makeCartItem = document.createElement('div');
		makeCartItem.classList.add('border-bottom')
		makeCartItem.setAttribute('id', 'make-cart-prnt');
	
		makeCartItem.innerHTML = `
		
		<div class="d-flex align-items-center" id="make-cart-prnt-chld1">
			<p class="my-0 me-2 cross-buttons"><i class="fa-regular fa-circle-xmark"></i></p>
			<img width="60px" height="60px" class="rounded" src=${data.image} alt="">
		</div>
		<div id="make-cart-prnt-chld2" class="d-flex flex-column justify-content-center">
			<h6>${data.name.length > 25 ? data.name.slice(0, 25) + '...' : data.name}</h6>
			<h6>$<span>${data.price}</span></h6>
		</div>
	
		`;

		offcanvasBody.appendChild(makeCartItem);

		Object.keys(getDataStrgPrse).length === subTotalArr.length ? 'do not push, next time' :  subTotalArr.push(data.price);

		removeItem(makeCartItem)

	}

	
	const subTotalArrRed = subTotalArr.reduce((a, b) => a + b, 0);
	subTotalArr = [];
	
	itemQuantity.innerText = Object.keys(getDataStrgPrse).length;
	totalCost.innerText = subTotalArrRed.toFixed(2);

	subTotal.innerText = subTotalArrRed.toFixed(2);


}

const removeItem = data => {

	const crossButtons = document.getElementsByClassName('cross-buttons');
	for(const crossButton of crossButtons){
		crossButton.addEventListener('click', function(){

			const removeCart = this.parentNode.parentNode.children[1].children[0].innerText;

			const getDataStrg = sessionStorage.getItem('shoping-cart');
			const getDataStrgPrse = JSON.parse(getDataStrg);

			for(const objEl in getDataStrgPrse){
				
					if(getDataStrgPrse[objEl].name == removeCart){

						delete getDataStrgPrse[objEl];
						const getDataStrgStrngfy = JSON.stringify(getDataStrgPrse);
						sessionStorage.setItem('shoping-cart', getDataStrgStrngfy);

						makeCart()

					}

			}

			removeCart.split(' ')
		})
	}

}

// call from global 

makeUrlFrSrch()
makeUrlFrBtn()
fetchApi()
makeCart()
