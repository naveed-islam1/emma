export const getUserFromStorage = () => {
  if (typeof window === "undefined") return null;

  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

export const setUserToStorage = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("user");
};
