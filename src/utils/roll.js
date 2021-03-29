export default function roll(
  callback = () => {},
  { sides = 6, time = 5, maxTime = 500, multiplier = 1.3 } = {}
) {
  const randomNumber = Math.ceil(Math.random() * sides)
  callback(randomNumber)
  time *= 1.3
  
  if (time < 500) {
    setTimeout(() => {
      roll(callback, { sides, time, maxTime, multiplier })
    }, time)
  }
}
