import React, { useState } from "react";
import "../../assets/css/common/common.scss";

const CartCounter = ({ onChange }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
    if (onChange) {
      onChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      if (onChange) {
        onChange(count - 1);
      }
    }
  };

  return (
    <div className="cart-counter">
      <div>
        <button onClick={handleDecrement}>-</button>
        <input type="number" value={count} readOnly />
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};

export default CartCounter;
