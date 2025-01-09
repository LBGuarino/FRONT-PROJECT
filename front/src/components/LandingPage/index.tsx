'use client';
import { useEffect, useState } from "react";
import { Card } from "../Card";
import { IProduct } from "@/interfaces/IProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import { getProducts } from "@/helpers/getProducts";

export default function LandingPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        alert(error.message)
      })
    }, []);

    return (
      <Box component="section" className={styles.container}>    
          <Swiper 
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20} // Espacio reducido para móviles
              slidesPerView={1} // Valor por defecto para móviles
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              direction="horizontal" // Dirección siempre horizontal
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className={styles.swiperContainer}
              style={{
                height: 'auto',
              }}>
              
              {products.map(({id, name, description, price, stock, image, category }) => (
                  <SwiperSlide key={id}>
                      <Card
                      id={id}
                      name={name}
                      description={description}
                      price={price}
                      stock={stock}
                      image={image}
                      category={category}
                      />
                  </SwiperSlide>
              ))}
          </Swiper>
      </Box>
    );
}
