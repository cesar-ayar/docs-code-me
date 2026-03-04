import React, { useState } from 'react';
import {
    protanopia,
    protanomaly,
    deuteranopia,
    deuteranomaly,
    tritanopia,
    tritanomaly,
    achromatopsia,
    achromatomaly
} from '@cantoo/color-blindness';
import styles from './styles.module.css';

const VISION_TYPES = {
    normal: {
        name: 'Normal',
        desc: 'Visión de tricrómata estándar. La totalidad del espectro visible de Code-Me se percibe con total fidelidad.',
        simulate: (hex) => hex
    },
    protanopia: {
        name: 'Protanopía',
        desc: 'Ausencia total de sensibilidad al color rojo. El Rosa Axolote se percibe apagado y los contrastes cambian drásticamente.',
        simulate: protanopia
    },
    protanomaly: {
        name: 'Protanomalía',
        desc: 'Sensibilidad reducida al color rojo. Los rojos se ven menos vibrantes y más cercanos a los verdes o amarillos.',
        simulate: protanomaly
    },
    deuteranopia: {
        name: 'Deuteranopía',
        desc: 'Ceguera al color verde. Es la variante más común. Los tonos de Verde Terminal se ven amarillentos o grises neutros.',
        simulate: deuteranopia
    },
    deuteranomaly: {
        name: 'Deuteranomalía',
        desc: 'Sensibilidad reducida al color verde. Los verdes son más difíciles de distinguir de otros colores, alterando la percepción general.',
        simulate: deuteranomaly
    },
    tritanopia: {
        name: 'Tritanopía',
        desc: 'Déficit en la percepción del color azul. Extremadamente rara. Altera la percepción de la Obsidiana Digital y el Cyan.',
        simulate: tritanopia
    },
    tritanomaly: {
        name: 'Tritanomalía',
        desc: 'Sensibilidad reducida al color azul. Los azules pueden parecer más verdes y los amarillos, más rosados.',
        simulate: tritanomaly
    },
    achromatopsia: {
        name: 'Acromatopsia',
        desc: 'Visión total en escala de grises. Crucial para validar que la jerarquía se mantenga solo mediante niveles de brillo.',
        simulate: achromatopsia
    },
    achromatomaly: {
        name: 'Acromatomalía',
        desc: 'Visión muy reducida del color. No es una ceguera total, pero los colores apenas se distinguen entre sí.',
        simulate: achromatomaly
    },
};

const BRAND_COLORS = [
    { name: 'Obsidiana Digital', hex: '#0F172A' },
    { name: 'Rosa Ajolote', hex: '#FF2A6D' },
    { name: 'Verde Terminal', hex: '#05FF00' },
    { name: 'Cyan Eléctrico', hex: '#00F0FF' },
    { name: 'Blanco Consola', hex: '#F8FAFC' },
];

export default function ColorVisionShowcase() {
    const [activeVision, setActiveVision] = useState('normal');
    const type = VISION_TYPES[activeVision];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.titleIcon} />
                    <span>VISTA_ADAPTATIVA (Kernel: Accessibility)</span>
                </div>
                <div className={styles.selector}>
                    {Object.keys(VISION_TYPES).map((key) => (
                        <button
                            key={key}
                            className={[
                                styles.selectorBtn,
                                activeVision === key ? styles.activeBtn : ''
                            ].join(' ')}
                            onClick={() => setActiveVision(key)}
                        >
                            {VISION_TYPES[key].name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {BRAND_COLORS.map((color) => {
                    const simulatedHex = type.simulate(color.hex);

                    return (
                        <div key={color.name} className={styles.colorCard}>
                            <div className={styles.preview}>
                                <div
                                    className={styles.simulated}
                                    style={{ backgroundColor: simulatedHex }}
                                />
                            </div>
                            <div className={styles.label}>
                                <span className={styles.colorName}>{color.name}</span>
                                <span className={styles.colorHex}>
                                    {activeVision === 'normal' ? color.hex.toUpperCase() : `≈ ${simulatedHex.toUpperCase()}`}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.infoBox}>
                <div className={styles.infoTitle}>
                    <span>{'>_'}</span> {type.name.toUpperCase()}
                </div>
                <p className={styles.infoDesc}>{type.desc}</p>
                <div className={styles.footer}>
                    * Simulación científica basada en el algoritmo de Brettel-Viénot-Mollon (@cantoo/color-blindness).
                </div>
            </div>
        </div>
    );
}
