import styles from "./index.module.css";

interface ProductCounterProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const ProductCounter: React.FC<ProductCounterProps> = ({ quantity, setQuantity }) => {

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }  };

  return (
    <div className={styles.productCounter}>
      <button
        className={styles.counterButton}
        onClick={handleDecrement}
        aria-label="Decrement quantity"
      >
        -
      </button>
      <span className={styles.counterValue}>{quantity}</span>
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
