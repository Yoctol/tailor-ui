let seed = 0;

const getUuid = () => {
  seed += 1;
  return `yoctol_ui_message_${Date.now()}_${seed}`;
};

export { getUuid };
