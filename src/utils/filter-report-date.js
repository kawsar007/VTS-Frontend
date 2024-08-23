export function reportFilterByTimeRange(reports, startTime, endTime) {
  return reports.filter((report) => {
    const reportTime = parseInt(report.time);
    return reportTime >= startTime && reportTime <= endTime;
  });
}

// const filteredReports = reportFilterByTimeRange(myReports, startTime, endTime);
// console.log(filteredReports);

const myReports = [
  {
    ac: 0,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 0,
    fuel: "78",
    latitude: "23.165206",
    longitude: "90.208597",
    network_strength: 25,
    satellite: 6,
    speed: "0",
    temp: "28",
    time: "1721485944", // 20-07-24
  },
  {
    ac: 0,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165206",
    longitude: "90.208597",
    network_strength: 25,
    satellite: 6,
    speed: "0",
    temp: "28",
    time: "1721572344", // 21-07-24
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165399",
    longitude: "90.208253",
    network_strength: 25,
    satellite: 6,
    speed: "4",
    temp: "28",
    time: "1721658744",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165483",
    longitude: "90.207201",
    network_strength: 25,
    satellite: 6,
    speed: "15",
    temp: "28",
    time: "1721745144",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165522",
    longitude: "90.205934",
    network_strength: 25,
    satellite: 6,
    speed: "8",
    temp: "28",
    time: "1721831544",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165537",
    longitude: "90.205714",
    network_strength: 25,
    satellite: 6,
    speed: "4",
    temp: "28",
    time: "1721917944",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.165537",
    longitude: "90.205714",
    network_strength: 25,
    satellite: 6,
    speed: "0",
    temp: "28",
    time: "1722004344",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.166222",
    longitude: "90.205655",
    network_strength: 25,
    satellite: 6,
    speed: "25",
    temp: "28",
    time: "1722090744",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.167021",
    longitude: "90.205660",
    network_strength: 25,
    satellite: 6,
    speed: "6",
    temp: "28",
    time: "1722177144",
  },
  {
    ac: 1,
    "data-status": "A",
    door: [0, 0, 0, 0],
    engine: 1,
    fuel: "78",
    latitude: "23.167021",
    longitude: "90.205660",
    network_strength: 25,
    satellite: 6,
    speed: "6",
    temp: "28",
    time: "1722263544",
  },
];

function groupReportsByDate(reports) {
  return reports.reduce((groups, report) => {
    const date = new Date(parseInt(report.time) * 1000)
      .toISOString()
      .split("T")[0]; // Get the date part in YYYY-MM-DD format
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(report);
    return groups;
  }, {});
}

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

function filterReportsByTimeRange(reports, startTime, endTime) {
  return reports.filter((report) => {
    const reportTime = parseInt(report.time);
    return reportTime >= startTime && reportTime <= endTime;
  });
}

export function calculateDailyDistances(reports, startTime, endTime) {
  const filteredReports = filterReportsByTimeRange(reports, startTime, endTime);
  const groupedReports = groupReportsByDate(filteredReports);
  const dailyDistances = [];

  for (const date in groupedReports) {
    const dayReports = groupedReports[date];
    let totalDistance = 0;

    for (let i = 1; i < dayReports.length; i++) {
      const prevReport = dayReports[i - 1];
      const currReport = dayReports[i];
      const distance = haversineDistance(
        parseFloat(prevReport.latitude),
        parseFloat(prevReport.longitude),
        parseFloat(currReport.latitude),
        parseFloat(currReport.longitude)
      );
      totalDistance += distance;
    }

    dailyDistances.push({ date, totalDistance });
  }

  return dailyDistances;
}

// Example usage:
const startTime = "1721485944"; // replace with the actual start epoch time
const endTime = "1721572344"; // current epoch time as end time

const dailyDistances = calculateDailyDistances(myReports, startTime, endTime);
console.log(dailyDistances);
