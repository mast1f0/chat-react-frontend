  //чтобы время было в формате часы: минуты а не iso
  export default function formatTime(isoString: string){
    return new Date(isoString).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };