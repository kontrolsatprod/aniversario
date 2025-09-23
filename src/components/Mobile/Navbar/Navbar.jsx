// src/components/Desktop/Navbar/Navbar.jsx
import {useState, useEffect, useCallback} from "react";
import {useConfig} from "../../../config/configContext";

function Modal({open, title, onClose, children}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded hover:bg-zinc-100"
                        aria-label="Fechar"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-0">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const cfg = useConfig();
    const nav = cfg?.NavbarConfig || {};
    const bg = nav.backgroundColor ?? "#0075cf";
    const text = nav.textColor ?? "#ffffff";
    const hoverText = nav.hoverTextColor ?? "#111111";

    const [openKlarna, setOpenKlarna] = useState(false);
    const [openComo, setOpenComo] = useState(false);

    // remove focus de botões quando se fecha modal (UX)
    const blurActive = useCallback(() => {
        const el = document.activeElement;
        if (el && "blur" in el) el.blur();
    }, []);

    useEffect(() => {
        if (!openKlarna && !openComo) blurActive();
    }, [openKlarna, openComo, blurActive]);

    const baseBtn =
        "font-semibold text-sm uppercase transition-colors duration-200 px-4 h-12 flex-1 flex items-center justify-center";
    const btnStyle = {color: text};
    const btnHoverStyle = {color: hoverText};

    return (
        <div className="w-full" style={{backgroundColor: bg}}>
            {/* Top line */}
            <div className="flex items-center justify-center h-12 border-b border-white/30">
                <button
                    type="button"
                    className={`${baseBtn} !flex-none !h-auto py-0`}
                    style={btnStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, btnStyle)}
                    onClick={() => setOpenKlarna(true)}
                >
                    Pagar 3x Sem Juros
                </button>
            </div>

            {/* Bottom row */}
            <div className="flex h-12">
                <button
                    type="button"
                    className={`${baseBtn} border-r border-white/30`}
                    style={btnStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, btnStyle)}
                    onClick={() => setOpenComo(true)}
                >
                    Como Encomendar
                </button>

                <a
                    href="https://api.whatsapp.com/send/?phone=351917387532&text=Bem-Vindo%20ao%20Grupo%20Premium%20da%20Kontrolsat!%20Envia-nos%20uma%20mensagem%20no%20Whatsapp%20com%20%22TEU%20NOME%22%20e%20%22PREMIUM%22%20-%20grava%20o%20nosso%20contacto%20no%20teu%20telem%C3%B3vel%20para%20conseguir%20receber%20as%20mensagens."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseBtn}
                    style={btnStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnHoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, btnStyle)}
                >
                    Grupo Premium
                </a>
            </div>

            {/* Modal: Como Encomendar */}
            <Modal open={openComo} title="Como Encomendar na Kontrolsat" onClose={() => setOpenComo(false)}>
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/cY9h11D_KwE?si=fOyUm7xDbem3fmYl"
                        title="Como encomendar"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </Modal>

            {/* Modal: Klarna */}
            <Modal open={openKlarna} title="Encomendar com Klarna" onClose={() => setOpenKlarna(false)}>
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://player.vimeo.com/video/712027755?h=549e41ef62"
                        title="Encomendar com Klarna"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </Modal>
        </div>
    );
}
