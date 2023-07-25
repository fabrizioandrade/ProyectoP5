export const getCurrentDate = () => {
    const currentDate = new Date();
    const newDate = currentDate.toISOString().split("T")[0];
    return newDate;
  };
  
  export const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const newDate = maxDate.toISOString().split("T")[0];
    return newDate;
  };