import React, { useState,useEffect } from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import css from "../../styles/cart.module.css";
import { useStore } from "../../store/store";
import { urlFor } from "../../lib/client";
import toast, { Toaster } from "react-hot-toast";
import OrderModal from "../../components/OrderModal";
import { useRouter } from "next/router";

export default function Cart() {
  const removePizza = useStore((state) => state.removePizza);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [localCart, setLocalCart] = useState([]);

  const [Order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );

  const cart = useStore((state) => state.cart.pizzas);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const data = localStorage.getItem("cart");
    if (data) {
      setLocalCart(JSON.parse(data));
    }
  }, [cart]);

  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };

  const router = useRouter();

  const total = () =>
    localCart.reduce((a, b) => a + b.quantity * b.price, 0);

  const handleOnDelivery = () => {
    if (localCart.length > 0) {
      setPaymentMethod(0);
      typeof window !== "undefined" && localStorage.setItem("total", total());
    }
  };

  const handleCheckOut = async () => {
    typeof window !== "undefined" && localStorage.setItem("total", total());
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(localCart),
    });

    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      <div className={css.container}>
        {/* details */}
        <div className={css.details}>
          <table className={css.table}>
            <thead>
              <th>Pizza</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </thead>
            <tbody className={css.tbody}>
              {localCart.length > 0 &&
                localCart.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={css.imageTd}>
                        <Image
                          loader={() => src}
                          src={src}
                          objectFit="cover"
                          width={85}
                          height={85}
                          alt=""
                        />
                      </td>

                      <td>{pizza.name}</td>
                      <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td>
                      <td>
                        <span style={{ color: "var(--themeRed)" }}>$</span>
                        {pizza.price}
                      </td>
                      <td>{pizza.quantity}</td>
                      <td>
                        <span style={{ color: "var(--themeRed)" }}>$</span>
                        {pizza.price * pizza.quantity}
                      </td>
                      <td
                        style={{ color: "var(--themeRed)", cursor: "pointer" }}
                        onClick={() => handleRemove(i)}
                      >
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* summary */}
        <div className={css.cart}>
          <span>Cart</span>
          <div className={css.CartDetails}>
            <div>
              <span>Items</span>
              <span> {localCart.length}</span>
            </div>

            <div>
              <span>Total</span>
              <span>$ {total()}</span>
            </div>
          </div>

          {!Order && localCart.length > 0 ? (
            <div className={css.buttons}>
              <button className="btn" onClick={handleOnDelivery}>
                Pay on Delivery
              </button>
              <button className="btn" onClick={handleCheckOut}>
                Pay on now
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Toaster />

      {/* Modal */}
      <OrderModal
        opened={PaymentMethod === 0}
        setOpened={setPaymentMethod}
        PaymentMethod={PaymentMethod}
      />
    </Layout>
  );
}
