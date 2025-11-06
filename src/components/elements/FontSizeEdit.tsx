import { useFontSize } from "../../FontSize";
import { useState } from "react";
export default function FontSizeControl() {
  const { fontSize, setFontSize } = useFontSize();
  const [temp, setTemp] = useState(fontSize.toString());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const num = Number(temp);
      if (num >= 10 && num <= 50) setFontSize(num);
      else setTemp(fontSize.toString());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(e.target.value)) setTemp(e.target.value);
  };

  return (
    <div className="w-full my-4 flex justify-center items-center">
      <label
        htmlFor="font-size"
        className="text-2xl"
        style={{ color: "black" }}
      >
        Шрифт:
      </label>
      <input
        id="font-size"
        type="number"
        min="10"
        max="50"
        value={temp}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="ml-2 w-16 text-center border border-gray-300 rounded"
      />
    </div>
  );
}
