import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";
import { useCallback, useState } from "react";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState({});

  const handleDelete = useCallback(
    async (productId) => {
      try {
        await axios.delete(`/api/cart-items/${productId}`);
        await loadCart();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    },
    [loadCart]
  );

  const handleUpdate = useCallback(
    async (productId) => {
      try {
        const quantity = newQuantity[productId];
        if (!quantity || quantity < 1) {
          alert("Please enter a valid quantity");
          return;
        }

        await axios.put(`/api/cart-items/${productId}`, { quantity });
        await loadCart();
        setUpdatingItemId(null);
        setNewQuantity((prev) => ({ ...prev, [productId]: "" }));
      } catch (error) {
        console.error("Failed to update item:", error);
      }
    },
    [loadCart, newQuantity]
  );

  const startUpdate = (productId, currentQuantity) => {
    setUpdatingItemId(productId);
    setNewQuantity((prev) => ({ ...prev, [productId]: currentQuantity }));
  };

  const cancelUpdate = () => {
    setUpdatingItemId(null);
    setNewQuantity({});
  };

  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className='order-summary'>Your cart is empty</div>;
  }

  return (
    <div className='order-summary'>
      {deliveryOptions?.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return String(deliveryOption.id) === cartItem.deliveryOptionId;
            }
          );
          const isUpdating = updatingItemId === cartItem.productId;

          return (
            <div key={cartItem.productId} className='cart-item-container'>
              <div className='delivery-date'>
                Delivery date:
                {selectedDeliveryOption?.estimatedDeliveryTimeMs &&
                  dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D"
                  )}
              </div>

              <div className='cart-item-details-grid'>
                <img
                  className='product-image'
                  src={cartItem.product?.image}
                  alt={cartItem.product?.name}
                />

                <div className='cart-item-details'>
                  <div className='product-name'>{cartItem.product?.name}</div>
                  <div className='product-price'>
                    {formatMoney(cartItem.product?.priceCents)}
                  </div>
                  <div className='product-quantity'>
                    {isUpdating ? (
                      <div className='update-controls'>
                        <input
                          type='number'
                          min='1'
                          value={newQuantity[cartItem.productId] || ""}
                          onChange={(e) =>
                            setNewQuantity({
                              ...newQuantity,
                              [cartItem.productId]:
                                parseInt(e.target.value) || "",
                            })
                          }
                          className='quantity-input'
                        />
                        <span
                          className='save-link link-primary'
                          onClick={() => handleUpdate(cartItem.productId)}
                        >
                          Save
                        </span>
                        <span
                          className='cancel-link link-primary'
                          onClick={cancelUpdate}
                        >
                          Cancel
                        </span>
                      </div>
                    ) : (
                      <>
                        <span>
                          Quantity:{" "}
                          <span className='quantity-label'>
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span
                          className='update-quantity-link link-primary'
                          onClick={() =>
                            startUpdate(cartItem.productId, cartItem.quantity)
                          }
                        >
                          Update
                        </span>
                        <span
                          className='delete-quantity-link link-primary'
                          onClick={() => handleDelete(cartItem.productId)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
