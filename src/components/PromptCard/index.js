import React, { useState } from 'react';
import styles from './styles.module.css';

export default function PromptCard({
    title,
    icon,
    prompt,
    tags = [],
    variables = {}
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={styles.promptCard}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <h3 className={styles.title}>{title}</h3>
                </div>
                <button
                    className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
                    onClick={handleCopy}
                    aria-label="Copiar prompt"
                >
                    {copied ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            COPIADO
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            COPIAR PROMPT
                        </>
                    )}
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.promptBlock}>
                    <p className={styles.promptText}>{prompt}</p>
                </div>

                {Object.keys(variables).length > 0 && (
                    <div className={styles.variables}>
                        <div className={styles.varTitle}>Variables a completar:</div>
                        <div className={styles.varList}>
                            {Object.entries(variables).map(([key, desc]) => (
                                <div key={key} className={styles.varItem}>
                                    <span className={styles.varKey}>[{key}]</span> {desc}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tags.length > 0 && (
                    <div className={styles.tags} style={{ marginTop: Object.keys(variables).length ? '1rem' : '0' }}>
                        {tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
