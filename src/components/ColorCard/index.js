import React from 'react';
import { Toaster, toast } from 'sonner';
import styles from './styles.module.css';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHsl = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export default function ColorCard({
  color,
  name,
  opacity = 1,
  variant = 'hover',
  type = 'rgb',
  cmyk,
  pantone
}) {
  const isCmykMode = type.toLowerCase() === 'cmyk';
  const hexValue = color.toUpperCase();

  let rows = [];

  if (isCmykMode) {
    rows = [
      { label: 'HEX', value: hexValue },
      { label: 'CMYK', value: cmyk || 'N/A' },
      { label: 'PANTONE', value: pantone || 'N/A' },
    ];
  } else {
    const rgb = hexToRgb(color);
    if (!rgb) return <div>Invalid Color</div>;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const rgbValue = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const rgbaValue = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    const hslValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const hslaValue = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity})`;

    rows = [
      { label: 'HEX', value: hexValue },
      { label: 'RGB', value: rgbValue },
      { label: 'RGBA', value: rgbaValue },
      { label: 'HSL', value: hslValue },
      { label: 'HSLA', value: hslaValue },
    ];
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado`, {
      description: `Código de ${name} listo en el portapapeles.`,
      style: {
        background: '#141416',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
      },
    });
  };

  const CopyIcon = () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );

  return (
    <div className={styles.cardWrapper}>
      <Toaster position="top-center" theme="dark" closeButton />
      <div className={`${styles.card} ${variant === 'default' ? styles.variantDefault : styles.variantHover}`}>
        <div
          className={styles.colorPreview}
          style={{ backgroundColor: color }}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <h4 className={styles.name}>{name}</h4>
          </div>
          <div className={styles.valuesList}>
            {rows.map((row) => (
              <div
                key={row.label}
                className={styles.valueRow}
                onClick={() => copyToClipboard(row.value, row.label)}
                title={`Copy ${row.label}`}
              >
                <div className={styles.leftSide}>
                  <span className={styles.label}>{row.label}</span>
                  <span className={styles.value}>{row.value}</span>
                </div>
                <div className={styles.copyIconMini}>
                  <CopyIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
