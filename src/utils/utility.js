export const getLogedInUser = () =>
  localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails")).user
    : null;

   export const calculateDuration = (startTime, endTime) => {
      return endTime - startTime;
    };
    
   export const formatDuration = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
    
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };
