// https://medium.com/nerd-for-tech/implement-your-own-promises-in-javascript-68ddaa6a5409

function getPipe() {
  const pipe = [1];

  const fnThen = [];
  const fnCatch = [];

  pipe.then = (fn) => {
    fnThen.push(fn);
    return pipe;
  };
  pipe.catch = (fn) => {
    fnCatch.push(fn);
    return pipe;
  };

  setTimeout(() => {
    fnThen.forEach((fn) => fn([1, 2, 3, 4]));
  }, 1000);

  return pipe;
}

async function main() {
  const pipe = getPipe();
  console.log([...pipe]);

  pipe
    .then((value) => {
      console.log('values=', value);
      return 'no';
    })
    .then((value) => {
      if (Array.isArray(value)) {
        console.error(
          '!!!!!!! This is totally wrong. svalue should be a string due to previous then'
        );
      }
      console.log('b=', value);
    });
}

main();
