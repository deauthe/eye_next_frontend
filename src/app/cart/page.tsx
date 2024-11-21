// import CartInvoice from "@/components/cart/CartInvoice";
// import CartProductCard from "@/components/cart/CartProductCard";
// import React from "react";
// import Wrapper from "@/components/Wrapper";
// import OrderSummary from "@/components/cart/OrderSummery";

// type Props = {};

// const Cart = (props: Props) => {
//   return (
//     <Wrapper>
//       <div className="flex justify-between">
//         <div className=" flex flex-col w-full justify-between">
//           <CartProductCard />
//           <CartProductCard />
//           <CartProductCard />
//         </div>
//         <div>
//           <OrderSummary />
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Cart;
"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { toast } = useToast();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [orderProcessing, setOrderProcessing] = useState(false);

  const subtotal = cartItems.reduce((total, item) => (
    total + (item.attributes.price * item.quantity)
  ), 0);

  const handlePlaceOrder = async () => {
    if (!sessionStorage.getItem('userID')) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to place an order",
        variant: "destructive"
      });
      router.push('/auth/login');
      return;
    }

    setOrderProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "We'll deliver your order within 5-7 business days",
      });
      setOrderProcessing(false);
      router.push('/profile');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-[100px] px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button
            onClick={() => router.push('/')}
            className="bg-accent hover:bg-accent/90"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] px-4 bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.attributes.size}`}
              className="bg-white/5 rounded-lg p-4 text-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Premium Hoodie</h3>
                  <p className="text-sm text-gray-400">
                    Size: {item.attributes.size}
                  </p>
                  <p className="text-sm text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="text-lg">₹{item.attributes.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white/5 rounded-lg p-6 h-fit text-white">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-accent">FREE</span>
            </div>
            <div className="border-t border-white/10 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handlePlaceOrder}
            disabled={orderProcessing}
            className="w-full mt-6 bg-accent hover:bg-accent/90"
          >
            {orderProcessing ? "Processing..." : "Place Order (Cash on Delivery)"}
          </Button>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Free delivery available for all orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;