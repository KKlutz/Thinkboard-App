// Create a function to format date

export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("id-ID", {
    weekday: "long", // Senin, Selasa, etc.
    day: "2-digit", // 23
    month: "2-digit", // 06
    year: "numeric", // 2025
    timeZone: "Asia/Jakarta", // Optional, for local time
  });
};
