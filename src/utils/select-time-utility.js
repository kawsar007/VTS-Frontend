export const formatEpochToDateForTripReport = (epochTime) => {
  const date = new Date(epochTime * 1000);

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options).replace(',', '');
};

// export const formatDateTime = (date) => {
//   return new Date(date).toLocaleString("en-US", {
//     month: "short",
//     date: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });
// };

export const formatDateTime = (date) => {
  const validDate = new Date(date);

  if (isNaN(validDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  const day = String(validDate.getDate()).padStart(2, '0');
  const month = validDate.toLocaleString('default', { month: 'short' });
  const year = validDate.getFullYear();
  const hours = String(validDate.getHours()).padStart(2, '0');
  const minutes = String(validDate.getMinutes()).padStart(2, '0');
  const seconds = String(validDate.getSeconds()).padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
};

export const getTimeRange = (value) => {
  const now = new Date();
  let startTime = "";
  let endTime = "";

  switch (value) {
    case "current-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        0,
        0,
        0
      );
      endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        59,
        59,
        999
      );
      break;
    case "last-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 1,
        0,
        0,
        0
      );
      endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 1,
        59,
        59,
        999
      );
      break;
    case "last-2-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 2,
        now.getMinutes(),
        0,
        0
      );
      endTime = now;
      break;
    case "last-3-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 3,
        now.getMinutes(),
        0,
        0
      );
      endTime = now;
      break;
    case "last-6-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 6,
        now.getMinutes(),
        0,
        0
      );
      endTime = now;
      break;
    case "last-12-hour":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() - 12,
        now.getMinutes(),
        0,
        0
      );
      endTime = now;
      break;
    case "today":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );
      endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );
      break;
    case "yesterday":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1,
        0,
        0,
        0,
        0
      );
      endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1,
        23,
        59,
        59,
        999
      );
      break;
    case "this-week":
      startTime = new Date(now.setDate(now.getDate() - now.getDay()));
      startTime.setHours(0, 0, 0, 0);
      endTime = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      endTime.setHours(23, 59, 59, 999);
      break;
    case "last-week":
      startTime = new Date(now.setDate(now.getDate() - now.getDay() - 7));
      startTime.setHours(0, 0, 0, 0);
      endTime = new Date(now.setDate(now.getDate() - now.getDay() - 1));
      endTime.setHours(23, 59, 59, 999);
      break;
    case "this-month":
      startTime = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      endTime = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      break;
    case "last-month":
      startTime = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1,
        0,
        0,
        0,
        0
      );
      endTime = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
      break;
    default:
      startTime = "";
      endTime = "";
  }

  return {
    startTime: startTime ? formatDateTime(startTime) : "",
    endTime: endTime ? formatDateTime(endTime) : "",
  };
};
