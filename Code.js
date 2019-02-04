function updateDraft(event) {
  return [builder()];
}

function builder() {
  var events = CalendarApp.getEvents(getMonday(), getFriday());
  for(var i = 0; i < events.length; i++) {
    var result = events[i].getTitle() + ' ' + events[i].getStartTime() + ' ' + events[i].getEndTime();
    Logger.log(result);
  }
}

function getMonday() {
  var monday = new Date();
  var todayDay1 = monday.getDay();
  monday.setDate(monday.getDate() - (todayDay1 - 1));
  monday.setHours(9);
  monday.setMinutes(0);
  monday.setSeconds(0);
  
  return monday;
}  

function getFriday() {
  var friday = new Date();
  var todayDay2 = friday.getDay();
  friday.setDate(friday.getDate() - (todayDay2 - 6));
  friday.setHours(9);
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
  var draftText = "Monday (01/14) - 5:00 pm to 6:00 pm, after 8:30 pm\nTuesday (01/15) - 12:30 pm to 2:00 pm\nWednesday (01/16) - 2:00 pm to 3:30 pm\nThursday (01/17) - Not available\nFriday (01/18) - 2:00 pm to 3:30 pm";
  return CardService.newUpdateDraftActionResponseBuilder()
  .setUpdateDraftBodyAction(CardService.newUpdateDraftBodyAction()
                           .addUpdateContent(draftText, 
                                            CardService.ContentType.TEXT)
                           .setUpdateType(CardService.UpdateDraftBodyType.IN_PLACE_INSERT))
  .build();
}