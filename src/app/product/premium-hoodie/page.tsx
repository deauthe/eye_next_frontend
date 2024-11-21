"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/store/features/cart/cartSlice";
import { useToast } from "@/components/ui/use-toast";

const productData = {
    product_id: "premium-hoodie-01",
    name: "Premium Cotton Hoodie",
    brand_name: "deauth",
    colours: ["black", "navy", "gray"],
    sizes: ["S", "M", "L", "XL"],
    price: 1999,
    images: [
        "/C_hoodie.png",
        "/hod1.png",
        "/hod2.png",
        "/C_hoodie.png",
        "/C_hoodie.png"
    ],
    description: `Experience unmatched comfort with our premium cotton hoodie. 
  Features:
  • 100% Premium Cotton
  • Comfortable Fit
  • Durable Stitching
  • Premium Zipper
  • Perfect for all seasons`,
};

export default function Page() {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState(productData.colours[0]);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast({
                title: "Please select a size",
                description: "You need to select a size before adding to cart",
                variant: "destructive"
            });
            return;
        }

        dispatch(addToCart({
            id: productData.product_id,
            attributes: {
                size: selectedSize,
                color: selectedColor,
                price: productData.price,
            },
            oneQuantityPrice: productData.price,
            quantity: 1
        }));

        toast({
            title: "Added to cart",
            description: `${productData.name} added to your cart`
        });
    };

    return (
        <div className="min-h-screen bg-background pt-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Images Grid */}
                    <div className="lg:col-span-8 grid grid-cols-6 gap-4">
                        {productData.images.map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    index === 0 || index === 1
                                        ? "col-span-3 aspect-square"
                                        : "col-span-2 aspect-square",
                                    "bg-secondaryBackground rounded-lg overflow-hidden relative"
                                )}
                            >
                                <Image
                                    src={image}
                                    alt={`Product view ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Product Details */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-secondaryBackground rounded-lg p-6 text-white">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-heading1">{productData.name}</h1>
                                <p className="text-2xl text-accent font-heading1">₹{productData.price}</p>

                                {/* Size Selection */}
                                <div className="space-y-3">
                                    <h3 className="font-heading1">Select Size</h3>
                                    <div className="flex gap-3">
                                        {productData.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`w-12 h-12 rounded-md flex items-center justify-center border-2 
                          ${selectedSize === size
                                                        ? 'border-accent text-accent'
                                                        : 'border-white/20 hover:border-white/40'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Selection */}
                                <div className="space-y-3">
                                    <h3 className="font-heading1">Select Color</h3>
                                    <div className="flex gap-3">
                                        {productData.colours.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full border-2
                          ${selectedColor === color
                                                        ? 'border-accent'
                                                        : 'border-transparent'
                                                    }`}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full py-6 bg-accent hover:bg-accent/90 rounded-full font-heading1"
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-secondaryBackground rounded-lg p-6 text-white">
                            <h3 className="font-heading1 mb-4">Description</h3>
                            <p className="text-white/70 whitespace-pre-line">
                                {productData.description}
                            </p>
                        </div>

                        {/* Delivery Info */}
                        <div className="bg-secondaryBackground rounded-lg p-6 text-white">
                            <h3 className="font-heading1 mb-4">Delivery Information</h3>
                            <ul className="text-white/70 space-y-2">
                                <li>• Free delivery across India</li>
                                <li>• Cash on delivery available</li>
                                <li>• 5-7 business days delivery time</li>
                                <li>• Easy returns within 7 days</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}