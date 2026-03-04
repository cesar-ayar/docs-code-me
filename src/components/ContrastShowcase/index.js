import React, { useState } from 'react';
import styles from './styles.module.css';

const PALETTES = {
    rgb: [
        { name: 'Obsidiana', hex: '#0F172A' },
        { name: 'Rosa Ajolote', hex: '#FF2A6D' },
        { name: 'Verde Terminal', hex: '#05FF00' },
        { name: 'Cyan Eléctrico', hex: '#00F0FF' },
        { name: 'Blanco Consola', hex: '#F8FAFC' },
    ],
    cmyk: [
        { name: 'Obsidiana', hex: '#000000' },
        { name: 'Rosa Ajolote', hex: '#E6007E' },
        { name: 'Cyan de Proceso', hex: '#00AEEF' },
        { name: 'Verde Lima', hex: '#80C342' },
        { name: 'Blanco', hex: '#FFFFFF' },
    ]
};

// Simplified accessibility assessment (inspired by WCAG)
const getContrastStatus = (foreground, background) => {
    const hex2rgb = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16) / 255;
        const g = parseInt(hex.substring(3, 5), 16) / 255;
        const b = parseInt(hex.substring(5, 7), 16) / 255;
        return [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    };

    const getLuminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

    const l1 = getLuminance(hex2rgb(foreground));
    const l2 = getLuminance(hex2rgb(background));

    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    if (ratio >= 7) return 'AA / AAA';
    if (ratio >= 4.5) return 'AA';
    if (ratio >= 3) return 'AA (Gr)';
    return 'FAIL';
};

export default function ContrastShowcase() {
    const [activePalette, setActivePalette] = useState('rgb');
    const palette = PALETTES[activePalette];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <span>{'>_'}</span> Matriz de Combinaciones
                </div>
                <div className={styles.selector}>
                    <button
                        className={`${styles.btn} ${activePalette === 'rgb' ? styles.active : ''}`}
                        onClick={() => setActivePalette('rgb')}
                    >
                        Digital (RGB)
                    </button>
                    <button
                        className={`${styles.btn} ${activePalette === 'cmyk' ? styles.active : ''}`}
                        onClick={() => setActivePalette('cmyk')}
                    >
                        Impreso (CMYK)
                    </button>
                </div>
            </div>

            <div className={styles.matrixWrapper}>
                <div className={styles.matrix} style={{ '--cols': palette.length }}>
                    {/* Top headers: Text color Labels */}
                    <div className={`${styles.label} ${styles.corner}`}>Fondo / Texto</div>
                    {palette.map((color) => (
                        <div key={`header-${color.name}`} className={`${styles.label} ${styles.topLabel}`}>
                            {color.name}<br />{color.hex}
                        </div>
                    ))}

                    {/* Rows */}
                    {palette.map((bgColor) => (
                        <React.Fragment key={`row-${bgColor.name}`}>
                            {/* Row Label (Background) */}
                            <div className={`${styles.label} ${styles.leftLabel}`}>
                                {bgColor.name}<br />{bgColor.hex}
                            </div>

                            {/* Sample Cells */}
                            {palette.map((textColor) => {
                                const status = getContrastStatus(textColor.hex, bgColor.hex);
                                const isSame = textColor.hex === bgColor.hex;

                                return (
                                    <div
                                        key={`cell-${bgColor.name}-${textColor.name}`}
                                        className={styles.cell}
                                        style={{ backgroundColor: bgColor.hex, opacity: isSame ? 0.2 : 1 }}
                                    >
                                        {!isSame && (
                                            <>
                                                <span className={styles.sampleText} style={{ color: textColor.hex }}>
                                                    ABC
                                                </span>
                                                <span className={styles.status} style={{ opacity: status === 'FAIL' ? 0.8 : 0.4 }}>
                                                    {status}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6, fontStyle: 'italic', textAlign: 'center' }}>
                * AA (Gr) significa que el contraste es suficiente solo para texto grande o elementos gráficos.
            </p>
        </div>
    );
}
