export function convertToUnixTimestamp(dateTimeString) {
  // Split date and time
  const [datePart, timePart] = dateTimeString.split(" ");

  // Split date into year, month, and day
  const [year, month, day] = datePart.split("-").map(Number);

  // Split time into hours, minutes, and seconds
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Create a new Date object with the given date and time
  const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);

  // Get Unix timestamp (seconds since January 1, 1970, 00:00:00 UTC)
  const unixTimestamp = Math.floor(dateObject.getTime() / 1000);

  return unixTimestamp;
}

// Example usage:
// const dateTimeString = "2024-03-26 12:30:00";
// const unixTimestamp = convertToUnixTimestamp(dateTimeString);

// console.log("Unix Timestamp:", unixTimestamp);

export function convertNormalTimeToUnixTime(dateString) {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000);
}

// Example usage
// const dateStr = "June 1, 2024 00:00:00";
// const unixTimestamp = convertNormalTimeToUnixTime(dateStr);
// console.log("My Outputs--->", unixTimestamp); // Output: 1717200000
