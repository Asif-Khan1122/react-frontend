import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });

    await loadCart();
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className='product-container'>
      <div className='product-image-container'>
        <img
          className='product-image'
          data-testid='product-image'
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className='product-name limit-text-to-2-lines'>{product.name}</div>

      <div className='product-rating-container'>
        <img
          className='product-rating-stars'
          data-testid='product-rating-stars-image'
          src={`images/ratings/rating-${product.rating?.stars * 10 || 0}.png`}
          alt={`${product.rating?.stars || 0} stars`}
        />
        <div className='product-rating-count link-primary'>
          {product.rating?.count || 0}
        </div>
      </div>

      <div className='product-price'>{formatMoney(product.priceCents)}</div>

      <div className='product-quantity-container'>
        <select
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </div>

      <div className='product-spacer'></div>

      {showAdded && (
        <div className='added-to-cart'>
          <img src='images/icons/checkmark.png' alt='Added to cart' />
          Added
        </div>
      )}

      <button className='add-to-cart-button button-primary' onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}
