const createUIDGenerator = (name: string) => {
  let seed = 0;

  return () => {
    seed += 1;

    const timestamp = Date.now();

    return `tailor_${name}_${timestamp}_${seed}`;
  };
};

export default createUIDGenerator;
