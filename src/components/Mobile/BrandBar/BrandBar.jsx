// src/components/Mobile/BrandBar/BrandBarMobile.jsx
import {useConfig} from "../../../config/configContext";

export default function BrandBarMobile() {
    const cfg = useConfig();
    const bb = cfg?.BrandBarConfig || {};

    const bg = bb.backgroundColor ?? "#0075cf";
    const logoUrl =
        bb.logoUrl ??
        "https://www.kontrolsat.com/img/kontrolsat-logo-1715622139.jpg";
    const logoAlt = bb.logoAlt ?? "Kontrolsat Logo";
    const logoWidth = bb.logoWidth ?? 160; // px

    return (
        <div
            className="w-full h-20 flex justify-center items-center"
            style={{backgroundColor: bg}}
        >
            <a
                href="https://www.kontrolsat.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={logoUrl}
                    alt={logoAlt}
                    style={{width: logoWidth, height: "auto"}}
                />
            </a>
        </div>
    );
}
