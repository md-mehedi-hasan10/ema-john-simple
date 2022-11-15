import React, { useEffect, useState } from 'react';
import { fakeData } from '../../fakeData/products';
import { clearTheCart, deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        clearTheCart();
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey)

    }

    useEffect(()=>{
        // cart
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(
                pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
        });
        setCart(cartProducts)
    }, []) 
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt="" />
    }
        return (
            <div className="shop-container">
                <div className="product-container">
                {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItem>)
            }
            {thankyou}
           
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} type="button" class="btn btn-warning">Place Order</button>
                    </Cart>
                </div>
            </div>
        );
};

export default Review;