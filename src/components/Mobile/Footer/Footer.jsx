import {useEffect} from "react";

const FooterMobile = () => {
    return (
        <div className="container my-2 text-gray-400 hover:text-white">
            <footer className="mt-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <a
                            href="/"
                            className="nav-link px-2 text-gray-400 hover:text-white"
                        >
                            Kontrolsat
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="https://www.kontrolsat.com/pt/info/politica-de-privacidade-2"
                            className="nav-link px-2 text-gray-400 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Política de Privacidade
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="https://www.kontrolsat.com/pt/info/termos-e-condicoes-de-venda-3"
                            className="nav-link px-2 text-gray-400 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Termos e Condições
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="https://www.kontrolsat.com/pt/info/como-fazer-uma-encomenda-23"
                            className="nav-link px-2 text-gray-400 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ajuda
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            href="https://www.kontrolsat.com/pt/info/contactos-27"
                            className="nav-link px-2 text-gray-400 hover:text-white"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Contactos
                        </a>
                    </li>
                </ul>
                <p
                    className="text-center text-gray-3
        00 hover:text-white"
                >
                    Copyright 2019-2024 Kontrolsat, Unip. Lda - All Rights Reserved
                </p>
            </footer>
        </div>
    );
};

export default FooterMobile;
