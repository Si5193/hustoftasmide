
export interface CompressedImageResult {
  blob: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
}

export const compressImage = async (
  file: File,
  maxSizeKB: number = 500,
  quality: number = 0.8,
  onProgress?: (stage: string, progress: number) => void
): Promise<CompressedImageResult> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    onProgress?.('Förbereder bild...', 10);

    img.onload = () => {
      onProgress?.('Beräknar dimensioner...', 20);
      
      // Mer effektiv dimensionsberäkning
      const maxDimension = 1200;
      let { width, height } = img;
      
      // Optimerad skalning - beräkna en gång
      const scale = Math.min(maxDimension / width, maxDimension / height, 1);
      width = Math.floor(width * scale);
      height = Math.floor(height * scale);

      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      onProgress?.('Ritar om bild...', 40);

      // Optimerad ritning med bättre kvalitet
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      onProgress?.('Komprimerar...', 60);

      // Smartare kvalitetsberäkning - börja med en beräknad kvalitet baserat på filstorlek
      const estimatedQuality = Math.max(0.3, Math.min(0.9, (maxSizeKB * 1024) / file.size));
      let currentQuality = Math.min(quality, estimatedQuality);
      
      const performCompression = (targetQuality: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            const sizeKB = blob.size / 1024;
            
            onProgress?.('Kontrollerar storlek...', 80);
            
            // Om storleken är OK eller vi har provat tillräckligt låg kvalitet
            if (sizeKB <= maxSizeKB || targetQuality <= 0.2) {
              onProgress?.('Skapar förhandsvisning...', 90);
              
              const reader = new FileReader();
              reader.onload = () => {
                onProgress?.('Klar!', 100);
                resolve({
                  blob,
                  dataUrl: reader.result as string,
                  originalSize: file.size,
                  compressedSize: blob.size
                });
              };
              reader.onerror = () => reject(new Error('Failed to read compressed image'));
              reader.readAsDataURL(blob);
            } else {
              // Minska kvaliteten mer aggressivt för snabbare konvergens
              const reductionFactor = sizeKB > maxSizeKB * 2 ? 0.3 : 0.1;
              performCompression(Math.max(0.1, targetQuality - reductionFactor));
            }
          },
          'image/jpeg',
          targetQuality
        );
      };
      
      performCompression(currentQuality);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    
    // Optimera för snabb laddning
    if (file.size > 2 * 1024 * 1024) { // Om filen är större än 2MB
      // Skapa en temporär URL för snabbare laddning av stora filer
      img.src = URL.createObjectURL(file);
    } else {
      img.src = URL.createObjectURL(file);
    }
  });
};
