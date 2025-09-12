
export const toBrazilianFormat = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return null;
};

export const toInternationalFormat = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split("/");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return null;
};