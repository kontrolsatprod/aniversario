// src/components/Desktop/Menu/MenuButton.jsx
import {useState} from "react";
import {useConfig} from "../../../config/configContext";

export default function MenuButton({text, onClick, disabled = false}) {
    const cfg = useConfig();
    const ui = cfg?.MenuButton || cfg?.MenuButtonDesign || {}; // compat fallback

    const [hover, setHover] = useState(false);

    const bg = hover ? (ui.bgHover || ui.bgColorHover) : (ui.bg || ui.bgColor);
    const fg = hover ? (ui.textHover || ui.textColorHover) : (ui.text || ui.textColor);

    const styles = {
        backgroundColor: bg || "#0277d3",
        color: fg || "#ffffff",
        opacity: disabled ? 0.6 : 1,
    };

    return (
        <button
            type="button"
            className="w-full sm:w-1/4 h-16 px-8 uppercase font-bold text-lg md:text-xl
                 cursor-pointer transition-shadow duration-300
                 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            style={styles}
            onClick={disabled ? undefined : onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            aria-label={text}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
