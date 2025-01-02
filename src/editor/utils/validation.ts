export const validateDesignSize = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      // Check if image dimensions are within acceptable range
      const isValidSize =
        img.width >= 300 &&
        img.width <= 4000 &&
        img.height >= 300 &&
        img.height <= 4000;

      URL.revokeObjectURL(img.src);
      resolve(isValidSize);
    };

    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      resolve(false);
    };
  });
};
