const createUIDGenerator = (name: string) => {
  let seed = 0;

  return () => {
    seed += 1;

    return `tailor_${name}_${seed}`;
  };
};

export default createUIDGenerator;
