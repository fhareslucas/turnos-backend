const getTodayRange = () => {
  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);

  const fin = new Date(inicio);
  fin.setDate(fin.getDate() + 1);

  return { inicio, fin };
};

const formatDate = (date) => {
  return date ? new Date(date).toLocaleString("es-GT") : null;
};

export { getTodayRange, formatDate };
