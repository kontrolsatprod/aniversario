// src/components/Desktop/Hero/Hero.jsx
import {useConfig} from "../../../config/configContext.jsx";

// opcional: evita // duplicados no meio da URL
function normalizeUrl(url = "") {
    return url.replace(/([^:]\/)\/+/g, "$1");
}

export default function Hero() {
    const cfg = useConfig() || {};
    // O teu buildConfigFromData deve expor isto:
    // BannerImages: { desktop: {href, alt}, mobile: {href, alt}, link?: string }
    const banners = cfg.BannerImages || {};
    const desktop = banners.desktop || {};
    const mobile = banners.mobile || {};
    const link = banners.link; // se quiseres, podes suportar clicar no banner

    const Img = (
        <picture>
            {/* Mobile até 600px */}
            {mobile?.href && (
                <source
                    media="(max-width: 600px)"
                    srcSet={normalizeUrl(mobile.href)}
                />
            )}
            {/* Fallback e desktop */}
            <img
                src={normalizeUrl(desktop?.href || mobile?.href || "")}
                alt={desktop?.alt || mobile?.alt || "Banner"}
                className="w-full h-auto block"
                loading="eager"
                decoding="async"
                fetchpriority="high"
            />
        </picture>
    );

    // Se vier um link (ex.: para campanha), embrulha o banner
    if (link) {
        return (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                {Img}
            </a>
        );
    }

    return <div className="w-full">{Img}</div>;
}
