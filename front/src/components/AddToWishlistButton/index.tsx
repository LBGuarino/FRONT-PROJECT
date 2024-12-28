import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

interface WishlistButtonProps {
  onAddToWishlist?: (isInWishlist: boolean) => void;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ onAddToWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleClick = () => {
    setIsInWishlist(!isInWishlist);
    if (onAddToWishlist) {
      onAddToWishlist(!isInWishlist);
    }
  };

  return (
    <Tooltip title={isInWishlist ? "On Wishlist" : "Add to Wishlist"} sx={{ display: "flex" }}>
      <IconButton
        onClick={handleClick}
        color={isInWishlist ? "error" : "default"}
        sx={{
          transition: "color 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isInWishlist ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default WishlistButton;


