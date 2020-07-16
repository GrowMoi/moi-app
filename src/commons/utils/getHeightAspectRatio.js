function getHeightAspectRatio(width, height, currentWidth) {
  const aspect = width / height;
  return Math.round(currentWidth / aspect);
}

export default getHeightAspectRatio;
