"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/trpc/react";
import type { cartItem } from "~/types/stock";

export default function CartPage() {
  return (
    <CartContent />
  );
}

function CartContent() {
  const { data: session } = useSession();

  const { data: cartItems, isLoading, refetch } = api.cart.getCartItems.useQuery(undefined, {
    enabled: !!session,
  });

  const removeFromCart = api.cart.removeFromCart.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleRemove = async (stockId?: string, customOrderId?: string) => {
    try {
      await removeFromCart.mutateAsync({
        stockId,
        customOrderId
      });
      alert("Item removed!");
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const createOrder = api.cart.createOrder.useMutation({
    onSuccess: () => {
      alert("Order pending.");
      void refetch();
    },
    onError: (error) => {
      console.error('Failed to set order', error);
    },
  });

  const handleCheckout = () => {
    createOrder.mutate();
  };

  if (!session) {
    return (
      <div>
        <p>You need to sign in to access your cart.</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <p>Your cart is empty!</p>;
  }

  function calculateTotal(cartItems: cartItem[]) {
    const total = cartItems.reduce((total, item) => {
      const cost = item.stock?.cost ?? item.customOrder?.cost ?? 0;
      return (total + cost);
    }, 0);
    return total.toFixed(2);
  }

  return (
    <div className="px-6 py-8 min-w-[40%] max-w-4xl mx-auto rounded-lg shadow-md">
      <h1 className="px-6 py-8 bg-white min-w-[40%] max-w-4xl mx-auto rounded-lg shadow-md">Your Shopping Cart</h1>
      <ul className="list-none p-0 m-0">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-4 border-b border-gray-300 last:border-b-0">
            <div className="flex flex-col md:flex-row items-center">
              {item.stock ? (
                <Image
                  src={item.stock.imageUrl}
                  width={128}
                  height={128}
                  className="mr-4 shadow-sm"
                  alt={item.stock.name}
                />
              ) : item.customOrder ? (
                <div className="flex items-center mr-4">
                  <Image
                    src={item.customOrder.deck?.imageUrl || ""}
                    width={128}
                    height={128}
                    className="shadow-sm"
                    alt="Deck"
                  />
                  <span className="mx-2 text-xl font-bold">+</span>
                  <Image
                    src={item.customOrder.wheels?.imageUrl || ""}
                    width={128}
                    height={128}
                    className="shadow-sm"
                    alt="Wheels"
                  />
                </div>
              ) : null}
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium m-0 mb-1">{item.stock?.name ?? "Custom Order"}</h2>
                <p className="text-sm text-gray-600 m-0">Price: {item.stock?.cost ?? item.customOrder?.cost}€</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="text-sm text-gray-800">
                Quantity: {item.quantity}
              </p>
              <button
                className="text-red-500 underline hover:text-red-600 transition-colors duration-200"
                onClick={() => handleRemove(item.stock?.id, item.customOrder?.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-4 border-t-2 border-gray-200 text-right">
        <p className="text-lg font-semibold m-0">Total: {calculateTotal(cartItems)}€</p>
        <button
          className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
