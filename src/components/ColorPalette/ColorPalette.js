import React from 'react';
import styles from './styles.module.css';

export default function ColorPalette({ children, columns, rows = 1 }) {
    const childrenCount = React.Children.count(children);
    const calculatedColumns = columns || Math.ceil(childrenCount / rows);

    const gridStyle = {
        '--columns': calculatedColumns,
    };

    return (
        <div className={styles.paletteGrid} style={gridStyle}>
            {children}
        </div>
    );
}
