import {useState} from "react";
import {useConfig} from "../../../config/configContext.jsx";

export default function CategoryModal({categories, onSelectCategory, onClose}) {
    const cfg = useConfig() || {};
    const listCfg = cfg.MenuListDesign || {};
    const [hoverIndex, setHoverIndex] = useState(-1);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog"
             aria-modal="true">
            <div
                className="shadow-xl rounded-lg p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative max-h-[90vh] overflow-y-auto"
                style={{backgroundColor: listCfg.bgColor || "#0075cf"}}
            >
                <button
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    &times;
                </button>

                <div className="text-center">
                    <h2
                        className="text-xl font-bold mb-6 flex justify-center items-center"
                        style={{color: listCfg.titleColor || "#fff"}}
                    >
                        <span className="mr-2">{listCfg.icon || "🎁"}</span>
                        {listCfg.titleText || "Escolha uma Categoria"}
                    </h2>
                </div>

                <div className="space-y-4">
                    {categories?.length ? (
                        categories.map((category, idx) => {
                            const hovered = hoverIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    className="block w-full font-medium py-3 px-4 rounded-md shadow-sm text-left uppercase transition"
                                    onClick={() => onSelectCategory(category)}
                                    style={{
                                        backgroundColor: listCfg.listBgColor || "#fff",
                                        color: hovered ? (listCfg.listTextColorHover || "#0277d3") : (listCfg.listTextColor || "#000"),
                                    }}
                                    onMouseEnter={() => setHoverIndex(idx)}
                                    onMouseLeave={() => setHoverIndex(-1)}
                                >
                                    {category.name}
                                </button>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-200">Carregar categorias...</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        className="py-2 px-6 rounded-md shadow-lg font-semibold transition"
                        onClick={onClose}
                        style={{backgroundColor: "#ef4444", color: "#fff"}}
                    >
                        {listCfg.textBtnFechar || "Fechar"} {listCfg.icon || "🎁"}
                    </button>
                </div>
            </div>
        </div>
    );
}
