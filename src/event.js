const events = [];

export const registerEvent = (event) => {
  events.push(event);
};

export const setEvent = () => {
    for (const event of events)
        event();
};
