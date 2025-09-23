import { useState, useEffect } from "react";
import { useConfig } from "../../../config/configContext.jsx";
import MenuButton from "./MenuButton";
import getSalesData from "../../../api/get_sales";
import CategoryModal from "./CategoryModal";
import SubcategoryModal from "./SubcategoryModal";
import ProductList from "../Product/ProductList";
import AllProductsModal from "./AllProductsModal";

const CATEGORY_LEVEL = 2; // 0=Raiz, 1="Todos os produtos", 2=Categoria
const SUBCATEGORY_LEVEL = 3; // Filho imediato da categoria

const getCategoryCrumb = (p) => p?.breadcrumbs?.[CATEGORY_LEVEL];
const getSubcategoryCrumb = (p) => p?.breadcrumbs?.[SUBCATEGORY_LEVEL];

export default function Menu() {
  const cfg = useConfig() || {};
  const productListCfg = cfg.ProductListConfig || {};

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcat, setSelectedSubcat] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [showSubcats, setShowSubcats] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  // 1) carregar catálogo
  useEffect(() => {
    (async () => {
      const { products: all } = await getSalesData();
      setProducts(all || []);

      // categorias únicas pelo breadcrumb escolhido
      const unique = Array.from(
        new Map(
          (all || [])
            .map(getCategoryCrumb)
            .filter(Boolean)
            .map((crumb) => [crumb.name, crumb])
        ).values()
      );
      setCategories(unique);

      // destaques iniciais
      if (all?.length) {
        const shuffled = [...all].sort(() => 0.5 - Math.random());
        setDisplayedProducts(shuffled.slice(0, 4));
      }
    })();
  }, []);

  // 2) handlers
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
      alert("Seleciona uma categoria primeiro.");
      return;
    }

    const subs = Array.from(
      new Map(
        products
          .filter((p) => getCategoryCrumb(p)?.name === selectedCategory.name)
          .map(getSubcategoryCrumb)
          .filter(Boolean)
          .map((crumb) => [crumb.name, crumb])
      ).values()
    );

    setSubcategories(subs);
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

  // 3) render
  return (
    <div className="text-center">
      <div className="container mx-auto grid grid-cols-2 gap-3 justify-between mb-4 px-4">
        <MenuButton text="Ver Todos" onClick={handleVerTodosClick} />

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
            : productListCfg.title || "Produtos"
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
