// src/components/Desktop/Title/Title.jsx
import {useConfig} from "../../../config/configContext.jsx";

export default function Title() {
    const cfg = useConfig() || {};
    const t = cfg.TitleInfo || {};

    const bg = t.backgroundColor || "#02b5e5";
    const title = t.title ?? "";
    const tColor = t.titleColor || "#ffffff";
    const sub = t.subtitle ?? "";
    const sColor = t.subtitleColor || "#ffffff";

    // mantém quebras de linha no subtítulo
    const subtitleLines = String(sub).split("\n");

    return (
        <div
            className="w-full py-6 md:py-8 flex flex-col items-center justify-center gap-3 text-center"
            style={{backgroundColor: bg}}
        >
            {title && (
                <h1
                    className="text-3xl md:text-4xl font-black uppercase tracking-wide"
                    style={{color: tColor}}
                >
                    {title}
                </h1>
            )}

            {sub && (
                <h2
                    className="text-xl md:text-2xl font-semibold leading-snug"
                    style={{color: sColor}}
                >
                    {subtitleLines.map((line, i) => (
                        <span key={i} className="block">
              {line}
            </span>
                    ))}
                </h2>
            )}
        </div>
    );
}
