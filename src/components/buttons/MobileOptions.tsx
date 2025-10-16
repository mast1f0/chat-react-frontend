import { useState } from "react";

export default function MobileOptions() {
    const [isOpen, setOpen] = useState(false);
    const handleClick = () => setOpen(!isOpen);

    return (
        <div>
            <button
                onClick={handleClick}
                aria-label="Настройки"
                className="bg-[#E1E0E1] rounded-full flex items-center justify-center transition-transform w-16 h-16 duration-200 hover:scale-110" //подправить адаптивность
            >
                <img
                    src="/src/assets/setting-button.svg"
                    alt="Настройки"
                    className="w-11 h-11 object-contain"
                />
            </button>
            {isOpen && <div>d</div>}
        </div>
    );
}
