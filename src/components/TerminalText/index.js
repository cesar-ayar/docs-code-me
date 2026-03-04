import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**
 * TerminalText Component
 * Simulates a retro hacker terminal with typewriter effect and flashing cursor.
 * 
 * @param {string} text - The text to display
 * @param {number} speed - Typing speed in ms (default: 50)
 * @param {string} color - Text color (cyan, pink, green, white)
 * @param {boolean} animated - Whether to animate the typing
 */
const TerminalText = ({
    text = "",
    speed = 40,
    color = 'cyan',
    delay = 0
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        let timeout;
        let currentIndex = 0;

        const type = () => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
                timeout = setTimeout(type, speed);
            } else {
                setComplete(true);
            }
        };

        const initialDelay = setTimeout(() => {
            type();
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(initialDelay);
        };
    }, [text, speed, delay]);

    return (
        <div className={`${styles.terminalWrapper} ${styles[color]}`}>
            <span className={styles.text}>{displayedText}</span>
            <span className={styles.cursor}></span>
        </div>
    );
};

export default TerminalText;
