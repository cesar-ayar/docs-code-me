import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const errors = [
    {
        code: 'ERROR 400',
        title: 'Bad Request',
        label: 'No estirar, aplastar o distorsionar las proporciones. Usa siempre Shift al escalar.',
        className: styles.distorted,
    },
    {
        code: 'ERROR 404',
        title: 'Not Found',
        label: 'No cambiar la tipografía. "CODE ME" no puede escribirse en fuentes genéricas.',
        isCustom: true,
        render: () => <div className={styles.wrongFont}>CODE ME</div>,
    },
    {
        code: 'ERROR 500',
        title: 'Low Contrast',
        label: 'No colocar el logo sobre fondos de colores vibrantes que compitan con el neón.',
        wrapperClass: styles.vibrantBg,
    },
    {
        code: 'SYNTAX ERROR',
        title: 'Missing Code',
        label: 'No eliminar el guion bajo "_" de la palabra "STUDIO_". Es parte del código.',
        isCustom: true,
        render: () => (
            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                <span style={{ color: '#00ffcc' }}>[</span>
                CODE ME
                <span style={{ color: '#00ffcc' }}>]</span>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>STUDIO</div>
            </div>
        ),
    },
    {
        code: 'GLITCH NO AUTORIZADO',
        title: 'Shadow Glitch',
        label: 'No aplicar sombras paralelas (Drop Shadow). El logo es la fuente de luz.',
        className: styles.withShadow,
    },
    {
        code: 'COLOR SWAP',
        title: 'Hue Alteration',
        label: 'No invertir los colores de los corchetes sin aprobación previa de Dirección.',
        className: styles.colorSwap,
    },
];

const ErrorShowcase = () => {
    const logoUrl = useBaseUrl('/img/logos/Master_Dark.svg');

    return (
        <div className={styles.container}>
            {errors.map((error, index) => (
                <div key={index} className={styles.errorCard}>
                    <div className={`${styles.visualArea} ${error.wrapperClass || ''}`}>
                        {error.isCustom ? (
                            error.render()
                        ) : (
                            <img
                                src={logoUrl}
                                alt={error.title}
                                className={`${styles.logoBase} ${error.className || ''}`}
                            />
                        )}
                        <div
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                fontSize: '1.5rem',
                                filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))'
                            }}
                        >
                            ❌
                        </div>
                    </div>
                    <div className={styles.content}>
                        <span className={styles.badge}>{error.code}</span>
                        <h4 className={styles.errorTitle}>{error.title}</h4>
                        <p className={styles.errorLabel}>{error.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ErrorShowcase;
