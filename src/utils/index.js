
export function getPreRotatedHeight(projectedHeight, angle, perspective) {
  // get the height an x-axis rotated div, with perspective, should be for it to result in a specific projected height.


  // TODO this is for if the rotation is into the page (transform from bottom), not out of the page (transform from top)
  // the container is big than the table length if rotate from top, but smaller if rotate from bottom...
  // maybe negative angle would work...

  const angleRadians = angle * Math.PI / 180
  const height = projectedHeight * perspective / (perspective * Math.cos(angleRadians) - projectedHeight * Math.sin(angleRadians))

  return height
}