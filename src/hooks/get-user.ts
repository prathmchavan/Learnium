export const getUser = () => {
    if (typeof window !== 'undefined') {
      try {
        const user = localStorage?.getItem("user");
        // Return parsed user object if available, otherwise false
        return user;
      } catch (error) {
        console.error("Error retrieving user from localStorage:", error);
        return false;
      }
    }
    return false;
  };
  