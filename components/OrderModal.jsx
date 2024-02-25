import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import css from "../styles/orderModal.module.css";
import { createOrder } from "../lib/orderHandler";
import { useStore } from "../store/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [FormData, setFormData] = useState({});

  const handleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);
  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });

    toast.success("Order Placed");
    resetCart();

    if (typeof window !== "undefined") {
      localStorage.setItem("order", id);
    }
    
    ()=>setOpened(null); //for closing of modal box after order palced

    router.push(`/order/${id}`);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal Content */}
      <form onSubmit={handleSubmit} className={css.formContainer}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <textarea
          onChange={handleInput}
          type="text"
          name="address"
          rows={3}
          required
          placeholder="Address"
        ></textarea>
        <span>
          {PaymentMethod == 1 ? (
            <span>
              You Paid <span className="dollar">${total}</span> via Card
            </span>
          ) : (
            <span>
              You will pay <span className="dollar">${total}</span> on delivery
            </span>
          )}
        </span>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </Modal>
  );
}
