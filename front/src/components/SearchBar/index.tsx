"use client";

import * as React from "react";
import {
  TextField,
  InputAdornment,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  ListItemButton,
  ListItemAvatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { IProduct } from "@/interfaces/IProduct";
import { useRouter } from "next/navigation";

export default function CustomSearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const searchBarRef = React.useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!searchTerm) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      await handleSearch(searchTerm);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      const res = await axios.get<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        params: { search: query },
      });
      setSearchResults(res.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error al buscar productos:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectItem = (product: IProduct) => {
    setShowResults(false);
    router.push(`/products/Candles/${product.id}`);
  };

  return (
    <Box sx={{ position: "relative", width: "500px" }}
    ref={searchBarRef}
    >
      <TextField
        variant="standard"
        placeholder="SEARCH"
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setShowResults(true)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ fontSize: 20 }} />
              </InputAdornment>
            ),
            style: {
              fontSize: "16px",
              letterSpacing: "1px",
              fontWeight: 200,
            },
          },
        }}
        sx={{
          width: "200px",
          "& .MuiInput-underline:before": {
            borderBottom: "1px solid black",
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid black",
          },
          "& .MuiInput-underline:after": {
            borderBottom: "2px solid grey",
          },
        }}
      />

      {isSearching && (
        <Box sx={{ position: "absolute", top: 0, right: -30 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      {showResults && searchResults.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          {searchResults.map((product) => (
            <ListItem
              key={product.id}
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              <ListItemButton
                onClick={() => handleSelectItem(product)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 15px",
                }}
              >
                <ListItemAvatar>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "4px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`$${product.price}`}
                  primaryTypographyProps={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {showResults &&
        !isSearching &&
        searchTerm &&
        searchResults.length === 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 35,
              left: 0,
              width: "200px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              zIndex: 10,
              p: 1,
              fontSize: "14px",
            }}
          >
            No se encontraron resultados
          </Box>
        )}
    </Box>
  );
}
