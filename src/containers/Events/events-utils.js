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
    return EventsUtils.addKeySuperEvent(superEvents);
  },

  addCompletedKeyEvents: (events, eventsWeek) => {
    function isCompletedEvent(event) {
      return eventsWeek.findIndex(evt => evt.id === event.id) === -1;
    }
    return events.map(event => {
      event.completed = isCompletedEvent(event);
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
  }

}