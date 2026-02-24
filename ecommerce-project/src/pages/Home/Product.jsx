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
  };

  return (
    <div className='product-container'>
      <div className='product-image-container'>
        <img className='product-image' src={product.image} alt={product.name} />
      </div>

      <div className='product-name limit-text-to-2-lines'>{product.name}</div>

      <div className='product-rating-container'>
        <img
          className='product-rating-stars'
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
          onChange={(event) => {
            const quantitySelected = Number(event.target.value);
            setQuantity(quantitySelected);
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
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
