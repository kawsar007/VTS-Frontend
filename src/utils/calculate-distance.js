import haversine from "haversine-distance";

export const calculateDistance = (coord1, coord2) => {
  const point1 = {
    latitude: parseFloat(coord1.latitude),
    longitude: parseFloat(coord1.longitude),
  };
  const point2 = {
    latitude: parseFloat(coord2.latitude),
    longitude: parseFloat(coord2.longitude),
  };

  return haversine(point1, point2);
};
