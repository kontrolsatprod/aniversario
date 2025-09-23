import {VerTodosDescontosConfig} from "../../../api/config.jsx";

const VerTodosButton = () => {
    return (
        <div className="container w-100 flex items-center text-center justify-center h-24">
            <a
                href="https://www.kontrolsat.com/pt/promocoes"
                className="w-100 py-2 rounded-md text-white font-black text-xl uppercase hover:bg-kontrolsatVerde hover:scale-105 transition duration-300 ease-in-out"
                style={{backgroundColor: VerTodosDescontosConfig.bgColor, color: VerTodosDescontosConfig.color}}
                target="_blank"
            >
                {VerTodosDescontosConfig.text}
            </a>
        </div>
    );
};

export default VerTodosButton;
