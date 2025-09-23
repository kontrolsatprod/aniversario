// src/components/Desktop/CardsPrecos/CardsPrecos.jsx
import {useConfig} from "../../../config/configContext.jsx";

export default function CardsPrecos() {
    const cfg = useConfig() || {};
    const items = Array.isArray(cfg.CardsPrecosInfo) ? cfg.CardsPrecosInfo : [];
    const title = cfg.CardsPrecoTitleInfo?.text || "";

    return (
        <section className="container mx-auto px-4 py-12 mt-12 flex flex-col w-full items-center">
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((item) => (
                    <div
                        key={item.id ?? item.img ?? item.action}
                        className="group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                        <a href={item.action || "#"} target="_blank" rel="noopener noreferrer" className="block">
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
                <h1 className="mt-12 text-center text-2xl font-bold uppercase tracking-wide md:text-3xl">
                    {title}
                </h1>
            )}
        </section>
    );
}
