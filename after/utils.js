export function shuffleArray(arr) {
  arr.forEach((_, idx) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    [arr[randomIdx], arr[idx]] = [arr[idx], arr[randomIdx]];
  });
}
