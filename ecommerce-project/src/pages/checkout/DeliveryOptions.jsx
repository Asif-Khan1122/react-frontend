import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";

export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
  const handleDeliveryOptionChange = async (deliveryOptionId) => {
    try {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        deliveryOptionId: deliveryOptionId,
      });
      await loadCart();
    } catch (error) {
      console.error("Error updating delivery option:", error);
    }
  };

  return (
    <div className='delivery-options'>
      <div className='delivery-options-title'>Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
        }

        return (
          <div
            key={deliveryOption.id}
            className='delivery-option'
            onClick={() => handleDeliveryOptionChange(deliveryOption.id)}
          >
            <input
              type='radio'
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className='delivery-option-input'
              name={`delivery-option-${cartItem.productId}`}
              onChange={() => {}}
            />
            <div>
              <div className='delivery-option-date'>
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>
              <div className='delivery-option-price'>{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
