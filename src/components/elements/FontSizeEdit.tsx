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
    <div style={{ marginBottom: "1rem" }}>
      <label style={{color:"black"}} className="text-2xl" htmlFor="font-size">Шрифт :</label>
      <input
        id="font-size"
        type="numeric"
        min="10"
        max="50"
        value={temp}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ marginLeft: "0.5rem" }}
      />
    </div>
  );
}