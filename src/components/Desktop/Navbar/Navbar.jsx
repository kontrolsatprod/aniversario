// src/components/Desktop/Navbar/Navbar.jsx
import {useEffect, useState} from "react";
import {useConfig} from "../../../config/configContext.jsx";

function Modal({open, onClose, title, children}) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="absolute inset-0 bg-black/60"/>
            <div className="relative z-10 w-[95vw] max-w-5xl rounded-xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        aria-label="Fechar"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-4">
                    <div className="w-full" style={{aspectRatio: "16/9"}}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Navbar() {
    const cfg = useConfig() || {};
    const nav = cfg.NavbarConfig || {};

    const [openHow, setOpenHow] = useState(false);
    const [openKlarna, setOpenKlarna] = useState(false);

    return (
        <div
            className="lp-nav-scope w-full"
            style={{
                backgroundColor: nav.backgroundColor || "#0075cf",
                // variáveis para o CSS do hover
                "--nav-text": nav.textColor || "#ffffff",
                "--nav-text-hover": nav.hoverTextColor || "#ff3b30",
            }}
        >
            <div className="mx-auto max-w-7xl px-4">
                <ul className="flex h-16 items-center justify-center gap-8 md:gap-12">
                    <li>
                        <button
                            type="button"
                            onClick={() => setOpenHow(true)}
                            className="lp-nav-link uppercase tracking-wide font-semibold transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
                        >
                            <span className="mr-2" aria-hidden>🛒</span>
                            Como Encomendar
                        </button>
                    </li>

                    <li className="border-x border-white/30 px-4">
                        <button
                            type="button"
                            onClick={() => setOpenKlarna(true)}
                            className="lp-nav-link uppercase tracking-wide font-semibold transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
                        >
                            <span className="mr-2" aria-hidden>💳</span>
                            Pagar 3x sem Juros
                        </button>
                    </li>

                    <li>
                        <a
                            href="https://api.whatsapp.com/send/?phone=351917387532&text=Bem-Vindo%20ao%20Grupo%20Premium%20da%20Kontrolsat!%20Envia-nos%20uma%20mensagem%20no%20Whatsapp%20com%20%22TEU%20NOME%22%20e%20%22PREMIUM%22%20-%20grava%20o%20nosso%20contacto%20no%20teu%20telem%C3%B3vel%20para%20conseguir%20receber%20as%20mensagens."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lp-nav-link uppercase tracking-wide font-semibold transition-colors px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
                        >
                            <span className="mr-2" aria-hidden>💬</span>
                            Grupo Whatsapp
                        </a>
                    </li>
                </ul>
            </div>

            <Modal
                open={openHow}
                onClose={() => setOpenHow(false)}
                title="Como Encomendar na Kontrolsat"
            >
                <iframe
                    className="h-full w-full rounded-md"
                    src="https://www.youtube.com/embed/cY9h11D_KwE?si=fOyUm7xDbem3fmYl"
                    title="YouTube - Como encomendar"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </Modal>

            <Modal
                open={openKlarna}
                onClose={() => setOpenKlarna(false)}
                title="Encomendar com Klarna"
            >
                <iframe
                    className="h-full w-full rounded-md"
                    src="https://player.vimeo.com/video/712027755?h=549e41ef62"
                    title="Vimeo - Encomendar com Klarna"
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </Modal>
        </div>
    );
}
