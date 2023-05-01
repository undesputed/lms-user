import React, { useRef, useEffect } from 'react';
import QRCodeGenerator from 'qrcode';

interface Props {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode: React.FC<Props> = ({ value, size = 128, bgColor = '#FFFFFF', fgColor = '#000000' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        QRCodeGenerator.toCanvas(canvas, value, {
          errorCorrectionLevel: 'H',
          margin: 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          width: size,
          height: size,
        });
      }
    }
  }, [value, size, bgColor, fgColor]);

  return <canvas ref={canvasRef} />;
};

export default QRCode;
