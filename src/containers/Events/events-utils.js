export default EventsUtils = {
  mergeEvents: events => {
    return [...EventsUtils.handleSuperEvents(EventsUtils.filterNoTakenEvents(events.superevent)), ...events.events].slice(0, 3);
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
    return EventsUtils.addKeySuperEvent(superEvents);
  },

  addCompletedKeyEvents: (events) => {
    // function isCompletedEvent(event) {
    //   return eventsWeek.findIndex(evt => evt.id === event.id) === -1;
    // }
    return events.map(event => {
      event.completed = !!event.completed;
      return event;
    })
  },

  normalizeEvents: (events) => {
    function getImageUrl(image) {
      return typeof image === 'object' ? image.url : image;
    }
    return events.map(event => {
      event.image = getImageUrl(event.image);
      event.inactive_image = getImageUrl(event.inactive_image);
      return event;
    })
  },

  filterValidEvents: allEvents => {
    if(allEvents.length === 0) {
      return [];
    }

    let arrayEvents = Object.entries(allEvents);

    if (arrayEvents[0][0] === 'super_event') {
      arrayEvents[0][1] = EventsUtils.handleSuperEvents(arrayEvents[0][1]);
    }

    return arrayEvents.filter(item => item[1].length > 0)
  }

}