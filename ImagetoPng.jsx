import { useRef, useState } from 'react';

const MyComponent = () => {
  const divRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleConvertToImage = () => {
    htmlToImage.toPng(divRef.current)
      .then(function (dataUrl) {
        setImageUrl(dataUrl);
      })
      .catch(function (error) {
        console.error('Error converting div to image:', error);
      });
  };

  return (
    <div>
      <div ref={divRef}>
        {/* Contents of the div */}
      </div>
      <button onClick={handleConvertToImage}>Convert to Image</button>
      {imageUrl && <img src={imageUrl} alt="Converted Image" />}
    </div>
  );
};
