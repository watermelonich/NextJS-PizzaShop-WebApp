import Layout from "../components/Layout";
import OrderModel from "../components/OrderModal";

export default function Success (){
  return(
    <Layout>
          <OrderModel opened={true} PaymentMethod={1}/>
    </Layout>
  )
}
