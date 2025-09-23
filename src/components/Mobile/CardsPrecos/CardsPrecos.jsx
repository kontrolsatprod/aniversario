// src/components/Mobile/CardsPrecos/CardsPrecos.jsx
import {useConfig} from "../../../config/configContext.jsx";

export default function CardsPrecos() {
    const cfg = useConfig() || {};
    const items = Array.isArray(cfg.CardsPrecosInfo) ? cfg.CardsPrecosInfo : [];
    const title =
        cfg.CardsPrecoTitleInfo?.textMobile ??
        cfg.CardsPrecoTitleInfo?.text ??
        "";

    if (!items.length) return null;

    return (
        <section className="container mx-auto px-4 py-12 mt-2">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                    <div
                        key={item.id ?? item.img ?? item.action}
                        className="group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                        <a
                            href={item.action || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <img
                                src={item.img}
                                alt={item.texto || "Card"}
                                className="w-full h-auto object-cover rounded-lg transition-all duration-300 group-hover:opacity-85"
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    </div>
                ))}
            </div>

            {title && (
                <h2 className="mt-8 text-center text-xl font-bold uppercase tracking-wide">
                    {title}
                </h2>
            )}
        </section>
    );
}
