
function createEmployeeRecord(array) {
    
    let employeeRecord = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
    
    return employeeRecord;
  }
  
  function createEmployeeRecords(employeeData) {
    
    let employeeRecords = [];
    
    
    employeeData.forEach(data => {
      let employeeRecord = createEmployeeRecord(data);
      employeeRecords.push(employeeRecord);
    });
    
    return employeeRecords;
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    
    let timeInEvent = {
      type: "TimeIn",
      date: dateTimeString.split(" ")[0],
      hour: parseInt(dateTimeString.split(" ")[1])
    };
    
    
    employeeRecord.timeInEvents.push(timeInEvent);
    
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    
    let timeOutEvent = {
      type: "TimeOut",
      date: dateTimeString.split(" ")[0],
      hour: parseInt(dateTimeString.split(" ")[1])
    };
    
    
    employeeRecord.timeOutEvents.push(timeOutEvent);
    
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    
    
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let payRate = employeeRecord.payPerHour;
    let wagesEarned = hoursWorked * payRate;
    
    return wagesEarned;
  }
  
  function allWagesFor(employeeRecord) {
    
    let totalWages = employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
      let date = timeInEvent.date;
      let wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return total + wagesEarned;
    }, 0);
    
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      let wages = allWagesFor(employeeRecord);
      return total + wages;
    }, 0);
    
    return totalPayroll;
  }
  
  
  let employeeData = [
    ["John", "Doe", "Manager", 20],
    ["Jane", "Smith", "Supervisor", 15]
  ];
  let employeeRecords = createEmployeeRecords(employeeData);
  
  
  createTimeInEvent(employeeRecords[0], "2023-07-07 09:00");
  createTimeInEvent(employeeRecords[1], "2023-07-07 08:30");
  
  
  createTimeOutEvent(employeeRecords[0], "2023-07-07 17:00");
  createTimeOutEvent(employeeRecords[1], "2023-07-07 16:30");
  
  
  let date = "2023-07-07";
  let wages = wagesEarnedOnDate(employeeRecords[0], date);
  console.log(`Wages earned on ${date}: $${wages}`);
  
  
  let totalWages = allWagesFor(employeeRecords[0]);
  console.log(`Total wages earned: $${totalWages}`);
  
  
  let totalPayroll = calculatePayroll(employeeRecords);
  console.log(`Total payroll: $${totalPayroll}`);
  