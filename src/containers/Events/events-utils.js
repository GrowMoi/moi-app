export default EventsUtils = {
  mergeEvents: events => {
    return [...EventsUtils.handleSuperEvents(events.superevent), ...events.events].slice(0, 3);
  },

  addKeySuperEvent: (superEvents) => {
    return superEvents.map(sEvent => {
      sEvent.isSuperEvent = true;
      return sEvent
    })
  },

  filterNoTakenEvents: superEvents => {
    return superEvents.filter(sEvent => !sEvent.taken);
  },

  handleSuperEvents: superEvents => {
    return EventsUtils.filterNoTakenEvents(EventsUtils.addKeySuperEvent(superEvents));
  }

}