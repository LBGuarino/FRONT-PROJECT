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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { IProduct } from "@/interfaces/IProduct"; // Ajusta la ruta a donde tengas IProduct

/**
 * Componente de SearchBar con debounce y renderizado de resultados.
 */
export default function CustomSearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  /**
   * Se ejecuta cada vez que cambia el `searchTerm`.
   * Usamos un debounce de ~400ms para no saturar el backend.
   */
  React.useEffect(() => {
    // Limpiar el timeout anterior si existe
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Si el usuario borró el campo, limpiamos resultados y salimos
    if (!searchTerm) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    // Definir un nuevo timeout
    debounceRef.current = setTimeout(async () => {
      await handleSearch(searchTerm);
    }, 400);

    // Cleanup al desmontar o cambiar el searchTerm
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm]);

  /**
   * Lógica para hacer la petición a tu backend (Express + TypeORM).
   * Ajusta la ruta si tu endpoint difiere. 
   */
  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      // Ejemplo: GET /api/products?search=query
      const res = await axios.get<IProduct[]>("/api/products", {
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

  /**
   * Actualiza el término de búsqueda con cada tecla pulsada.
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Lógica opcional para cuando el usuario selecciona un producto de la lista.
   */
  const handleSelectItem = (product: IProduct) => {
    console.log("Seleccionaste:", product);
    // Por ejemplo, podrías rellenar el input con el nombre del producto
    setSearchTerm(product.name);
    setShowResults(false);
  };

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
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

      {/* Indicador de carga */}
      {isSearching && (
        <Box sx={{ position: "absolute", top: 0, right: -30 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      {/* Lista de resultados */}
      {showResults && searchResults.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: 35,
            left: 0,
            width: "200px",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            zIndex: 10,
          }}
        >
          {searchResults.map((product) => (
            <ListItem
              key={product.id}>
              <ListItemButton
                onClick={() => handleSelectItem(product)}>
              <ListItemText
                primary={product.name}
                secondary={`$${product.price}`}
              />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {/* Mensaje "no se encontraron resultados" */}
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
