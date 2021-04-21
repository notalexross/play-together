export function alertError(error) {
  if (!error) return
  alert(error)
  console.error(error)
}

export function roll(
  callback = () => {},
  { sides = 6, time = 5, maxTime = 500, multiplier = 1.3 } = {}
) {
  const randomNumber = Math.ceil(Math.random() * sides)
  callback(randomNumber)
  const newTime = time * 1.3

  if (newTime < 500) {
    setTimeout(() => {
      roll(callback, { sides, time: newTime, maxTime, multiplier })
    }, newTime)
  }
}

export function getRandomPureColor() {
  const R = (Math.round(Math.random()) * 255).toString(16).padEnd(2, '0').slice(0, 3)
  const G = (Math.round(Math.random()) * 255).toString(16).padEnd(2, '0').slice(0, 3)
  const B = (Math.round(Math.random()) * 255).toString(16).padEnd(2, '0').slice(0, 3)

  return `#${R}${G}${B}`
}
