import { useState } from "react";
import styles from "./index.module.css";

interface ProductCounterProps {
  onQuantityChange?: (quantity: number) => void;
}

const ProductCounter: React.FC<ProductCounterProps> = ({ onQuantityChange }) => {
  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onQuantityChange?.(newCount);
  };

  const handleDecrement = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onQuantityChange?.(newCount);
  };

  return (
    <div className={styles.productCounter}>
      <button
        className={styles.counterButton}
        onClick={handleDecrement}
        aria-label="Decrement quantity"
      >
        -
      </button>
      <span className={styles.counterValue}>{count}</span>
      <button
        className={styles.counterButton}
        onClick={handleIncrement}
        aria-label="Increment quantity"
      >
        +
      </button>
    </div>
  );
};

export default ProductCounter;
