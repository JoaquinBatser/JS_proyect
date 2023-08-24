// VARIABLES DECLARATION ------------------------------------------------
const productElement = document.querySelector('.products');
const cartItemsElement = document.querySelector('.cart-items');
const total = document.querySelector('.total');
const checkoutBtn = document.getElementById('checkoutBtn');
const input = document.querySelector('input');
const dayCard = document.getElementById('dayCard');
const timeZoneCard = document.getElementById('timeZoneCard');

// USE OF API  -----------------------------------------------
const url = 'http://worldtimeapi.org/api/ip'

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    const day = await data.day_of_year;
    const timeZone = await data.timezone;
    console.log(data);
    dayCard.textContent += `Day of the year: ${day}`
    timeZoneCard.textContent += `Your timezone: ${timeZone}`
}

getData()


// PROMISES ------------------------------------------
const prodAsk = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 1000);
    });
};

prodAsk();


// RENDERING OF PROD IN PAGE ----------------------------------------------
function renderProducts() {
    products.forEach( (product) => {
        productElement.innerHTML += `
        
        
            <div class="prod">
                <div class="prod-img">
                     <img src="${product.imgSrc}" alt="">
                </div>
                <div class="prod-desc">
                    <h2>${product.name}</h2>
                    <h2><small></small>$${product.price}</h2>
                    <div class="add-to-cart" onClick="addToCart(${product.id})">
                        <img src="./images/add.svg" alt="">
                    </div>
                </div>
            </div>
        
        
        `;
    })
}

renderProducts();


let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart();


// ADD TO CART FUNC -----------------------------------------------------
function addToCart(id) {

    if(cart.some((item) => item.id === id )) {
        changeNumberOfUnits("plus", id)
    } else {
        const item = products.find((product) => product.id === id );
        
        cart.push({
            ...item,
            numberOfUnits: 1
        });


        updateCart();

    }
}


function updateCart() {
    renderCartItems();
    renderTotal();

    localStorage.setItem('cart', JSON.stringify(cart));
}

// CALC FOR PRICE -----------------------------------------------------
function renderTotal() {
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    }),

    total.innerHTML = `Mr/Ms your total is: $${totalPrice.toFixed(2)} (${totalItems} item)`
}



// CART ITEMS ------------------------------------------------
function renderCartItems() {
    cartItemsElement.innerHTML = "";
    cart.forEach((item) => {
        cartItemsElement.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="">
                <h4>${item.name}</h4>
            </div>
            <div class="item-info">
                <div class="item-price">
                    $${item.price}
                </div>
                <div class="units">
                    <div class="btn btn-cart plus" onClick="changeNumberOfUnits('plus', ${item.id})">+</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn btn-cart minus" onClick="changeNumberOfUnits('minus', ${item.id})">-</div>
                </div>
                <div class="item-remove">
                    <img src="./images/trash.svg" alt="" onClick="removeItemFromCart(${item.id})")>
                </div>

            </div>
        </div>
        
        
        `;
    })
}

function removeItemFromCart(id) {
    cart = cart.filter( (item) => item.id !== id);

    updateCart();
}


function changeNumberOfUnits(action, id) {

    cart = cart.map((item) => {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id)  {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--;
            } else if (action === "plus" && numberOfUnits < item.stock) {
                numberOfUnits++

            } else if (action === "plus" && numberOfUnits === item.stock) {
                alert(`This item stock is: ${item.stock}, you cannot purchase more of this item`);
            }
        }



        return {
            ...item,
            numberOfUnits,
        }
    });

    updateCart();

}


// CHECKOUT ---------------------------
checkoutBtn.disabled = true;
input.addEventListener("change",() => {
    if(document.querySelector("input").value === "") {
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
    }
});


checkoutBtn.addEventListener('click', function() {
    cart=[];
    updateCart();
    document.querySelector('.form-div').style.display = 'none';
    localStorage.clear();
    total.innerHTML = `Mr/Ms your total is: $0 (0 item)`;
    Swal.fire('Successful Checkout');

});