import { ReactSVG } from "react-svg"

export default function BackToMainButton(){
    return <div className="mx-5 my-5">
        <a
          href="/"
          aria-label="Настройки"
          className="w-8 h-8 rounded-b-lg flex items-center justify-center no-underline transform transition-transform duration-200 hover:scale-125"
        >
          <ReactSVG
            className="btn-icon"
            src="/src/assets/back.svg"
            style={{ maxWidth: 51, maxHeight: 51 }}
          />
        </a>
    </div>
}