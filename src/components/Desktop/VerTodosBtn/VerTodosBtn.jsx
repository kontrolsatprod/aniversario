import {useConfig} from "../../../config/configContext";

export default function VerTodosButton() {
    const cfg = useConfig();
    const seeAll = cfg?.SeeAll || {};

    const text = seeAll.text || "VER TODOS DESCONTOS";
    const color = seeAll.color || "#ffffff";
    const bg = seeAll.bgColor || "#fa3a3a";
    const href = seeAll.href || "https://www.kontrolsat.com/pt/promocoes";

    return (
        <div className="w-full flex items-center justify-center py-6">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-md font-black text-2xl uppercase transition
                   duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2
                   focus:ring-offset-2"
                style={{backgroundColor: bg, color}}
                aria-label={text}
            >
                {text}
            </a>
        </div>
    );
}
