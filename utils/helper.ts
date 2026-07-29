export const getToken = () => {
  // comment
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
