import React, { useState } from 'react';
import styles from './styles.module.css';

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?".split("");
const WEIGHTS = [
    { val: 100, label: '100 Thin' },
    { val: 200, label: '200 ExtraLight' },
    { val: 300, label: '300 Light' },
    { val: 400, label: '400 Regular' },
    { val: 500, label: '500 Medium' },
    { val: 600, label: '600 SemiBold' },
    { val: 700, label: '700 Bold' },
    { val: 800, label: '800 ExtraBold' },
    { val: 900, label: '900 Black' }
];

export default function FontShowcase({
    fontFamily = 'inherit',
    defaultText = 'CODE_ME: RUNNING_SYSTEM_V.4',
    allowedWeights = null
}) {
    const [fontSize, setFontSize] = useState(48);
    const [previewText, setPreviewText] = useState(defaultText);

    const filteredWeights = allowedWeights
        ? WEIGHTS.filter(w => allowedWeights.includes(w.val))
        : WEIGHTS;

    return (
        <div className={styles.showcaseContainer} style={{ fontFamily }}>
            {/* Glyph Grid Section */}
            <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                    <label>GLYPH_MAP</label>
                </div>
                <div className={styles.glyphGrid}>
                    {GLYPHS.map((char, i) => (
                        <div key={i} className={styles.glyphItem} title={`Char: ${char}`}>
                            {char}
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Controls */}
            <div className={styles.controls}>
                <div className={styles.controlGroup}>
                    <div className={styles.controlHeader}>
                        <label>BUFFER_IN</label>
                    </div>
                    <input
                        type="text"
                        className={styles.inputField}
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        placeholder="Escribir comando tipográfico..."
                    />
                </div>
                <div className={styles.controlGroup}>
                    <div className={styles.controlHeader}>
                        <label>SIZE_PX: {fontSize}PX</label>
                    </div>
                    <input
                        type="range"
                        className={styles.rangeInput}
                        min="12"
                        max="120"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                    />
                </div>
            </div>

            {/* Main Preview Area */}
            <div className={styles.textPreviewContainer}>
                <div
                    className={styles.textPreview}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    {previewText || 'SYSTEM_WAITING_FOR_INPUT...'}
                </div>
            </div>

            {/* weights Preview */}
            <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                    <label>WEIGHT_LAYERS</label>
                </div>
                <div className={styles.weightList}>
                    {filteredWeights.map(weight => (
                        <div key={weight.val} className={styles.weightRow}>
                            <span className={styles.weightLabel}>{weight.label}</span>
                            <span
                                className={styles.weightSample}
                                style={{ fontWeight: weight.val, fontSize: '1.4rem' }}
                            >
                                {previewText || 'FONT_WEIGHT_PREVIEW'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
