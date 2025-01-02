export const calculateInitialScale = (
  designWidth: number,
  designHeight: number,
  maxWidth: number,
  maxHeight: number,
  padding: number = 0.9 // 90% of max size to leave some room for adjustment
): number => {
  const widthRatio = (maxWidth * padding) / designWidth;
  const heightRatio = (maxHeight * padding) / designHeight;

  // Use the smaller ratio to ensure design fits within bounds
  return Math.min(widthRatio, heightRatio);
};

//function to get the dimensions of an image
export const getImageDimensions = (
  imageUrl: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
};
