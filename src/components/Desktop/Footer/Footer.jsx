import {useConfig} from "../../../config/configContext";

export default function Footer() {
    const cfg = useConfig();
    const footer = cfg?.FooterConfig || {};

    const bg = footer.bgColor ?? "transparent";
    const text = footer.textColor ?? "#9ca3af"; // zinc-400
    const hover = footer.hoverColor ?? "#ffffff";

    // podes também tornar os links configuráveis via manifest:
    const links = footer.links ?? [
        {label: "Kontrolsat", href: "/"},
        {
            label: "Política de Privacidade",
            href: "https://www.kontrolsat.com/pt/info/politica-de-privacidade-2",
            external: true,
        },
        {
            label: "Termos e Condições",
            href: "https://www.kontrolsat.com/pt/info/termos-e-condicoes-de-venda-3",
            external: true,
        },
        {
            label: "Ajuda",
            href: "https://www.kontrolsat.com/pt/info/como-fazer-uma-encomenda-23",
            external: true,
        },
        {
            label: "Contactos",
            href: "https://www.kontrolsat.com/pt/info/contactos-27",
            external: true,
        },
    ];

    return (
        <div className="w-full" style={{backgroundColor: bg}}>
            <footer className="max-w-6xl mx-auto px-4 pt-6">
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-b border-zinc-700/40 pb-4">
                    {links.map((l) => (
                        <li key={l.label}>
                            <a
                                href={l.href}
                                target={l.external ? "_blank" : undefined}
                                rel={l.external ? "noreferrer" : undefined}
                                className="px-2 text-sm transition-colors"
                                style={{color: text}}
                                onMouseEnter={(e) => (e.currentTarget.style.color = hover)}
                                onMouseLeave={(e) => (e.currentTarget.style.color = text)}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <p
                    className="text-center text-xs py-4"
                    style={{color: text}}
                >
                    Copyright 2019–2024 Kontrolsat, Unip. Lda — All Rights Reserved
                </p>
            </footer>
        </div>
    );
}
