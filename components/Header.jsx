import React from "react";
import css from "../styles/header.module.css";
import Image from "next/image";
import Logo from "../assets/Logo.png";
import Link from "next/link";
import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import { useStore } from "../store/store";
import { useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";

const Header = () => {
  const [Order, setOrder] = useState("");
  useEffect(() => {
    setOrder(localStorage.getItem("order"));
  }, []);

  var cartItems = typeof window !== "undefined" && localStorage.getItem("cart") 
  ? JSON.parse(localStorage.getItem("cart")) : [];

  
  const [open, setOpen] = useState(false);
  return (
    <div className={css.header}>
      {/* logo side */}
      <div className={css.logo}>
        <Image className={css.img} src={Logo} alt="" width={50} height={50} />
        <span>Fudo</span>
      </div>

      {/* menu side */}
      <ul className={css.menu}>
        <li>
          <Link href="../">Home</Link>
        </li>
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {/* right side */}
      <div className={css.rightSide}>
        <Link href="/pizza/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{cartItems.length>0 ? cartItems.length : 0}</div>
          </div>
        </Link>

        {Order && (
          <Link href={`/order/${Order}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />
              {Order !== "" && <div className={css.badge}>1</div>}
            </div>
          </Link>
        )}
      </div>

      <div className={css.mobile_drawer}>
          <IconButton onClick={() => setOpen(true)}>
            <MenuRoundedIcon className={css.link} />
          </IconButton>
          <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
            <div className={css.drawer_div}>
              <Link href="../" onClick={() => setOpen(false)}>
                <p className={css.link}>Home</p>
              </Link>
              <Link href="/menu" onClick={() => setOpen(false)}>
                <p className={css.link}>Menu</p>
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                <p className={css.link}>Contact</p>
              </Link>
            </div>
          </Drawer>
      </div>
    </div>
  );
};
export default Header;
