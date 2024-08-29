// Helper function to calculate distance between two points using the Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = degree => degree * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Helper function to convert epoch to readable date
export const convertEpochToDate = epochTime => {
  const date = new Date(epochTime * 1000); // Convert to milliseconds
  return date.toLocaleDateString(); // Adjust format as needed
};
