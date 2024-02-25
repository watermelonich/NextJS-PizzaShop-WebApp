import Image from "next/image";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import css from "../../styles/pizza.module.css";
import leftArrow from "../../assets/arrowLeft.png";
import rightArrow from "../../assets/arrowRight.png";
import { useState ,useEffect} from "react";
import { useStore } from "../../store/store";
import toast,{Toaster} from "react-hot-toast";


export default function Pizza({ pizza }) {
  const src = urlFor(pizza.image).url();
  const [Size, setSize] = useState(1);
  const [Quantity, setQuantity] = useState(1);

  //handle quantity
  const handleQuan = (type) => {
    type === "inc"
      ? setQuantity((prev) => prev + 1)
      : Quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  //setting cart data in local storage
  const cart = useStore((state) => state.cart.pizzas);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //add to cart
  const addPizza=useStore((state)=>state.addPizza)
  const addToCart = () => {
    addPizza({...pizza, price:pizza.price[Size], quantity:Quantity, size:Size})
    toast.success("Added to Cart")
  }

  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            src={src}
            loader={() => src}
            layout="fill"
            unoptimized
            objectFit="cover"
            alt=""
          />
        </div>

        {/* right side */}
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>$ </span>
            {pizza.price[Size]}
          </span>
          <div className={css.size}>
            <span>Size</span>
            <div className={css.sizeVariants}>
              <div
                onClick={() => setSize(0)}
                className={Size === 0 ? css.selected : ""}
              >
                Small
              </div>

              <div
                onClick={() => setSize(1)}
                className={Size === 1 ? css.selected : ""}
              >
                Medium
              </div>

              <div
                onClick={() => setSize(2)}
                className={Size === 2 ? css.selected : ""}
              >
                Large
              </div>
            </div>
          </div>

          {/* Quantity Counter */}
          <div className={css.quantity}>
            <span>Quantity</span>
            <div className={css.counter}>
              <Image
                src={leftArrow}
                width={20}
                height={20}
                objectFit="contain"
                alt=""
                onClick={()=>handleQuan("dec")}
              />
              <span>{Quantity}</span>
              <Image
                src={rightArrow}
                width={20}
                height={20}
                objectFit="contain"
                alt=""
                onClick={()=>handleQuan("inc")}
              />
            </div>
          </div>

          {/* Add to cart button */}
          <div className={`btn ${css.btn}`} onClick={()=>addToCart()}>Add to Cart</div>
        </div>
        <Toaster/>
      </div>
    </Layout>
  );
}

//static site generation and creating dynamic routes
export async function getStaticPaths() {
  const query = `*[_type == "pizza" && defined(slug.current)][].slug.current`;
  const pizzas = await client.fetch(query);

  const paths = pizzas.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

//getStaticProps means it is used to fetch data at build time
export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
  );

  return {
    props: {
      pizza,
    },
  };
}

//getStaticPaths means it is used to create dynamic routes

//In Next.js, getStaticProps is a function that allows you to fetch data at build time (in production) and pre-render
//the page with that data. This means that the data is available when the page is requested, without the need for an additional API call.

//slug.current is sanity schema field
//${slug} means it get from context object which is given by next js and it means url field slug of browser
//[0] means if there is multiple slug of of same match then return only one
