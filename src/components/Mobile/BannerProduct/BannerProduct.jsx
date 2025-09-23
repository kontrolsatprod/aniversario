// src/components/Mobile/Menu/BannerProduct.jsx
import {useEffect, useMemo, useState} from "react";
import {useConfig} from "../../../config/configContext.jsx";
import getSalesData from "../../../api/get_sales";
import ProductItem from "../Product/ProductItem";

const PRODUCTS_PER_BANNER = 2;

export default function BannerProduct() {
    const cfg = useConfig();

    // Lê imagens MOBILE + links do adapter
    const img1 = cfg?.SpecificBanners?.banner_1_mobile;
    const img2 = cfg?.SpecificBanners?.banner_2_mobile;
    const href1 = cfg?.SpecificBanners?.banner_1_src || "#";
    const href2 = cfg?.SpecificBanners?.banner_2_src || "#";

    // array simples de banners (mobile)
    const banners = useMemo(
        () =>
            [
                {image: img1, target: href1},
                {image: img2, target: href2},
            ].filter((b) => !!b.image),
        [img1, img2, href1, href2]
    );

    const [blocks, setBlocks] = useState([]); // [{ banner, products }]
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let abort = false;

        (async () => {
            try {
                const {products: catalogue = []} = await getSalesData();
                if (abort) return;

                if (!catalogue.length || !banners.length) {
                    setBlocks([]);
                    return;
                }

                const pickRandom = (arr, n) =>
                    [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

                const built = banners.map((banner) => ({
                    banner,
                    products: pickRandom(catalogue, PRODUCTS_PER_BANNER),
                }));

                setBlocks(built);
            } catch (e) {
                console.error(e);
                setError("Falha ao carregar banners.");
            } finally {
                if (!abort) setLoading(false);
            }
        })();

        return () => {
            abort = true;
        };
    }, [banners]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!blocks.length) return <p className="text-center text-gray-500">Sem banners disponíveis</p>;

    return (
        <div className="container mx-auto py-12 px-4">
            {blocks.map(({banner, products}, idx) => (
                <section key={idx} className="rounded-xl overflow-hidden my-6">
                    {/* Banner — sem cortar (object-contain) com aspect ratio estável */}
                    <a
                        href={banner.target || "#"}
                        className="block w-full"
                        aria-label={`Banner ${idx + 1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div
                            className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105">
                            <img
                                src={banner.image}
                                alt={`Banner ${idx + 1}`}
                                className="w-full h-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/800x450?text=Banner";
                                }}
                            />
                        </div>
                    </a>

                    {/* Produtos (2 colunas no mobile) */}
                    <div className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            {products.map((p) => (
                                <ProductItem key={p.id_product} product={p}/>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
