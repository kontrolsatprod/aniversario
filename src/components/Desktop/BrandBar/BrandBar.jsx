// src/components/Desktop/BrandBar/BrandBar.jsx
import {useMemo} from "react";
import {useConfig} from "../../../config/configContext.jsx";

function normalizeHex(color, fallback = "#0075cf") {
    if (typeof color !== "string") return fallback;
    const c = color.trim();
    // aceita #RGB, #RRGGBB, rgb(), etc. (para o nosso caso, basta hex)
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c) ? c : fallback;
}

function normalizeUrl(url = "") {
    // remove // duplicado entre domínio e path
    return url.replace(/([^:]\/)\/+/g, "$1");
}

export default function BrandBar() {
    const cfg = useConfig() || {};
    const brand = cfg.BrandBarConfig || {};

    // permite desativar a barra caso o manifest venha com "enabled: false"
    if (brand.enabled === false) return null;

    const bg = useMemo(
        () => normalizeHex(brand.backgroundColor, "#0075cf"),
        [brand.backgroundColor]
    );

    const logoUrl = normalizeUrl(
        brand.logoUrl ||
        "https://www.kontrolsat.com/img/kontrolsat-logo-1715622139.jpg"
    );

    const linkHref = brand.linkHref || "https://www.kontrolsat.com/";
    const height = brand.height ?? 80; // px — se um dia quiseres expor no manifest

    return (
        <div
            className="w-full flex justify-center items-center"
            style={{backgroundColor: bg, height}}
            role="banner"
            data-testid="brandbar"
        >
            <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kontrolsat — ir para página inicial"
                className="inline-flex"
            >
                <img
                    src={logoUrl}
                    alt={brand.logoAlt || "Kontrolsat Logo"}
                    className="h-10 md:h-12 w-auto"
                    loading="lazy"
                    decoding="async"
                />
            </a>
        </div>
    );
}
