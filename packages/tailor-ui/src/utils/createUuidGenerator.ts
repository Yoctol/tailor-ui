const createUuidGenerator = (name: string) => {
  let seed = 0;

  return () => {
    seed += 1;
    return `tailor_${name}_${Date.now()}_${seed}`;
  };
};

export default createUuidGenerator;
