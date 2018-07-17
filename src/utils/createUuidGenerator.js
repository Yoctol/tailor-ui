const createUuidGenerator = name => {
  let seed = 0;

  return () => {
    seed += 1;
    return `yoctol_ui_${name}_${Date.now()}_${seed}`;
  };
};

export default createUuidGenerator;
