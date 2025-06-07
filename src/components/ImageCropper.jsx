import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useDropzone } from 'react-dropzone';
import './ImageCropper.css';

// Fungsi untuk membuat crop dari gambar
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

// Fungsi untuk mendapatkan crop area
const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }
  
  // Set canvas size to final crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Konversi ke blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 0.95);
  });
};

const ImageCropper = ({ onCropComplete }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      });
      
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []},
    maxFiles: 1,
    multiple: false
  });

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    async (_, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSaveCroppedImage = async () => {
    if (croppedAreaPixels && imageSrc) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        
        // Add a file name to the blob
        // Pastikan nama file memiliki ekstensi yang benar untuk memudahkan deteksi MIME type
        const fileName = `profile-picture-${Date.now()}.jpg`;
        const file = new File([croppedImage], fileName, { 
          type: "image/jpeg",
          lastModified: new Date().getTime()
        });
        
        console.log('Created file object:', file.name, file.type, file.size);
        onCropComplete(file);
        setShowCropper(false);
      } catch (e) {
        console.error('Error cropping image:', e);
      }
    }
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    setShowCropper(false);
  };

  return (
    <div className="w-full">
      {!showCropper ? (
        <div 
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer text-center
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {
              isDragActive ?
                <p className="text-blue-500">Drop foto di sini ...</p> :
                <div>
                  <p className="text-gray-500">Drag & drop foto di sini, atau klik untuk memilih foto</p>
                  <p className="mt-2 text-sm text-gray-400">Format: JPG, PNG, GIF (Maks. 5MB)</p>
                </div>
            }
          </div>
        </div>
      ) : (
        <div className="relative bg-black rounded-lg overflow-hidden">
          {/* Area crop dengan frame lingkaran */}
          <div className="h-80 relative">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropCompleteHandler}
              onZoomChange={onZoomChange}
              classes={{
                containerClassName: 'reactEasyCrop_Container',
                cropAreaClassName: 'reactEasyCrop_CropArea'
              }}
            />
          </div>
          
          {/* Preview hasil crop (opsional) */}
          {croppedAreaPixels && (
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md">
                {imageSrc && (
                  <img 
                    src={imageSrc} 
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `
                        translate(${-croppedAreaPixels.x}px, ${-croppedAreaPixels.y}px) 
                        scale(${100 / croppedAreaPixels.width})
                      `
                    }}
                  />
                )}
              </div>
            </div>
          )}
          
          {/* Slider zoom dengan styling baru */}
          <div className="mt-4 px-4">
            <div className="flex items-center justify-between text-white text-sm mb-1">
              <span>Zoom</span>
              <span>{zoom.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="zoom-slider w-full"
            />
          </div>
          
          {/* Tombol transparan */}
          <div className="mt-4 flex justify-center space-x-4 p-4">
            <button 
              className="crop-button"
              onClick={handleCancelCrop}
            >
              Batal
            </button>
            <button 
              className="crop-button primary"
              onClick={handleSaveCroppedImage}
            >
              Simpan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
