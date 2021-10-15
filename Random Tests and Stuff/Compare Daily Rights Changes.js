// Compare daily rights changes
var service = appCtx.getBean("TaJournalService");
var d1 = "01";
var m1 = "08";
var y1 = "2021";
var d2 = "13";
var m2 = "08";
var y2 = "2021";
// Expected daily Values
var twbue = "J";

var fromDate = Packages.at.workflow.webdesk.tools.date.DateTools.parse(d1 + "."+m1+"."+y1, "dd.MM.yyyy");
var toDate = Packages.at.workflow.webdesk.tools.date.DateTools.parse(d2 + "."+m2+"."+y2, "dd.MM.yyyy");
var taId = "1454";

// Get the daily values
var twFields = java.util.Arrays.asList("twbue","twbzus","twbsw","twbso1","twbbonus","twbzutritt","twbzeiterf","twbkst","twbbde","twbfrei1","twbfrei2","twbfrei3","twbfrei4","twbfrei5","twbfrei6");
// var journalDay = service.getJournalDay(taId, fromDate, twFields);
// journalDay.getValues()

// Values that dont work currently: stbue, stbzus, stbsw
var stFields = java.util.Arrays.asList("stbso1","stbbonus","stbzutritt","stbzeiterf","stbkst","stbbde","stbfrei1","stbfrei2","stbfrei3","stbfrei4","stbfrei5","stbfrei6");
// var journal = service.getJournal(taId, fromDate, toDate, stFields);
// journal.getPersonValues()

var date1 = new Date(m1 + "."+d1+"."+y1);
var date2 = new Date(m2 + "."+d2+"."+y2);

// To calculate the time difference of two dates
var differenceInTime = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
var differenceInDays = differenceInTime / (1000 * 3600 * 24);

var startingDate = date1;
var currentlyCheckedDate = startingDate;
var list = [];

for (var i = 0; i < differenceInDays; i++) {
  currentlyCheckedDate = new Date(currentlyCheckedDate.getTime() + (1000 * 3600 * 24));
  var values = service.getJournalDay(taId, fromDate, twFields).getValues();
  var sortable = [];

  for (var value in values) {
    sortable.push([value, values[value]]);
  }

  sortable.sort(function (a, b) {a[0] - b[0]});

  // var temp = [];
  // for (var i = 0; i < sortable.length; i++){
  //   temp.push(sortable[i][0] + " = " + sortable[i][1]);
  //   Object.assign({}, temp);
  // }

  list.push(sortable);
}

java.util.Arrays.asList(list);