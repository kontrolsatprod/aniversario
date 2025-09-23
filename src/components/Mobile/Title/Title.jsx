// src/components/Mobile/Title/Title.jsx
import {useConfig} from "../../../config/configContext";

export default function TitleMobile() {
    const cfg = useConfig();
    const tcfg = cfg?.TitleInfo || {};

    const bg = tcfg.backgroundColor ?? cfg?.TitleInfo?.backgroundColor ?? "#02b5e5";
    const title = tcfg.title ?? "";
    const titleColor = tcfg.titleColor ?? "#ffffff";
    const subtitle = tcfg.subtitle ?? "";
    const subtitleColor = tcfg.subtitleColor ?? "#ffffff";

    // se não houver nada para mostrar, não renderiza
    if (!title && !subtitle) return null;

    return (
        <div
            className="w-full h-auto py-3 px-4 flex flex-col items-center justify-center text-center"
            style={{backgroundColor: bg}}
            aria-labelledby="lp-title"
        >
            {title && (
                <h1
                    id="lp-title"
                    className="text-xl font-black uppercase mb-3"
                    style={{color: titleColor}}
                >
                    {title}
                </h1>
            )}
            {subtitle && (
                <p
                    className="text-base font-semibold whitespace-pre-line"
                    style={{color: subtitleColor}}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
