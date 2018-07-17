export function computeScale(canvas, image) {
  let scale;
  const desiredSize = computeImageViewPort(image);
  const targetScaleX = canvas.width / desiredSize.width;
  const targetScaleY = canvas.height / desiredSize.height;

  // fit the image in the canvas
  scale = Math.min(targetScaleX, targetScaleY);
  // don't allow expanding an image beyond this
  // scale = Math.min(scale, 2);
  // don't allow sizing lower than this
  // scale = Math.max(scale, 0.1);
  return scale;
}

export function computeImageViewPort(image) {
  return {
    height:
      Math.abs(image.width * Math.sin((image.angle * Math.PI) / 180)) +
      Math.abs(image.height * Math.cos((image.angle * Math.PI) / 180)),
    width:
      Math.abs(image.height * Math.sin((image.angle * Math.PI) / 180)) +
      Math.abs(image.width * Math.cos((image.angle * Math.PI) / 180))
  };
}
