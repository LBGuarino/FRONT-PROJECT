'use client'
import { useCart } from "../hooks";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function OrderForm() {
    const { productsInBag, removeFromCart } = useCart();
    const { user, error } = useUser();

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
                <div className="flex flex-col gap-4 p-4 justify-center items-center">
                    <p className="text-2xl p-8 font-light ">Account: {`${user?.email}`}</p>
                    <p className="text-center">Shipment</p>

                    <FormGroup className="flex flex-row gap-4 p-4 ">
                        <FormControlLabel control={<Checkbox />} label="Deliver"/>
                        <FormControlLabel control={<Checkbox />} label="Pick-Up"/>
                    </FormGroup>

                    <form className="flex flex-col gap-4 p-4 justify-center items-center">
                        <input type="text" placeholder="Name" className="border border-gray-300 p-2 w-full" />
                        <input type="email" placeholder="Email" className="border border-gray-300 p-2 w-full" />
                        <input type="text" placeholder="Address" className="border border-gray-300 p-2 w-full" />
                        <input type="text" placeholder="City" className="border border-gray-300 p-2 w-full" />
                        <div className="flex flex-row gap-4">
                            <input type="text" placeholder="Zip Code" className="border border-gray-300 p-2 w-1/2" />
                            <input type="text" placeholder="Country" className="border border-gray-300 p-2 w-1/2" />
                            <input type="text" placeholder="Phone" className="border border-gray-300 p-2 w-1/2" />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
                    </form>
                </div>
            )}
        </>
    );
}