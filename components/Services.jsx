import Image from 'next/image'
import css from '../styles/services.module.css'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'

export default function Services() {
    return(
        <>
          <div className={css.heading}>
              <span>WHAT WE SERVE</span>
              <span>Your Favourite Food</span>
              <span>Delivery Partner</span>
          </div>

           {/* features */}
           <div className={css.services}>
            <div className={css.feature}>
                <div className={css.ImageWrapper}>
                    <Image src={s1} alt="" objectFit='cover' layout='intrinsic'/>
                </div>
                <span>Easy to Order</span>
                <span>You only need a few steps in food ordering</span>
            </div>
            <div className={css.feature}>
                <div className={css.ImageWrapper}>
                    <Image src={s2} alt="" objectFit='cover' layout='intrinsic'/>
                </div>
                <span>Fast Delivery</span>
                <span>Fast delivery to your home or office</span>
            </div>
            <div className={css.feature}>
                <div className={css.ImageWrapper}>
                    <Image src={s3} alt="" objectFit='cover' layout='intrinsic'/>
                </div>
                <span>Secure Payment</span>
                <span>We ensure the security of your payment</span>
            </div>
           </div>
        </>
    )
}