// src/components/Desktop/Menu/SubcategoryModal.jsx
import {useConfig} from "../../../config/configContext";
import {useState} from "react";

export default function SubcategoryModal({
                                             subcategories,
                                             selectedCategory,
                                             onSelectSubcategory,
                                             onClose,
                                         }) {
    const cfg = useConfig();
    const ui = cfg?.MenuDesign || {};
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="shadow-xl rounded-lg p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative max-h-[90vh] overflow-y-auto"
                style={{backgroundColor: ui.listBg || ui.listBgColor || "#ffffff"}}
            >
                <button
                    className="absolute top-4 right-4 text-gray-200 hover:text-white text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    &times;
                </button>

                <div className="text-center">
                    <h2
                        className="text-3xl font-bold mb-6 flex justify-center items-center"
                        style={{color: ui.listTitleColor || ui.titleColor || "#ffffff"}}
                    >
                        {selectedCategory?.name} <span className="ml-2">{ui.icon || "🎁"}</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {subcategories.length > 0 ? (
                        subcategories.map((subcategory, i) => {
                            const hovered = i === hoverIndex;
                            const color = hovered
                                ? ui.listItemsHover || ui.listTextColorHover || "#0277d3"
                                : ui.listItemsColor || ui.listTextColor || "#000000";

                            return (
                                <button
                                    key={subcategory.name}
                                    className="block w-full uppercase font-medium py-3 px-4 rounded-md shadow-sm text-left transition duration-200"
                                    onClick={() => onSelectSubcategory(subcategory)}
                                    style={{backgroundColor: ui.listItemsBg || ui.listBgColor || "#ffffff", color}}
                                    onMouseEnter={() => setHoverIndex(i)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                >
                                    {subcategory.name}
                                </button>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-600">Nenhuma subcategoria encontrada.</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        className="py-2 px-6 rounded-md shadow-lg font-semibold transition duration-200 w-full"
                        onClick={onClose}
                        style={{
                            backgroundColor: "#ef4444",
                            color: "#fff",
                        }}
                    >
                        {ui.closeText || ui.textBtnFechar || "Fechar"} {ui.icon || "🎁"}
                    </button>
                </div>
            </div>
        </div>
    );
}
