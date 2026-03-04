import React, { useState } from 'react';
import styles from './styles.module.css';

const SafeZoneCalculator = () => {
    const [value, setValue] = useState(10);
    const [unitType, setUnitType] = useState('absolute');
    const [unit, setUnit] = useState('px');

    const unitOptions = {
        absolute: ['cm', 'mm', 'Q', 'in', 'pc', 'pt', 'px'],
        relative: ['em', 'ex', 'ch', 'rem', 'lh', 'vw', 'vh', 'vmin', 'vmax']
    };

    const handleUnitTypeChange = (e) => {
        const type = e.target.value;
        setUnitType(type);
        setUnit(unitOptions[type][type === 'absolute' ? 6 : 3]); // Default px or rem
    };

    const formatValue = (val) => {
        // Round to 2 decimal places if needed
        return Number.isInteger(val) ? val : parseFloat(val.toFixed(2));
    };

    return (
        <div className={styles.calculator}>
            <h3 className={styles.title}>Calculadora de <span className={styles.highlight}>Área de Seguridad</span></h3>

            <div className={styles.grid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Valor de X (Altura O)</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                        className={styles.input}
                        min="0"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Tipo de Unidad</label>
                    <select
                        value={unitType}
                        onChange={handleUnitTypeChange}
                        className={styles.select}
                    >
                        <option value="absolute">Absoluta</option>
                        <option value="relative">Relativa</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Unidad</label>
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className={styles.select}
                    >
                        {unitOptions[unitType].map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.results}>
                <div className={styles.resultCard}>
                    <div className={styles.resultLabel}>MAREGEN ESTÁNDAR (1X)</div>
                    <div className={styles.resultValue}>
                        {formatValue(value)}
                        <span className={styles.resultUnit}>{unit}</span>
                    </div>
                </div>

                <div className={styles.resultCard}>
                    <div className={styles.resultLabel}>MARGEN NAVBAR (0.5X)</div>
                    <div className={styles.resultValue}>
                        {formatValue(value * 0.5)}
                        <span className={styles.resultUnit}>{unit}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SafeZoneCalculator;
