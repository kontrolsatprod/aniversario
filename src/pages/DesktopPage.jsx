import BrandBar from "../components/Desktop/BrandBar/BrandBar";
import Navbar from "../components/Desktop/Navbar/Navbar";
import Hero from "../components/Desktop/Hero/Hero";
import Title from "../components/Desktop/Title/Title";
import CardsPrecos from "../components/Desktop/CardsPrecos/CardsPrecos";
import Menu from "../components/Desktop/Menu/Menu";
import BannerProduct from "../components/Desktop/BannerProduct/BannerProduct";
import RandomProductList from "../components/Desktop/RandomProductsList/RandomProductList";
import Newsletter from "../components/Desktop/Newsletter/Newsletter";
import Footer from "../components/Desktop/Footer/Footer";
import VerTodosButton from "../components/Desktop/VerTodosBtn/VerTodosBtn";

const DesktopPage = () => {
    return (
        <div>
            <BrandBar/>
            <Navbar/>
            <Hero/>
            <Title/>
            <CardsPrecos/>
            <Menu/>
            <BannerProduct/>
            <RandomProductList/>
            <VerTodosButton/>
            <Newsletter/>
            <Footer/>
        </div>
    );
};

export default DesktopPage;
