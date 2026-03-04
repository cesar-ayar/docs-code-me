import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';

/**
 * Componente Icon para usar PhosphorIcons en MDX
 * @param {string} name - Nombre del icono (ej. "CaretRight", "Cpu")
 * @param {number|string} size - Tamaño del icono
 * @param {string} color - Color del icono
 * @param {string} weight - Peso del icono ('thin', 'light', 'regular', 'bold', 'fill', 'duotone')
 * @param {object} props - Propiedades adicionales de PhosphorIcons
 */
const Icon = ({ name, size = 24, color = 'currentColor', weight = 'regular', ...props }) => {
    const PhosphorIcon = PhosphorIcons[name];

    if (!PhosphorIcon) {
        console.warn(`Icon "${name}" not found in @phosphor-icons/react`);
        return null;
    }

    return <PhosphorIcon size={size} color={color} weight={weight} {...props} />;
};

export default Icon;
