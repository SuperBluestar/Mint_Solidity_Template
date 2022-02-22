export const getError = (error: any) => {
    const errorMessage = "API Error, please try again.";
  
    if (error.name === "Fetch User") {
      return error.message;
    }
  
    if (!error.response) {
      console.error(`API ${error.config.url} not found`);
      return errorMessage;
    }
    if (process.env.NODE_ENV !== "production") {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    }
  
    if (error.response.data) {
      if (error.response.data.message) {
        return error.response.data.message;
      }
      if (error.response.data.errors) {
        return error.response.data.errors;
      }
    }
  
    return errorMessage;
};