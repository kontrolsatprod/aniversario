// src/components/Desktop/Menu/Menu.jsx
import {useState, useEffect} from "react";
import MenuButton from "./MenuButton";
import getSalesData from "../../../api/get_sales";
import CategoryModal from "./CategoryModal";
import SubcategoryModal from "./SubcategoryModal";
import ProductList from "../Product/ProductList";
import AllProductsModal from "./AllProductsModal";
import {useConfig} from "../../../config/configContext";

const CATEGORY_LEVEL = 2; // 0=raiz, 1=todos, 2=categoria
const SUBCATEGORY_LEVEL = 3;

const getCategoryCrumb = (p) => p.breadcrumbs[CATEGORY_LEVEL];
const getSubcategoryCrumb = (p) => p.breadcrumbs[SUBCATEGORY_LEVEL];

export default function Menu() {
    const cfg = useConfig();
    const defaultListTitle = cfg?.ProductList?.title || "Destaques";

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcat, setSelectedSubcat] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [showSubcats, setShowSubcats] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    useEffect(() => {
        (async () => {
            const {products} = await getSalesData();
            setProducts(products);

            const uniqueCats = Array.from(
                new Map(
                    products
                        .map(getCategoryCrumb)
                        .filter(Boolean)
                        .map((crumb) => [crumb.name, crumb])
                ).values()
            );
            setCategories(uniqueCats);

            if (products.length) {
                const shuffled = [...products].sort(() => 0.5 - Math.random());
                setDisplayedProducts(shuffled.slice(0, 4));
            }
        })();
    }, []);

    const handleCategoryClick = () => {
        setShowCategories(true);
        setShowSubcats(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubcat(null);
        setShowCategories(false);

        const filtered = products.filter(
            (p) => getCategoryCrumb(p)?.name === category.name
        );
        setDisplayedProducts(filtered);
    };

    const handleSubcategoryClick = () => {
        if (!selectedCategory) {
            alert("Por favor, selecione uma categoria primeiro.");
            return;
        }
        const subcats = Array.from(
            new Map(
                products
                    .filter((p) => getCategoryCrumb(p)?.name === selectedCategory.name)
                    .map(getSubcategoryCrumb)
                    .filter(Boolean)
                    .map((crumb) => [crumb.name, crumb])
            ).values()
        );
        setSubcategories(subcats);
        setShowSubcats(true);
    };

    const handleSubcategorySelect = (subcategory) => {
        setSelectedSubcat(subcategory);
        setShowSubcats(false);

        const filtered = products.filter(
            (p) =>
                getCategoryCrumb(p)?.name === selectedCategory.name &&
                getSubcategoryCrumb(p)?.name === subcategory.name
        );
        setDisplayedProducts(filtered);
    };

    const handleVerTodosClick = () => setShowIframe(true);

    return (
        <div className="text-center py-8 mt-12">
            <div className="container mx-auto flex flex-wrap justify-between mb-4">
                <MenuButton text="Ver Todos" onClick={handleVerTodosClick}/>
                <MenuButton
                    text="Destaques"
                    onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubcat(null);
                        if (products.length) {
                            const shuffled = [...products].sort(() => 0.5 - Math.random());
                            setDisplayedProducts(shuffled.slice(0, 100));
                        }
                    }}
                />
                <MenuButton
                    text={selectedCategory ? selectedCategory.name : "Categoria"}
                    onClick={handleCategoryClick}
                />
                <MenuButton
                    text={selectedSubcat ? selectedSubcat.name : "SubCategoria"}
                    onClick={handleSubcategoryClick}
                />
            </div>

            <ProductList
                title={
                    selectedSubcat
                        ? selectedSubcat.name
                        : selectedCategory
                            ? selectedCategory.name
                            : defaultListTitle
                }
                products={displayedProducts}
            />

            {showCategories && (
                <CategoryModal
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                    onClose={() => setShowCategories(false)}
                />
            )}

            {showSubcats && (
                <SubcategoryModal
                    subcategories={subcategories}
                    selectedCategory={selectedCategory}
                    onSelectSubcategory={handleSubcategorySelect}
                    onClose={() => setShowSubcats(false)}
                />
            )}

            {showIframe && (
                <AllProductsModal
                    products={products}
                    onClose={() => setShowIframe(false)}
                />
            )}
        </div>
    );
}
