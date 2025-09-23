// src/components/Mobile/Hero/HeroMobile.jsx
import {useConfig} from "../../../config/configContext";

export default function HeroMobile() {
    const cfg = useConfig();
    const href =
        cfg?.BannerImages?.mobile?.href ||
        cfg?.BannerImages?.desktop?.href || // fallback para desktop
        "";
    const alt =
        cfg?.BannerImages?.mobile?.alt ||
        cfg?.BannerImages?.desktop?.alt ||
        "Banner";

    if (!href) return null; // nada para mostrar

    return (
        <img
            src={href}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
        />
    );
}
