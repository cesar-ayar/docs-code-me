import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

const modes = [
    {
        id: 'preferente',
        label: 'Preferente',
        icon: '🌙',
        title: 'Modo Oscuro (Obsidiana)',
        text: 'Nuestro hábitat natural. Ofrece el máximo contraste para los elementos neón y mantiene la elegibilidad premium.',
        bgClass: styles.bgObsidian,
        logo: 'dark',
        status: 'Óptimo',
        statusClass: styles.statusBest
    },
    {
        id: 'fotografico',
        label: 'Fotográfico',
        icon: '📸',
        title: 'Overlay Fotográfico',
        text: 'Permitido sobre imágenes oscuras con un overlay de opacidad al 70%. Evita zonas ruidosas o claras de la imagen.',
        bgClass: styles.bgPhoto,
        logo: 'dark',
        status: 'Seguro',
        statusClass: styles.statusBest
    },
    {
        id: 'administrativo',
        label: 'Administrativo',
        icon: '📄',
        title: 'Modo Tinta (Ink Mode)',
        text: 'Al estar en fondo administrativo (documentos legales o facturas), usa el logo Ink Mode. El texto "CODE ME" cambia a color Obsidiana para garantizar la legibilidad absoluta sobre blanco.',
        bgClass: styles.bgInk,
        logo: 'ink',
        status: 'Restringido',
        statusClass: styles.statusLimited
    }
];

const BackgroundShowcase = () => {
    const [activeMode, setActiveMode] = useState(modes[0]);

    const masterUrl = useBaseUrl('/img/logos/Master_Dark.svg');
    const inkUrl = useBaseUrl('/img/logos/Ink Mode.svg');

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        className={clsx(styles.tab, activeMode.id === mode.id && styles.tabActive)}
                        onClick={() => setActiveMode(mode)}
                    >
                        <span>{mode.icon}</span>
                        {mode.label}
                    </button>
                ))}
            </div>

            <div className={clsx(styles.displayArea, activeMode.bgClass)}>
                <div className={clsx(styles.statusIndicator, activeMode.statusClass)}>
                    {activeMode.status}
                </div>

                <div className={styles.logoWrapper}>
                    <img
                        src={activeMode.logo === 'dark' ? masterUrl : inkUrl}
                        alt="Logo CODE ME"
                        className={styles.logo}
                    />
                </div>
            </div>

            <div className={styles.infoCard}>
                <h4 className={styles.infoTitle}>
                    <span>{activeMode.icon}</span>
                    {activeMode.title}
                </h4>
                <p className={styles.infoText}>{activeMode.text}</p>
            </div>
        </div>
    );
};

export default BackgroundShowcase;
