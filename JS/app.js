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

	fetch(url, {
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
					<h6 class="m-0" style="white-space: nowrap;">${elArr.name.length > 30 ? elArr.name.slice(0, 30) + '...' : elArr.name}</h6>
					<p class="m-0 fw-bolder">$<span>${elArr.price}</span></p>
				</div>
				<div class="d-flex bg-dark text-white justify-content-between align-content-center py-1">
					<div>
						<h6 id="buyNow-btn">Buy Now <i class="fa-solid fa-bag-shopping fs-4"></i></h6>
					</div>
					<div>
					<span class="cart-Btn mx-1 p-0">
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
				itemObjSub['price'] = itemPrice;
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
				itemObjSub['price'] = itemPrice;
				itemObjSub['image'] = itemImage;
				itemObjSub['quantity'] = 1;

				itemObj[itemName.includes(' ') ? itemName.split(' ') : 'nothing more'] = itemObjSub;

				const itemObjStrngfy = JSON.stringify(itemObj);
				
				sessionStorage.setItem('shoping-cart', itemObjStrngfy);

			}

		})
	}

}



// call from global 

makeUrlFrSrch()
makeUrlFrBtn()