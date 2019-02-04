function updateDraft(event) {
  return [buildTimeCard()];
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