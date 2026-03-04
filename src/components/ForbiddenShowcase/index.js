import React from 'react';
import styles from './styles.module.css';

const ForbiddenCard = ({ name, bg, text, reason, type, animate = false }) => (
    <div className={styles.card}>
        <div className={styles.typeName}>{type}</div>
        <div
            className={[styles.preview, animate ? styles.vibrateEffect : ''].join(' ')}
            style={{ backgroundColor: bg, color: text }}
        >
            <div className={styles.cross}>×</div>
            <span>ERR_COMB</span>
        </div>
        <div className={styles.info}>
            <div className={styles.reason}>{reason}</div>
        </div>
    </div>
);

export default function ForbiddenShowcase() {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.warningIcon}>!</div>
                <span>CRITICAL_VULNERABILITIES (Design.exe)</span>
            </div>

            <div className={styles.grid}>
                <ForbiddenCard
                    type="Vibración Cromática"
                    name="Rosa sobre Verde"
                    bg="#05FF00"
                    text="#FF2A6D"
                    reason="Produce fatiga ocular inmediata debido a la saturación opuesta. El texto parece 'flotar' o moverse violentamente en la pantalla."
                    animate={true}
                />

                <ForbiddenCard
                    type="Bajo Contraste"
                    name="Cyan sobre Blanco"
                    bg="#FFFFFF"
                    text="#00F0FF"
                    reason="El cyan eléctrico no alcanza el ratio mínimo de contraste contra el blanco para ser legible. Los elementos de la interfaz se vuelven invisibles."
                />

                <ForbiddenCard
                    type="Pérdida de Definición"
                    name="Blanco sobre Verde"
                    bg="#05FF00"
                    text="#F8FAFC"
                    reason="El verde terminal es un emisor de alta luminosidad. El blanco no tiene fuerza para destacar, lo que borra la claridad tipográfica."
                />
            </div>

            <div className={styles.footerNote}>
                * Estas combinaciones están restringidas tanto en entornos digitales (Web/App) como en medios impresos por razones de salud visual.
            </div>
        </div>
    );
}
