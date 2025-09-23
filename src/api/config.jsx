const WHITE = "#ffffff";
const BLACK = "#000000";

const BLUE_COLOR = "#0075cf";
const MIDDLE_BLUE = "#0277d3";
const LIGHT_BLUE = "#02b5e5"

const RED = "#ff1409";
const LIGHT_RED = "#fa3a3a";


export const BrandBarConfig = {
    backgroundColor: BLUE_COLOR
}

export const NavbarConfig = {
    backgroundColor: BLUE_COLOR
}


export const BannerImages = {
    desktop: {
        href: "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/banner_desktop.png",
        alt: "Aniversario Kontrolsat Banner Desktop",
    },
    mobile: {
        href: "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/banner_mobile.png",
        alt: "Aniversario Kontrolsat Banner Mobile",
    }
}

export const TitleInfo = {
    backgroundColor: LIGHT_BLUE,
    title: "🎉A MAIOR PROMOÇÃO DO ANO NA KONTROLSAT",
    titleColor: WHITE,
    subtitle: "Descontos até 50%\n" +
        "🚚 Portes grátis\n" +
        "⭐ Produtos exclusivos\n" +
        "…e muitas surpresas!",
    subtitleColor: WHITE,
}


export const CardsPrecosInfo = [
    {
        "id": 0,
        "texto": "Até 20€",
        "action": "http://www.kontrolsat.com/link/LW5GQT",
        "img": "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/card_1.png"
    },
    {
        "id": 1,
        "texto": "Até 60€",
        "action": "http://www.kontrolsat.com/link/DKAM9M",
        "img": "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/card_2.png"
    },
    {
        "id": 2,
        "texto": "Até 100€",
        "action": "Renova a tua cozinha e poupe!",
        "img": "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/card_3.png"
    },
    {
        "id": 3,
        "texto": "Promoções de Air Fryer",
        "img": "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/card_4.png",
        "action": "http://www.kontrolsat.com/link/078IE2"
    },
];

export const CardsPrecoTitleInfo = {
    contentDesktop: (
        <h1 className="mb-8 text-3xl font-bold uppercase text-black tracking-wide md:text-4xl text-center mt-12">
            Aproveita os nossos
            <br/>
            descontos exclusivos de aniversário! 🎁
        </h1>
    ),

    contentMobile: (
        <h1 className="mb-8 text-2xl font-bold uppercase text-black tracking-wide md:text-4xl text-center mt-12">
            Aproveita os nossos
            <br/>
            descontos exclusivos de aniversário! 🎁
        </h1>
    )
};

export const MenuButtonDesign = {
    textColor: WHITE,
    textColorHover: BLACK,
    bgColor: MIDDLE_BLUE,
    bgColorHover: WHITE,
}

export const AllProductsModalConfig = {
    bgColor: WHITE,
    titleColor: BLACK,
    icon: "🎁"
}

export const MenuListDesign = {
    bgColor: BLUE_COLOR,
    titleColor: WHITE,
    titleText: "Escolha uma Categoria",
    textBtnFechar: "Fechar",
    listBgColor: WHITE,
    listTextColorHover: MIDDLE_BLUE,
    listTextColor: BLACK,
    icon: "🎁"
}


export const specific_banner_list = {
    banner_1: {
        image: "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/cat_1.png",
        products_id: [9825, 6314],
        position: "left",
        target: "http://www.kontrolsat.com/link/96VB5T"
    },
    banner_2: {
        image: "https://www.kontrolsat.com/modules/r_blacksat/views/img/aniversario/cat_2.png",
        products_id: [7864, 2608], // Changed from product_id to products_id
        position: "right",
        target: "http://www.kontrolsat.com/link/S7ZP3E"
    },
};

export const ProductListConfig = {
    title: "Dá uma vista de olhos nessas oportunidades",
    titleColor: BLACK,
    arrowBgColor: LIGHT_RED,
    arrowTextColor: WHITE,
}

export const ProductItemConfig = {
    btnComprarBgColor: LIGHT_RED,
    btnComprarBgColorHover: RED,
    btnComprarTextColor: WHITE,
    icon: "🎁"
}

export const VerTodosDescontosConfig = {
    text: "VER TODOS DESCONTOS",
    color: WHITE,
    bgColor: LIGHT_RED
}

export const NewsletterBlockConfig = {
    bgColor: BLUE_COLOR,
    btnBgColor: LIGHT_RED,
    btnTextColor: WHITE,
}

export const RandomProductListConfig = {
    textColor: BLACK,
}