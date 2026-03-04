import React, { useState, useMemo, useEffect } from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import { IconContext } from '@phosphor-icons/react';
import { toast, Toaster } from 'sonner';
import styles from './styles.module.css';

const RGB_COLORS = [
    { name: 'Obsidiana Digital', value: '#0F172A', isDark: true },
    { name: 'Rosa Ajolote', value: '#FF2A6D', isDark: false },
    { name: 'Verde Terminal', value: '#05FF00', isDark: false },
    { name: 'Cyan Eléctrico', value: '#00F0FF', isDark: false },
    { name: 'Blanco Consola', value: '#F8FAFC', isDark: false },
];

const CMYK_COLORS = [
    { name: 'Obsidiana Rich Black', value: '#000000', isDark: true },
    { name: 'Rosa Ajolote (Print)', value: '#E6007E', isDark: false },
    { name: 'Cyan de Proceso', value: '#00AEEF', isDark: false },
    { name: 'Verde Lima', value: '#80C342', isDark: false },
];

const STYLES = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];

export default function IconShowcase() {
    const [search, setSearch] = useState('');
    const [weight, setWeight] = useState('regular');
    const [size, setSize] = useState(48);
    const [paletteMode, setPaletteMode] = useState('rgb'); // 'rgb' or 'cmyk'
    const [selectedColor, setSelectedColor] = useState('#FF2A6D');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(1);

    // Filter out non-icon exports, internal tools and aliases
    const iconNames = useMemo(() => {
        return Object.keys(PhosphorIcons).filter(
            (name) => {
                const item = PhosphorIcons[name];
                // Icons in Phosphor are components (functions or objects like forwardRef)
                if (!item || (typeof item !== 'function' && typeof item !== 'object')) return false;

                const isIcon = /^[A-Z]/.test(name) && !name.endsWith('Props');
                const isNotInternal = name !== 'IconContext' && name !== 'IconBase';

                // Omit aliases: In Phosphor, aliases have a displayName that matches the original icon.
                // If the export name (name) doesn't match the displayName, it's an alias.
                const displayName = item.displayName || item.name;
                const isAlias = displayName && displayName !== name;

                return isIcon && isNotInternal && !isAlias;
            }
        ).sort();
    }, []);

    const allFilteredIcons = useMemo(() => {
        const query = search.toLowerCase();
        return iconNames.filter((name) => name.toLowerCase().includes(query));
    }, [search, iconNames]);

    const totalIcons = allFilteredIcons.length;
    const isAll = pageSize === 'all';
    const totalPages = isAll ? 1 : Math.ceil(totalIcons / pageSize);

    const filteredIcons = useMemo(() => {
        if (isAll) return allFilteredIcons;
        const start = (page - 1) * pageSize;
        return allFilteredIcons.slice(start, start + pageSize);
    }, [allFilteredIcons, page, pageSize, isAll]);

    const currentPalette = paletteMode === 'rgb' ? RGB_COLORS : CMYK_COLORS;

    // Filter out colors that don't contrast
    const availableColors = useMemo(() => {
        return currentPalette.filter(c => {
            if (isDarkMode) {
                // In dark mode, hide extremely dark colors
                return !c.isDark;
            } else {
                // In light mode, hide extremely light colors
                return c.value !== '#F8FAFC';
            }
        });
    }, [currentPalette, isDarkMode]);

    // Ensure selected color is valid for the mode
    useEffect(() => {
        if (!availableColors.find(c => c.value === selectedColor)) {
            setSelectedColor(availableColors[0].value);
        }
    }, [availableColors]);

    // Reset page when search or pageSize changes
    useEffect(() => {
        setPage(1);
    }, [search, pageSize]);

    const bgColor = isDarkMode ? '#0F172A' : '#F8FAFC';
    const iconColor = isDarkMode ? selectedColor : selectedColor === '#F8FAFC' ? '#0F172A' : selectedColor;

    const handleReset = () => {
        setSearch('');
        setWeight('regular');
        setSize(48);
        setPaletteMode('rgb');
        setSelectedColor('#FF2A6D');
        setPageSize(25);
        setIsDarkMode(true);
    };

    const handleRandom = () => {
        const randomStyle = STYLES[Math.floor(Math.random() * STYLES.length)];
        const randomSize = Math.floor(Math.random() * (96 - 16 + 1)) + 16;
        const nextIsDarkMode = Math.random() > 0.5;
        const nextPaletteMode = Math.random() > 0.5 ? 'rgb' : 'cmyk';

        // Temporarily set palette and dark mode to determine available colors for random selection
        const tempCurrentPalette = nextPaletteMode === 'rgb' ? RGB_COLORS : CMYK_COLORS;
        const tempAvailableColors = tempCurrentPalette.filter(c => {
            if (nextIsDarkMode) {
                return !c.isDark;
            } else {
                return c.value !== '#F8FAFC';
            }
        });
        const randomColor = tempAvailableColors[Math.floor(Math.random() * tempAvailableColors.length)].value;

        setWeight(randomStyle);
        setSize(randomSize);
        setPaletteMode(nextPaletteMode);
        setIsDarkMode(nextIsDarkMode);
        setSelectedColor(randomColor);
    };

    const handleCopy = (name) => {
        navigator.clipboard.writeText(name);
        toast.success(`Ícono ${name} copiado`, {
            style: {
                background: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                color: isDarkMode ? '#fff' : '#0F172A',
                border: `1px solid ${iconColor}`,
                backdropFilter: 'blur(10px)',
            },
        });
    };

    // Safe icon components for the toolbar
    const SearchIcon = PhosphorIcons.MagnifyingGlass || (() => null);
    const ResetIcon = PhosphorIcons.ArrowCounterClockwise || (() => null);
    const RandomIcon = PhosphorIcons.DiceFive || PhosphorIcons.ArrowsClockwise || (() => null);
    const CaretLeft = PhosphorIcons.CaretLeft || (() => null);
    const CaretRight = PhosphorIcons.CaretRight || (() => null);
    const SunIcon = PhosphorIcons.Sun || (() => null);
    const MoonIcon = PhosphorIcons.Moon || (() => null);
    const CopyIcon = PhosphorIcons.CopySimple || (() => null);

    return (
        <div
            className={`${styles.showcaseContainer} ${!isDarkMode ? styles.lightMode : ''}`}
            style={{
                '--bg-color': bgColor,
                '--icon-color': iconColor,
                '--panel-bg': isDarkMode ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.6)',
                '--text-main': isDarkMode ? '#ffffff' : '#0F172A',
                '--text-muted': isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(15, 23, 42, 0.5)',
                '--border-color': isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.1)'
            }}
        >
            <Toaster position="bottom-center" />
            <div className={styles.toolbar}>
                <div className={styles.toolbarMain}>
                    {/* Palette Mode */}
                    <div className={styles.toolGroup}>
                        <label className={styles.fieldLabel}>Modo</label>
                        <select
                            value={paletteMode}
                            onChange={(e) => setPaletteMode(e.target.value)}
                            className={styles.select}
                        >
                            <option value="rgb">Digital (RGB)</option>
                            <option value="cmyk">Impresión (CMYK)</option>
                        </select>
                    </div>

                    {/* Style Selector */}
                    <div className={styles.toolGroup}>
                        <label className={styles.fieldLabel}>Estilo</label>
                        <select
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className={styles.select}
                        >
                            {STYLES.map(s => (
                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search */}
                    <div className={styles.searchGroup}>
                        <label className={styles.fieldLabel}>Búsqueda</label>
                        <div className={styles.inputWrapper}>
                            <SearchIcon className={styles.searchIcon} size={18} />
                            <input
                                type="text"
                                placeholder="Nombre del ícono..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    {/* Size Slider */}
                    <div className={styles.toolGroup}>
                        <label className={styles.fieldLabel}>Tamaño ({size}px)</label>
                        <div className={styles.sliderWrapper}>
                            <input
                                type="range"
                                min="16"
                                max="96"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className={styles.range}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.toolbarActions}>
                    {/* Color Toggles */}
                    <div className={styles.colorGroup}>
                        {availableColors.map((c) => (
                            <button
                                key={c.name}
                                className={`${styles.colorBtn} ${c.value === selectedColor ? styles.activeColor : ''}`}
                                style={{ backgroundColor: c.value }}
                                onClick={() => setSelectedColor(c.value)}
                                title={c.name}
                            />
                        ))}
                    </div>

                    <div className={styles.divider} />

                    {/* Actions */}
                    <div className={styles.actionGroup}>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={styles.actionBtn}
                            title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
                        >
                            {isDarkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                        </button>
                        <button onClick={handleReset} className={styles.actionBtn} title="Restablecer">
                            <ResetIcon size={18} />
                        </button>
                        <button onClick={handleRandom} className={styles.actionBtn} title="Aleatorio">
                            <RandomIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.gridContainer}>
                <IconContext.Provider
                    value={{
                        color: iconColor,
                        size: size,
                        weight: weight,
                        mirrored: false,
                    }}
                >
                    <div className={styles.iconGrid}>
                        {filteredIcons.length > 0 ? (
                            filteredIcons.map((name) => {
                                const Icon = PhosphorIcons[name];
                                if (!Icon) return null;
                                return (
                                    <div key={name} className={styles.iconCard}>
                                        <div className={styles.iconWrapper}>
                                            <Icon />
                                        </div>
                                        <div className={styles.nameContainer}>
                                            <span className={styles.iconName}>{name}</span>
                                            <button
                                                className={styles.copyBtn}
                                                onClick={() => handleCopy(name)}
                                                title="Copiar nombre"
                                            >
                                                <CopyIcon size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.noResults}>No se encontraron íconos para "{search}"</div>
                        )}
                    </div>
                </IconContext.Provider>
            </div>

            {/* Pagination Footer */}
            <div className={styles.footer}>
                <div className={styles.paginationInfo}>
                    Mostrando {filteredIcons.length} de {totalIcons} íconos
                </div>

                <div className={styles.paginationControls}>
                    {!isAll && totalPages > 1 && (
                        <div className={styles.pageButtons}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className={styles.pageBtn}
                            >
                                <CaretLeft size={16} />
                            </button>
                            <span className={styles.pageIndicator}>Página {page} de {totalPages}</span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(p => p + 1)}
                                className={styles.pageBtn}
                            >
                                <CaretRight size={16} />
                            </button>
                        </div>
                    )}

                    <div className={styles.pageSizeSelect}>
                        <label className={styles.footerLabel}>Mostrar:</label>
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                            className={styles.smallSelect}
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">Todos</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
