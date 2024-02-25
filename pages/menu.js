import Image from "next/image";
import css from "../styles/menu.module.css";
import { urlFor } from "../lib/client";
import Link from 'next/link';
import Layout from "../components/Layout";
import { client } from "../lib/client";

export default function Menu({ pizzas }) {
  return (
    <Layout>
    <div className={css.container}>
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall In Love</span>
      </div>

      <div className={css.menu}>
        {/* pizzas */}
        {pizzas.map((pizza, id) => {
          const src = urlFor(pizza.image).url();

          return (
            <div key={id} className={css.pizza}>
            <Link href={`./pizza/${pizza.slug.current}`}>
              <div className={css.ImageWrapper}>
                <Image
                  loader={() => src}
                  src={src}
                  alt=""
                  objectFit="cover"
                  layout="fill"
                />
              </div>
            </Link>

            <div className={css.pizzaName}>
              <span>{pizza.name}</span>
              <span>
                <span>$</span> 
                {pizza.price[1]}
              </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
    const query = '*[_type == "pizza"]';
    const pizzas = await client.fetch(query);
    return {
      props: {
        pizzas,
      },
    };
  };
