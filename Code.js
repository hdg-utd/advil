function updateDraft(event) {
  return [buildTimeCard()];
}

function builder() {
  var monday1 = getMonday();
  monday1.setHours(9);
  var monday2 = getMonday();
  monday2.setHours(17);
  var mondayEvents = CalendarApp.getEvents(monday1, monday2);
  var mondayExtract = eventExtractor(mondayEvents);
  
  var tuesday1 = getTuesday();
  tuesday1.setHours(9);
  var tuesday2 = getTuesday();
  tuesday2.setHours(17);
  var tuesdayEvents = CalendarApp.getEvents(tuesday1, tuesday2);
  var tuesdayExtract = eventExtractor(tuesdayEvents);
  
  var wednesday1 = getWednesday();
  wednesday1.setHours(9);
  var wednesday2 = getWednesday();
  wednesday2.setHours(17);
  var wednesdayEvents = CalendarApp.getEvents(wednesday1, wednesday2);
  var wednesdayExtract = eventExtractor(wednesdayEvents);
  
  var thursday1 = getThursday();
  thursday1.setHours(9);
  var thursday2 = getThursday();
  thursday2.setHours(17);
  var thursdayEvents = CalendarApp.getEvents(thursday1, thursday2);
  var thursdayExtract = eventExtractor(thursdayEvents);
  
  var friday1 = getFriday();
  friday1.setHours(9);
  var friday2 = getFriday();
  friday2.setHours(17);
  var fridayEvents = CalendarApp.getEvents(friday1, friday2);
  var fridayExtract = eventExtractor(fridayEvents);
  
  var result = [];
  result.push(eventString(mondayExtract, "Monday"));
  result.push(eventString(tuesdayExtract, "Tuesday"));
  result.push(eventString(wednesdayExtract, "Wednesday"));
  result.push(eventString(thursdayExtract, "Thursday"));
  result.push(eventString(fridayExtract, "Friday"));
  return finalString(result);
}

function finalString(event) {
  var result = "";
  for(var i = 0; i < event.length; i++) {
    result += event[i] + "<br />";
  }
  return result;
}

function eventString(event, day) {
  if(event.length === 0) {
    return "<b>" + day + "</b>" + ": No events<br />";
  } else {
    var events = "<b>" + day + "</b>" + ":<br />";
    for(var i = 0; i < event.length; i++) {
      events += event[i] + "<br />";
    }
    return events;
  }
}

function eventExtractor(events) {
  var result = [];
  for(var i = 0; i < events.length; i++) {
    result.push(events[i].getTitle() + ': ' + readableDate(events[i].getStartTime()) + ' to ' + readableDate(events[i].getEndTime()));
  }
  return result;
}

function readableDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var result = hours + ":" + minutes + " " + ampm;
  return result;
}

function getMonday() {
  var monday = new Date();
  var todayDay1 = monday.getDay();
  monday.setDate(monday.getDate() - (todayDay1 - 1));
  monday.setHours(0);
  monday.setMinutes(0);
  monday.setSeconds(0);
  
  return monday;
}  

function getTuesday() {
  var tuesday = new Date();
  var todayDay1 = tuesday.getDay();
  tuesday.setDate(tuesday.getDate() - (todayDay1 - 2));
  tuesday.setHours(0);
  tuesday.setMinutes(0);
  tuesday.setSeconds(0);
  
  return tuesday;
}  

function getWednesday() {
  var wednesday = new Date();
  var todayDay1 = wednesday.getDay();
  wednesday.setDate(wednesday.getDate() - (todayDay1 - 3));
  wednesday.setHours(0);
  wednesday.setMinutes(0);
  wednesday.setSeconds(0);
  
  return wednesday;
}  

function getThursday() {
  var thursday = new Date();
  var todayDay1 = thursday.getDay();
  thursday.setDate(thursday.getDate() - (todayDay1 - 4));
  thursday.setHours(0);
  thursday.setMinutes(0);
  thursday.setSeconds(0);
  
  return thursday;
}  

function getFriday() {
  var friday = new Date();
  var todayDay2 = friday.getDay();
  friday.setDate(friday.getDate() - (todayDay2 - 5));
  friday.setHours(0);
  friday.setMinutes(0);
  friday.setSeconds(0);
  
  return friday;
}

function buildTimeCard() {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle('Work Day is set as 9:00 AM to 5:00 PM'))
    .addSection(CardService.newCardSection()
      .addWidget(CardService.newTextButton()
                 .setText('Insert in draft')
                 .setOnClickAction(CardService.newAction()
                                  .setFunctionName('insertAvailability'))))
  .build();
}

function insertAvailability(event) {
  var draftText = builder();
  Logger.log(draftText);
  //var draftText = "Monday (01/14) - 5:00 pm to 6:00 pm, after 8:30 pm<br />Tuesday (01/15) - 12:30 pm to 2:00 pm\nWednesday (01/16) - 2:00 pm to 3:30 pm\nThursday (01/17) - Not available\nFriday (01/18) - 2:00 pm to 3:30 pm";
  return CardService.newUpdateDraftActionResponseBuilder()
  .setUpdateDraftBodyAction(CardService.newUpdateDraftBodyAction()
                           .addUpdateContent(draftText, 
                                            CardService.ContentType.MUTABLE_HTML)
                           .setUpdateType(CardService.UpdateDraftBodyType.IN_PLACE_INSERT))
  .build();
}