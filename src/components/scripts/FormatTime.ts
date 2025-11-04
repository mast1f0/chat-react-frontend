  //чтобы время было в формате часы: минуты а не iso
  export default function formatTime(isoString: string | undefined | null){
    if (!isoString) {
      return "";
    }
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting time:", error, isoString);
      return "";
    }
  };