// src/adapter/buildConfigFromData.jsx
const BLUE = "#0075cf";
const WHITE = "#ffffff";
const CYAN = "#02b5e5";

function safeJson(input, fallback) {
    try {
        if (!input) return fallback;
        const val = typeof input === "string" ? JSON.parse(input) : input;
        return val ?? fallback;
    } catch {
        return fallback;
    }
}

export function buildConfigFromData(data = {}) {
    const cards = safeJson(data.cards_precos_json || "[]", []);


    return {
        BrandBarConfig: {backgroundColor: data.brandbar_bg || BLUE},

        NavbarConfig: {
            backgroundColor: data.navbar_bg || BLUE,
            textColor: data.navbar_text || WHITE,
            hoverTextColor: data.navbar_text_hover || "#ff3b30",
        },

        BannerImages: {
            desktop: {href: data.banner_desktop_href || "", alt: data.banner_desktop_alt || ""},
            mobile: {href: data.banner_mobile_href || "", alt: data.banner_mobile_alt || ""},
            link: data.banner_link || "",
        },

        TitleInfo: {
            backgroundColor: data.title_bg || CYAN,
            title: data.title_text || "",
            titleColor: data.title_color || WHITE,
            subtitle: data.subtitle_text || "",
            subtitleColor: data.subtitle_color || WHITE,
        },

        // 👇 aqui vai o que te interessa
        CardsPrecosInfo: cards, // [{ id, texto, action, img }]
        CardsPrecoTitleInfo: {
            text: data.cards_preco_title || "Aproveita os nossos descontos exclusivos de aniversário! 🎁",
            // se quiseres: color/size controlados por manifest no futuro
        },

        MenuDesign: {
            btnText: data.menu_btn_text || WHITE,
            btnTextHover: data.menu_btn_text_hover || "#000000",
            btnBg: data.menu_btn_bg || "#0277d3",
            btnBgHover: data.menu_btn_bg_hover || "#ffffff",
            listBg: data.menu_list_bg || BLUE,
            listTitle: data.menu_list_title_text || "Escolha uma Categoria",
            listTitleColor: data.menu_list_title_color || WHITE,
            listItemsBg: data.menu_list_items_bg || WHITE,
            listItemsColor: data.menu_list_items_color || "#000000",
            listItemsHover: data.menu_list_items_hover || "#0277d3",
            icon: data.menu_list_icon || "🎁",
            closeText: data.menu_list_btn_text || "Fechar",
        },

        SpecificBanners: {
            banner_1_src: data.banner_1_src || "#",
            banner_2_src: data.banner_2_src || "#",
            banner_1_desktop:
                data.specific_banner_1_desktop || "https://placehold.co/600x600?text=Banner+Left",
            banner_2_desktop:
                data.specific_banner_2_desktop || "https://placehold.co/600x600?text=Banner+right",
            banner_1_mobile:
                data.specific_banner_1_mobile || data.specific_banner_1_desktop || "https://placehold.co/600x600?text=Banner+Left",
            banner_2_mobile:
                data.specific_banner_2_mobile || data.specific_banner_2_desktop || "https://placehold.co/600x600?text=Banner+right",
        },

        ProductList: {
            arrowBgColor: data.product_list_arrow_bg || "#ff0000",
            arrowTextColor: data.product_list_arrow_text || "#ffffff",
            title: data.product_list_title || "Dá uma vista de olhos nessas oportunidades",
            titleColor: data.product_list_title_color || "#000000",
        },
        ProductItem: {
            btnBg: data.product_item_btn_bg || "#fa3a3a",
            btnBgHover: data.product_item_btn_bg_hover || "#ff1409",
            btnText: data.product_item_btn_text || WHITE,
            icon: data.product_item_icon || "🎁",
        },
        SeeAll: {
            text: data.see_all_text || "VER TODOS DESCONTOS",
            color: data.see_all_color || "#ffffff",
            bgColor: data.see_all_bg || "#fa3a3a",
            href: data.see_all_href || "https://www.kontrolsat.com/pt/promocoes",
        },
        NewsletterBlockConfig: {
            bgColor: data.newsletter_bg || "#0075cf",
            btnBgColor: data.newsletter_btn_bg || "#fa3a3a",
            btnTextColor: data.newsletter_btn_tx || "#ffffff",
            textColor: data.newsletter_text_color || "#ffffff",

            // NOVOS campos de texto/controlos vindos do manifest
            title: data.newsletter_title ?? "Subscreve a Newsletter",
            subtitle: data.newsletter_subtitle ?? "para não perder ofertas",
            formAction:
                data.newsletter_form_action ??
                "https://kontrolsat.us14.list-manage.com/subscribe/post?u=9c2c13a48978e3a75c02338dd&id=4fcb3b857a&f_id=00b92ae1f0",
            namePlaceholder: data.newsletter_name_placeholder ?? "Nome",
            emailPlaceholder: data.newsletter_email_placeholder ?? "Email",
            btnLabel: data.newsletter_btn_label ?? "Enviar",
            // Honeypot (Mailchimp) opcional
            honeypotName:
                data.newsletter_honeypot_name ??
                "b_9c2c13a48978e3a75c02338dd_4fcb3b857a",
        },
        RandomProducts: {
            textColor: data.random_products_tx || "#000000",
            count: 8,
        },
    };
}
