const promise: Promise<string> = new Promise((resolve) => {
  resolve("best, hello world");
});

const me = 123;

promise.then(console.log).catch(console.error);

const t = "ttt";

console.log(t, me);
