// Compare daily rights changes
var service = appCtx.getBean("TaJournalService");
// Date Format is MM.dd.yyyy
var fromDateFormated = "09.06.2021";
var toDateFormated = "09.13.2021";

// var fromDate = Packages.at.workflow.webdesk.tools.date.DateTools.parse(fromDateFormated, "MM.dd.yyyy");
var taId = "19";
// Values configured in Stammsatz; TODO: Take values automatically from 6020
var dailyValues = {
  "twbue" : "N",
  "twbzus" : "N",
  "twbsw" : "N",
  "twbso1" : "N",
  "twbbonus" : "N",
  "twbzutritt" : "N",
  "twbzeiterf" : "N",
  "twbkst" : "N",
  "twbbde" : "N",
  "twbfrei1" : "N",
  "twbfrei2" : "N",
  "twbfrei3" : "N",
  "twbfrei4" : "N",
  "twbfrei5" : "N",
  "twbfrei6" : "N"};
// Values that dont work currently: stbue, stbzus, stbsw
// var stFields = java.util.Arrays.asList("stbso1","stbbonus","stbzutritt","stbzeiterf","stbkst","stbbde","stbfrei1","stbfrei2","stbfrei3","stbfrei4","stbfrei5","stbfrei6");
// var journal = service.getJournal(taId, fromDate, toDate, stFields);
// journal.getPersonValues()

// Get the daily values
var twFields = java.util.Arrays.asList("twbue","twbzus","twbsw","twbso1","twbbonus","twbzutritt","twbzeiterf","twbkst","twbbde","twbfrei1","twbfrei2","twbfrei3","twbfrei4","twbfrei5","twbfrei6");
// var journalDay = service.getJournalDay(taId, fromDate, twFields);
// journalDay.getValues()

var startingDate = new Date(fromDateFormated);
var endingDate = new Date(toDateFormated);

// To calculate the time difference of two dates
var differenceInTime = endingDate.getTime() - startingDate.getTime();

// To calculate the no. of days between two dates
var differenceInDays = differenceInTime / (1000 * 3600 * 24);

var currentlyCheckedDate = startingDate;
var list = [];

for (var i = 0; i <= differenceInDays; i++) {
  var dailyValuesOfADay = service.getJournalDay(taId, Packages.at.workflow.webdesk.tools.date.DateTools.parse(currentlyCheckedDate.toISOString().replace(/T.*/,"").split(/-(.+)/).slice(0, 2).reverse().join(".").replace("-", "."), "MM.dd.yyyy"), twFields).getValues();
  var sortable = [];
  // Separate 
  for (var value in dailyValuesOfADay) {
    sortable.push([value, dailyValuesOfADay[value]]);
  }
  // Sort fields of every day
  sortable.sort(function (a, b) {a[0] - b[0]});

  // Add the date to the begining of the list of accounts
  sortable.unshift("".concat(("0" + currentlyCheckedDate.getDate()).slice(-2), ".", ("0" + (currentlyCheckedDate.getMonth() + 1)).slice(-2), ".", currentlyCheckedDate.getFullYear()));

  list.push(sortable);

  currentlyCheckedDate = new Date(currentlyCheckedDate.getTime() + (1000 * 3600 * 24));
}

var problems = [];
for (var i = 0; i < list.length; i++) {
  for (var j = 1; j < list[i].length; j++) {
    if (list[i][j][1] !== dailyValues[list[i][j][0]]) {
      problems.push(JSON.stringify([list[i][0], list[i][j]]));
    }
  }
}

java.util.Arrays.asList(problems);