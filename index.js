// Your code here
const createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (employeeArrayData) {
  return employeeArrayData.map(function (array) {
    return createEmployeeRecord(array);
  });
};

function createTimeInEvent(employeeRecord, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateStamp) => {
  let [date, hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, specificDate) {
  let inEventDate = employeeRecord.timeInEvents.find(
    (x) => x.date === specificDate
  );
  let outEventDate = employeeRecord.timeOutEvents.find(
    (x) => x.date === specificDate
  );

  return (outEventDate.hour - inEventDate.hour) / 100; // (200 / 2)
}

const wagesEarnedOnDate = (employeeRecord, specificDate) => {
  let wageOnDate =
    hoursWorkedOnDate(employeeRecord, specificDate) * employeeRecord.payPerHour;
  return wageOnDate;
};
const allWagesFor = (employeeRecord) => {
  let eligibleDates = employeeRecord.timeInEvents.map(function (x) {
    return x.date;
  });

  let grandWages = eligibleDates.reduce(function (accum, specificDate) {
    return accum + wagesEarnedOnDate(employeeRecord, specificDate);
  }, 0);

  return grandWages;
};
const calculatePayroll = (employeeRecord) => {
  return employeeRecord.reduce(function (accum, record) {
    return accum + allWagesFor(record);
  }, 0);
};
