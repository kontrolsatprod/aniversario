// src/components/Desktop/BannerProduct/BannerProduct.jsx
import {useEffect, useMemo, useState} from "react";
import {useConfig} from "../../../config/configContext";
import getSalesData from "../../../api/get_sales";
import ProductItemBanner from "../Product/ProductItemBanner";

const PRODUCTS_PER_BANNER = 2;

export default function BannerProduct() {
    const cfg = useConfig();

    // Ler imagens + links do adapter (desktop)
    const img1 = cfg?.SpecificBanners?.banner_1_desktop;
    const img2 = cfg?.SpecificBanners?.banner_2_desktop;
    const href1 = cfg?.SpecificBanners?.banner_1_src || "#";
    const href2 = cfg?.SpecificBanners?.banner_2_src || "#";

    // Monta um array simples de banners desktop
    const banners = useMemo(
        () =>
            [
                {image: img1, target: href1, position: "left"},
                {image: img2, target: href2, position: "right"},
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
                const {products: allProducts} = await getSalesData();
                if (abort) return;

                if (!allProducts?.length || !banners.length) {
                    setBlocks([]);
                    return;
                }

                const pickRandom = (arr, n) =>
                    [...arr].sort(() => 0.5 - Math.random()).slice(0, n);

                const blocksBuilt = banners.map((banner) => ({
                    banner,
                    products: pickRandom(allProducts, PRODUCTS_PER_BANNER),
                }));

                setBlocks(blocksBuilt);
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
            <div className="flex justify-center items-center py-20">
                <svg className="animate-spin h-10 w-10" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!blocks.length) return <p className="text-center text-gray-500">Sem banners disponíveis</p>;

    return (
        <div className="container mx-auto py-12 px-4">
            {blocks.map(({banner, products}, idx) => {
                const isLeft = banner.position === "left";
                const flexDirection = isLeft ? "md:flex-row" : "md:flex-row-reverse";

                return (
                    <div
                        key={idx}
                        className={`flex flex-col ${flexDirection} items-center mb-12 bg-white`}
                    >
                        {/* Banner */}
                        <a
                            href={banner.target || "#"}
                            className="flex-1 md:w-1/2 h-full flex items-center justify-center "
                            aria-label={`Banner ${idx + 1}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={banner.image}
                                alt={`Banner ${idx + 1}`}
                                className="w-full h-full object-cover rounded-3xl"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://via.placeholder.com/600x400?text=Banner";
                                }}
                            />
                        </a>

                        {/* Produtos */}
                        <div className="flex-1 md:w-1/2 mx-6 flex flex-col">
                            <div className="flex gap-5 flex-wrap">
                                {products.map((p) => (
                                    <ProductItemBanner key={p.id_product} product={p}/>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
