export interface CompressedImageResult {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
}

export const compressImage = async (
  file: File,
  maxSizeKB: number = 500,
  quality: number = 0.8
): Promise<CompressedImageResult> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions to keep aspect ratio
      const maxDimension = 1200; // Max width or height
      let { width, height } = img;
      
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Try different quality levels to hit target size
      let currentQuality = quality;
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const sizeKB = blob.size / 1024;
            
            if (sizeKB <= maxSizeKB || currentQuality <= 0.1) {
              // Success or we've tried enough
              canvas.toBlob(
                (finalBlob) => {
                  if (!finalBlob) {
                    reject(new Error('Failed to create final blob'));
                    return;
                  }
                  
                  const reader = new FileReader();
                  reader.onload = () => {
                    resolve({
                      blob: finalBlob,
                      dataUrl: reader.result as string,
                      originalSize: file.size,
                      compressedSize: finalBlob.size
                    });
                  };
                  reader.onerror = () => reject(new Error('Failed to read compressed image'));
                  reader.readAsDataURL(finalBlob);
                },
                'image/jpeg',
                currentQuality
              );
            } else {
              // Try with lower quality
              currentQuality -= 0.1;
              tryCompress();
            }
          },
          'image/jpeg',
          currentQuality
        );
      };
      
      tryCompress();
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};
