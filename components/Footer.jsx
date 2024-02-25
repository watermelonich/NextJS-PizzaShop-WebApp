import React from "react";
import css from  "../styles/footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Image from 'next/image'
import Logo from '../assets/Logo.png'


function Footer() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className={css.footer}>
      
      <div className={css.logo}>
            <Image className={css.img} src={Logo} alt="" width={55} height={50}/>

            <h2 className={css.logo_title} onClick={() => topFunction()}>
               Fudo - PizzaShop<span>.</span>
            </h2>
        </div>
      <div className={css.social_links}>
        <a href="https://facebook.com">
          <FacebookIcon className={css.social_link} />
        </a>
        <a href="gmail.com">
          <EmailIcon className={css.social_link} />
        </a>
        <a href="https://www.twitter.com">
          <TwitterIcon className={css.social_link} />
        </a>
        <a href="https://www.instagram.com">
          <InstagramIcon className={css.social_link} />
        </a>
      </div>
    </div>
  );
}

export default Footer;