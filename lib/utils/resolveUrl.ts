export const resolveUrl = (id?: string) => {
  const base = `https://surprise-calendar-dfb14-default-rtdb.europe-west1.firebasedatabase.app/entry`;
  return id ? `${base}/${id}.json` : `${base}/.json`;
};
