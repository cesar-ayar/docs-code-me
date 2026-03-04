import React from 'react';
import styles from './styles.module.css';

const HierarchyLevel = ({ index, label, children }) => (
    <div className={styles.level}>
        <div className={styles.label}>
            <span className={styles.index}>{index}</span>
            <span>{label.toUpperCase()}</span>
        </div>
        <div className={styles.preview}>
            {children}
        </div>
    </div>
);

export default function HierarchyShowcase() {
    return (
        <div className={styles.container}>
            {/* 1. Texto de Lectura */}
            <HierarchyLevel
                index="1"
                label="Texto de Lectura (Legibilidad Máxima)"
            >
                <p className={styles.bodyText}>
                    Para bloques extensos de información, usamos <strong>Blanco Consola</strong> sobre <strong>Obsidiana Digital</strong>.
                    Esto reduce la fatiga visual y garantiza que la IA pueda rastrear el contenido sin "ruido" cromático.
                    Un contraste superior a 15:1 para una experiencia de lectura fluida y técnica.
                </p>
            </HierarchyLevel>

            {/* 2. Destacados / Acentuación */}
            <HierarchyLevel
                index="2"
                label="Destacados (Accentos Visuales)"
            >
                <div className={styles.accentBlock}>
                    <div className={styles.title}>IDENTIDAD_CORE_v2.0</div>
                    <div className={styles.subtitle}>// Utilizando Rosa Axolote y Cyan para jerarquía secundaria</div>
                    <p className={styles.bodyText}>
                        Los colores vibrantes se reservan para resaltar <span style={{ color: '#FF2A6D', fontWeight: 'bold' }}>conceptos clave</span> o
                        marcar una <span style={{ color: '#00F0FF', fontWeight: 'bold' }}>dirección técnica</span> en la interfaz.
                    </p>
                </div>
            </HierarchyLevel>

            {/* 3. Botones y Estados */}
            <HierarchyLevel
                index="3"
                label="Acciones y Estados (Modo Invertido)"
            >
                <div className={styles.actionBlock}>
                    <button className={`${styles.button} ${styles.primary}`}>EJECUTAR_PROYECTO</button>
                    <button className={`${styles.button} ${styles.secondary}`}>DOCS_API</button>
                    <button className={`${styles.button} ${styles.success}`}>ESTADO: ONLINE</button>
                </div>
                <p className={styles.footerNote}>
                    * En fondos vibrantes, el texto SIEMPRE debe ser <strong>Obsidiana Digital</strong> para cumplir con WCAG.
                </p>
            </HierarchyLevel>
        </div>
    );
}
