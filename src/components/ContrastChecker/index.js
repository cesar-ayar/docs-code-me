import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const BRAND_COLORS = [
    { name: 'Obsidiana', hex: '#0F172A' },
    { name: 'Rosa Ajolote', hex: '#FF2A6D' },
    { name: 'Verde Terminal', hex: '#05FF00' },
    { name: 'Cyan Eléctrico', hex: '#00F0FF' },
    { name: 'Blanco Consola', hex: '#F8FAFC' },
];

const getLuminance = (hex) => {
    const rgb = hex.replace('#', '').match(/.{1,2}/g).map(v => parseInt(v, 16) / 255);
    const corrected = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * corrected[0] + 0.7152 * corrected[1] + 0.0722 * corrected[2];
};

const getContrastRatio = (lum1, lum2) => {
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
};

const StatusItem = ({ label, target, ratio, description }) => {
    const isPass = ratio >= target;
    return (
        <div className={styles.statusItem}>
            <div className={styles.statusHeader}>
                <span>{label}</span>
                <span className={`${styles.badge} ${isPass ? styles.pass : styles.fail}`}>
                    {isPass ? 'PASS' : 'FAIL'}
                </span>
            </div>
            <div className={styles.statusDesc}>Target: {target}:1</div>
        </div>
    );
};

export default function ContrastChecker() {
    const [fgColor, setFgColor] = useState('#F8FAFC');
    const [bgColor, setBgColor] = useState('#0F172A');
    const [ratio, setRatio] = useState(0);

    useEffect(() => {
        try {
            const lum1 = getLuminance(fgColor);
            const lum2 = getLuminance(bgColor);
            const res = getContrastRatio(lum1, lum2);
            setRatio(parseFloat(res.toFixed(2)));
        } catch (e) {
            // Ignore invalid colors while typing
        }
    }, [fgColor, bgColor]);

    const swapColors = () => {
        const temp = fgColor;
        setFgColor(bgColor);
        setBgColor(temp);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.titleIcon} />
                <span>KRNL_CONTRAST_CHECKER v2.1</span>
            </div>

            <div className={styles.mainGrid}>
                <div className={styles.controls}>
                    {/* Foreground Control */}
                    <div className={styles.controlGroup}>
                        <label className={styles.label}>COLOR DE TEXTO (FG)</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                                className={styles.colorPicker}
                            />
                            <input
                                type="text"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                                className={styles.textInput}
                                maxLength={7}
                            />
                        </div>
                        <div className={styles.presets}>
                            {BRAND_COLORS.map(c => (
                                <button
                                    key={`fg-${c.hex}`}
                                    className={styles.presetBtn}
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => setFgColor(c.hex)}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    <button className={styles.swapBtn} onClick={swapColors} title="Intercambiar colores">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Background Control */}
                    <div className={styles.controlGroup}>
                        <label className={styles.label}>COLOR DE FONDO (BG)</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                                className={styles.colorPicker}
                            />
                            <input
                                type="text"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                                className={styles.textInput}
                                maxLength={7}
                            />
                        </div>
                        <div className={styles.presets}>
                            {BRAND_COLORS.map(c => (
                                <button
                                    key={`bg-${c.hex}`}
                                    className={styles.presetBtn}
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => setBgColor(c.hex)}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.previewPanel}>
                    <div className={styles.results}>
                        <div className={styles.ratioContainer}>
                            <div className={styles.ratioValue}>{ratio}:1</div>
                            <div className={styles.ratioLabel}>Relación de contraste</div>
                        </div>

                        <div className={styles.statusGrid}>
                            <StatusItem label="Normal" target={4.5} ratio={ratio} />
                            <StatusItem label="Grande" target={3} ratio={ratio} />
                            <StatusItem label="Normal (AAA)" target={7} ratio={ratio} />
                            <StatusItem label="Grande (AAA)" target={4.5} ratio={ratio} />
                        </div>
                    </div>

                    <div
                        className={styles.livePreview}
                        style={{ backgroundColor: bgColor, color: fgColor }}
                    >
                        <h3 className={styles.previewTitle}>The quick brown fox</h3>
                        <p className={styles.previewBody}>
                            El rápido zorro marrón salta sobre el perro perezoso.
                            Este es un bloque de texto para verificar la legibilidad en tiempo real.
                            Code-Me KERNEL_ACTIVE.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
