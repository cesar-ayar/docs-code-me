import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

const ScalabilityShowcase = () => {
    const [scaleFactor, setScaleFactor] = useState(0.8); // Start at a visible scale

    const masterUrl = useBaseUrl('/img/logos/Master_Dark.svg');
    const tokenUrl = useBaseUrl('/img/logos/The Token.svg');

    // Base sizes (the "sweet spot" sizes)
    const baseFullWidth = 350;
    const baseTokenWidth = 120;

    const currentFullWidth = Math.round(baseFullWidth * scaleFactor);
    const currentTokenWidth = Math.round(baseTokenWidth * scaleFactor);

    const isFullValid = currentFullWidth >= 100;
    const isTokenValid = currentTokenWidth >= 32;

    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Visualizador de <span style={{ color: '#00f0ff' }}>Escalabilidad</span>
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Ajusta el control para simular la legibilidad del logo en diferentes tamaños de pantalla.
                </p>
            </div>

            <div className={styles.controls}>
                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderLabel}>
                        <span>Reducir</span>
                        <span>Escala DINÁMICA</span>
                        <span>Aumentar</span>
                    </div>
                    <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.01"
                        value={scaleFactor}
                        onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                        className={styles.slider}
                    />
                </div>
            </div>

            <div className={styles.showcaseGrid}>
                {/* Full Logo Card */}
                <div className={styles.card}>
                    <h4 className={styles.cardTitle}>Logo Completo (Full Stack)</h4>
                    <div className={styles.previewArea}>
                        <div
                            className={styles.logoWrapper}
                            style={{ width: `${currentFullWidth}px` }}
                        >
                            <img src={masterUrl} alt="Master Logo" className={styles.logo} />
                        </div>
                    </div>
                    <div className={clsx(styles.statusIndicator, isFullValid ? styles.statusOk : styles.statusWarning)}>
                        {isFullValid ? '✓ LEGIBLE' : '⚠ DEMASIADO PEQUEÑO'}
                    </div>
                    <div className={styles.sizeLabel}>
                        Ancho: <span className={styles.sizeValue}>{currentFullWidth}px</span>
                        <span style={{ opacity: 0.5, marginLeft: '0.5rem' }}>(min 100px)</span>
                    </div>
                </div>

                {/* Token Card */}
                <div className={styles.card}>
                    <h4 className={styles.cardTitle}>Isotipo (The Token)</h4>
                    <div className={styles.previewArea}>
                        <div
                            className={styles.logoWrapper}
                            style={{ width: `${currentTokenWidth}px` }}
                        >
                            <img src={tokenUrl} alt="The Token" className={styles.logo} />
                        </div>
                    </div>
                    <div className={clsx(styles.statusIndicator, isTokenValid ? styles.statusOk : styles.statusWarning)}>
                        {isTokenValid ? '✓ LEGIBLE' : '⚠ DEMASIADO PEQUEÑO'}
                    </div>
                    <div className={styles.sizeLabel}>
                        Ancho: <span className={styles.sizeValue}>{currentTokenWidth}px</span>
                        <span style={{ opacity: 0.5, marginLeft: '0.5rem' }}>(min 32px)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScalabilityShowcase;
