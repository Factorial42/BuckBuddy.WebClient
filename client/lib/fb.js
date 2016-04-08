
const fbIsLoaded = () => typeof FB !== 'undefined';

export function resolveFBHandle() {
  return new Promise((ful, rej) => {
    if (fbIsLoaded()) return ful(FB);

    let waitInt = setInterval(() => {
      if (fbIsLoaded()) {
        clearInterval(waitInt);
        ful(FB);
      }
    }, 500)
  })
}
