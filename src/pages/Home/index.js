import { useSelector } from "react-redux";
import ListingPage from "../Listing";
import { ADDRESS_PAGE, CART_PAGE, LISTING_PAGE } from "../../constants/appConstants";
import AddressPage from "../Address";
import CartPage from "../Cart";
import Header from "../../components/header";
import styles from "../../index.module.css";

function Home() {
  const { screenType } = useSelector((state) => state.app);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        {screenType === LISTING_PAGE && <ListingPage />}
        {screenType === ADDRESS_PAGE && <AddressPage />}
        {screenType === CART_PAGE && <CartPage />}
      </div>
    </div>
  );
}

export default Home;
