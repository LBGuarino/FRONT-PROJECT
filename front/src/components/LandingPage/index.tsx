import { useEffect, useState } from "react";
import { Card } from "../Card";
import { productsArray } from "@/data/utils";
import { IProduct } from "@/interfaces/IProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";
import { Box } from "@mui/material";

export default function LandingPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      setProducts(productsArray);
    }, []);

  return (
    <Box component="section" className={styles.container}>    
        <Swiper 
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className={styles.swiperContainer}>
        
            {products.map(({name, description, price, stock, image, categoryId}, index: number) => (
                <SwiperSlide key={index}>
                    <Card
                    name={name}
                    description={description}
                    price={price}
                    stock={stock}
                    image={image}
                    categoryId={categoryId}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>
  );
}