let cart = [];

export const addItem = (item = [], quantity, next = f => f) => {

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            quantity: 1,
            count: 0
        });
        // console.log("price: ", Number(cart[0].price)*Number(quantity));

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        // cart = Array.from(new Set(cart.map(p => p.id))).map(id => {
        //     return cart.find(p => p.id === id);
        // });

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage);
        console.log("cart: ", cart);
        // console.log("price: ", (cart[0].price)*(quantity));
        next();
    }
};

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) { 
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    // let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product.book_id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export const removeItem = productId => {
    // let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product.book_id === productId) {
                cart.splice(i, 1);
            }
        });
        console.log(JSON.stringify(cart));
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        // next();
    }
};
