import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

const LogoRules = () => {
    const [mode, setMode] = useState('standard'); // 'standard' or 'navbar'
    const logoUrl = useBaseUrl('/img/logos/Master_Dark.svg');

    // X unit as percentage of logo width (38.7 / 450)
    const xUnitPercent = (38.7 / 410) * 100; // Using content width which is approx 410

    // Actually, let's use the natural dimensions of the SVG (450x300)
    // X = 38.7 units in 450 wide space.
    const XWidthPercent = 38.7 / 450 * 100;
    const XHeightPercent = 38.7 / 300 * 100;

    const verticalMargin = mode === 'navbar' ? 0.5 : 1;

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <button
                    className={clsx(styles.button, mode === 'standard' && styles.buttonActive)}
                    onClick={() => setMode('standard')}
                >
                    Estándar (1X)
                </button>
                <button
                    className={clsx(styles.button, mode === 'navbar' && styles.buttonActive)}
                    onClick={() => setMode('navbar')}
                >
                    Navbar (0.5X Vertical)
                </button>
            </div>

            <div className={styles.visualizer}>
                <div className={styles.logoWrapper}>
                    <img
                        src={logoUrl}
                        alt="Logo CODE ME"
                        className={styles.logo}
                        style={{ width: '450px', height: '300px' }}
                    />

                    {/* Reference X on the O */}
                    <div className={styles.xReference} title="Referencia X (Altura de 'O')" />

                    {/* Top Margin */}
                    <div
                        className={styles.margin}
                        style={{
                            top: `-${verticalMargin * XHeightPercent}%`,
                            left: `-${XWidthPercent}%`,
                            right: `-${XWidthPercent}%`,
                            height: `${verticalMargin * XHeightPercent}%`,
                            borderBottom: 'none'
                        }}
                    >
                        <span className={styles.marginLabel}>{mode === 'navbar' ? '0.5X' : '1X'}</span>
                    </div>

                    {/* Bottom Margin */}
                    <div
                        className={styles.margin}
                        style={{
                            bottom: `-${verticalMargin * XHeightPercent}%`,
                            left: `-${XWidthPercent}%`,
                            right: `-${XWidthPercent}%`,
                            height: `${verticalMargin * XHeightPercent}%`,
                            borderTop: 'none'
                        }}
                    >
                        <span className={styles.marginLabel}>{mode === 'navbar' ? '0.5X' : '1X'}</span>
                    </div>

                    {/* Left Margin */}
                    <div
                        className={styles.margin}
                        style={{
                            left: `-${XWidthPercent}%`,
                            top: 0,
                            bottom: 0,
                            width: `${XWidthPercent}%`,
                            borderRight: 'none'
                        }}
                    >
                        <span className={styles.marginLabel}>1X</span>
                    </div>

                    {/* Right Margin */}
                    <div
                        className={styles.margin}
                        style={{
                            right: `-${XWidthPercent}%`,
                            top: 0,
                            bottom: 0,
                            width: `${XWidthPercent}%`,
                            borderLeft: 'none'
                        }}
                    >
                        <span className={styles.marginLabel}>1X</span>
                    </div>
                </div>
            </div>

            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={clsx(styles.dot, styles.dotX)} />
                    <span>Unidad X (Altura de "O")</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={clsx(styles.dot, styles.dotMargin)} />
                    <span>Espacio Libre (Clear Space)</span>
                </div>
            </div>
        </div>
    );
};

export default LogoRules;
