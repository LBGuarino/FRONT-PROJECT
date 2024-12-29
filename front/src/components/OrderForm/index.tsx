'use client'
import { ProductId, useCart } from "../hooks";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup } from "@mui/material";
import PaymentBox from "../PaymentBox";
import getToken from "@/helpers/getToken";
import { IProduct } from "@/interfaces/IProduct";
import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';


export default function OrderForm() {
    const { productsInBag } = useCart();
    const { user, error } = useUser();
    const { clearCart } = useCart();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const validProducts = productsInBag.map((product) => ({
            id: product.id,
            quantity: product.quantity,
        }));
        try {
            const token = await getToken();
            const response = await axios.post("http://localhost:3001/orders", {
                products: validProducts,
                auth0Sub: user?.sub,
            },
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
            }}
            );
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = () => {
        window.location.href = '/api/auth/logout';
        clearCart();
      };
    

    return (
        <>
            {productsInBag.length === 0 ? (
                <DotLottieReact       
                src="https://lottie.host/173f3c94-3834-4213-9c65-ea6bcf075493/2mntbggp11.lottie"
                loop
                autoplay 
                className="w-3/4 h-3/4 justify-center mt-10 ml-40"
                />
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                        <p className="text-2xl p-6 font-light ">Account: {`${user?.email}`}</p>
                        <button onClick={handleLogout} className="rounded-full size-10 transition duration-150 ease-in-out bg-slate-400 text-white hover:bg-slate-600 mt-6">
                            <LogoutIcon />
                        </button>
                    </div>


                    <Divider className="w-7/8" />

                    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
                        <FormControl className="flex flex-col gap-4 p-4">
                            <FormLabel id="demo-row-radio-buttons-group-label">
                                Shipment Method
                            </FormLabel>
                            <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="deliver" control={<Radio />} label="Deliver" />
                                <FormControlLabel value="pickup" control={<Radio />} label="Pick-Up" />
                            </RadioGroup>
                        </FormControl>
                        <div className="flex flex-row gap-4"> 
                            <input type="text" placeholder="Name" className="border border-gray-300 p-2 w-2/4" />
                            <input type="email" placeholder="E-mail" value={user?.email ?? ''} readOnly className="border border-gray-300 p-2 w-2/4" />
                        </div>
                        <input type="text" placeholder="Address Line 1" className="border border-gray-300 p-2 w-full" />
                        <input type="text" placeholder="Address Line 2" className="border border-gray-300 p-2 w-full" />
                        <div className="flex f  lex-row gap-4">
                            <input type="text" placeholder="City" className="border border-gray-300 p-2 w-1/3" />
                            <input type="text" placeholder="Zip Code" className="border border-gray-300 p-2 w-1/3" />
                            <input type="text" placeholder="Country" className="border border-gray-300 p-2 w-1/3" />
                        </div>

                        <div className="flex">
                            <PaymentBox />
                        </div>
                        <button type="submit" className="transition duration-150 ease-in-out bg-slate-400 text-white p-2 hover:bg-slate-600 rounded">Submit</button>
                    </form>

                    <Divider className="w-7/8" />


                </div>
            )}
        </>
    );
}