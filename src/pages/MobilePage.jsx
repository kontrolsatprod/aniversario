import BrandBar from "../components/Mobile/BrandBar/BrandBar";
import HeroMobile from "../components/Mobile/Hero/Hero";
import Navbar from "../components/Mobile/Navbar/Navbar";
import Title from "../components/Mobile/Title/Title";
import CardsPrecos from "../components/Mobile/CardsPrecos/CardsPrecos";
import Menu from "../components/Mobile/Menu/Menu";
import BannerProduct from "../components/Mobile/BannerProduct/BannerProduct";
import RandomProductList from "../components/Mobile/RandomProductsList/RandomProductList";
import Newsletter from "../components/Mobile/Newsletter/Newsletter";
import Footer from "../components/Mobile/Footer/Footer";
import VerTodosBtn from "../components/Mobile/VerTodosBtn/VerTodosBtn";

const MobilePage = () => {
  return (
    <div>
      <BrandBar />
      <Navbar />
      <HeroMobile />
      <Title />
      <CardsPrecos />
      <Menu />
      <BannerProduct />
      <RandomProductList />
      <VerTodosBtn />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default MobilePage;
