// https://github.com/renatorib/react-powerplug/blob/master/src/utils/composeEvents.js
const mergeEventProps = (...objEvents: any[]) => {
  return objEvents.reduce((allEvents, events) => {
    const append = {};

    Object.keys(events).forEach((key) => {
      (append as any)[key] = allEvents[key]
        ? // Already have this event: let's merge
          (...args: any[]) => {
            events[key](...args);
            allEvents[key](...args);
          }
        : // Don't have this event yet: just assign the event
          events[key];
    });

    return { ...allEvents, ...append };
  });
};

export { mergeEventProps };
