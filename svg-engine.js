const SVGEngine = (() => {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    let patternIdCounter = 0;

    function createSVG(width, height) {
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.style.overflow = 'visible';
        return svg;
    }

    function el(tag, attrs) {
        const e = document.createElementNS(SVG_NS, tag);
        for (const [k, v] of Object.entries(attrs)) {
            e.setAttribute(k, v);
        }
        return e;
    }

    function getOrCreateDefs(svg) {
        let defs = svg.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS(SVG_NS, 'defs');
            svg.prepend(defs);
        }
        return defs;
    }

    // --- Point generators ---

    function polygonPoints(cx, cy, r, sides, startAngle) {
        const a0 = startAngle !== undefined ? startAngle : -Math.PI / 2;
        const step = (2 * Math.PI) / sides;
        return Array.from({ length: sides }, (_, i) => {
            const angle = a0 + i * step;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(' ');
    }

    function starPoints(cx, cy, outerR, innerR, points) {
        const step = Math.PI / points;
        const a0 = -Math.PI / 2;
        return Array.from({ length: points * 2 }, (_, i) => {
            const r = i % 2 === 0 ? outerR : innerR;
            const angle = a0 + i * step;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        }).join(' ');
    }

    function crossPoints(cx, cy, s) {
        const t = s * 0.3;
        return [
            `${cx - t},${cy - s / 2}`, `${cx + t},${cy - s / 2}`,
            `${cx + t},${cy - t}`, `${cx + s / 2},${cy - t}`,
            `${cx + s / 2},${cy + t}`, `${cx + t},${cy + t}`,
            `${cx + t},${cy + s / 2}`, `${cx - t},${cy + s / 2}`,
            `${cx - t},${cy + t}`, `${cx - s / 2},${cy + t}`,
            `${cx - s / 2},${cy - t}`, `${cx - t},${cy - t}`
        ].join(' ');
    }

    // Arrow polygon derived from UXWing up-arrow icon silhouette
    // Normalized coordinates: center (0,0), range -0.5 to +0.5
    const ARROW_VERTS = [
        [-0.500, -0.088],  // left wing tip
        [-0.092, -0.489],  // left edge of point
        [ 0.100, -0.489],  // right edge of point
        [ 0.500, -0.096],  // right wing tip
        [ 0.307,  0.100],  // right wing inner
        [ 0.138, -0.066],  // right neck
        [ 0.136,  0.489],  // right shaft bottom
        [-0.139,  0.487],  // left shaft bottom
        [-0.136, -0.060],  // left neck
        [-0.307,  0.108]   // left wing inner
    ];

    function arrowPoints(cx, cy, s) {
        return ARROW_VERTS.map(([px, py]) => `${cx + px * s},${cy + py * s}`).join(' ');
    }

    // --- Size map ---
    function getSize(sizeStr) {
        const map = { tiny: 8, small: 14, medium: 22, large: 32, xlarge: 42 };
        if (typeof sizeStr === 'number') return sizeStr;
        return map[sizeStr] || 22;
    }

    // --- Fill ---
    function applyFill(element, fillType, color, svg) {
        if (!fillType || fillType === 'solid') {
            element.setAttribute('fill', color || '#ffffff');
        } else if (fillType === 'none') {
            element.setAttribute('fill', 'none');
        } else if (fillType === 'striped') {
            const id = `strp-${patternIdCounter++}`;
            const defs = getOrCreateDefs(svg);
            const pat = el('pattern', { id, patternUnits: 'userSpaceOnUse', width: '6', height: '6' });
            pat.appendChild(el('rect', { width: '6', height: '6', fill: 'none' }));
            pat.appendChild(el('line', { x1: '0', y1: '0', x2: '6', y2: '6', stroke: color || '#ffffff', 'stroke-width': '1.5' }));
            defs.appendChild(pat);
            element.setAttribute('fill', `url(#${id})`);
        } else if (fillType === 'dotted') {
            const id = `dot-${patternIdCounter++}`;
            const defs = getOrCreateDefs(svg);
            const pat = el('pattern', { id, patternUnits: 'userSpaceOnUse', width: '6', height: '6' });
            pat.appendChild(el('rect', { width: '6', height: '6', fill: 'none' }));
            pat.appendChild(el('circle', { cx: '3', cy: '3', r: '1.2', fill: color || '#ffffff' }));
            defs.appendChild(pat);
            element.setAttribute('fill', `url(#${id})`);
        }
    }

    // --- Render a single shape ---
    function renderShape(desc, svg, cx, cy) {
        const s = getSize(desc.size);
        const color = desc.color || '#ffffff';
        let shape;

        switch (desc.shape) {
            case 'circle':
                shape = el('circle', { cx, cy, r: s / 2 });
                break;
            case 'square':
                shape = el('rect', { x: cx - s / 2, y: cy - s / 2, width: s, height: s });
                break;
            case 'rect':
                shape = el('rect', { x: cx - s * 0.7, y: cy - s * 0.35, width: s * 1.4, height: s * 0.7 });
                break;
            case 'triangle':
                shape = el('polygon', { points: polygonPoints(cx, cy, s / 2, 3) });
                break;
            case 'diamond':
                shape = el('polygon', { points: polygonPoints(cx, cy, s / 2, 4) });
                break;
            case 'pentagon':
                shape = el('polygon', { points: polygonPoints(cx, cy, s / 2, 5) });
                break;
            case 'hexagon':
                shape = el('polygon', { points: polygonPoints(cx, cy, s / 2, 6) });
                break;
            case 'heptagon':
                shape = el('polygon', { points: polygonPoints(cx, cy, s / 2, 7) });
                break;
            case 'star':
                shape = el('polygon', { points: starPoints(cx, cy, s / 2, s / 4.5, 5) });
                break;
            case 'cross':
                shape = el('polygon', { points: crossPoints(cx, cy, s) });
                break;
            case 'arrow':
                shape = el('polygon', { points: arrowPoints(cx, cy, s) });
                break;
            case 'dot':
                shape = el('circle', { cx, cy, r: s / 2 });
                break;
            case 'lshape': {
                // L-shaped tetromino: 3 unit squares forming an L
                const u = s / 3;
                const pts = [
                    `${cx - u * 1.5},${cy - u}`,
                    `${cx - u * 0.5},${cy - u}`,
                    `${cx - u * 0.5},${cy}`,
                    `${cx + u * 1.5},${cy}`,
                    `${cx + u * 1.5},${cy + u}`,
                    `${cx - u * 1.5},${cy + u}`
                ].join(' ');
                shape = el('polygon', { points: pts });
                break;
            }
            default:
                shape = el('circle', { cx, cy, r: s / 2 });
        }

        applyFill(shape, desc.fill, color, svg);
        shape.setAttribute('stroke', color);
        shape.setAttribute('stroke-width', desc.strokeWidth || '2');

        if (desc.rotation) {
            shape.setAttribute('transform', `rotate(${desc.rotation} ${cx} ${cy})`);
        }

        svg.appendChild(shape);

        // Nested inner shape
        if (desc.inner) {
            const innerDesc = { ...desc.inner, size: desc.inner.size || (getSize(desc.size) * 0.45) };
            renderShape(innerDesc, svg, cx, cy);
        }
    }

    // --- Render a cell (array of shape descriptors) into an SVG ---
    function renderCell(descriptors, width, height) {
        width = width || 80;
        height = height || 80;
        const svg = createSVG(width, height);
        const cx = width / 2;
        const cy = height / 2;

        if (!descriptors || descriptors.length === 0) return svg;

        if (descriptors.length === 1 && (descriptors[0].count || 1) === 1) {
            renderShape(descriptors[0], svg, cx, cy);
        } else if (descriptors.length === 1 && descriptors[0].count > 1) {
            // Multiple instances of same shape arranged in grid
            const count = descriptors[0].count;
            const cols = Math.ceil(Math.sqrt(count));
            const rows = Math.ceil(count / cols);
            const spacingX = width / (cols + 1);
            const spacingY = height / (rows + 1);
            let idx = 0;
            for (let r = 0; r < rows && idx < count; r++) {
                for (let c = 0; c < cols && idx < count; c++) {
                    const sx = spacingX * (c + 1);
                    const sy = spacingY * (r + 1);
                    renderShape(descriptors[0], svg, sx, sy);
                    idx++;
                }
            }
        } else {
            // Multiple different shapes: stack them centered
            for (const desc of descriptors) {
                const ox = desc.x || 0;
                const oy = desc.y || 0;
                if (desc.count && desc.count > 1) {
                    const count = desc.count;
                    const cols = Math.ceil(Math.sqrt(count));
                    const rows = Math.ceil(count / cols);
                    const spacingX = width / (cols + 1);
                    const spacingY = height / (rows + 1);
                    let idx = 0;
                    for (let r = 0; r < rows && idx < count; r++) {
                        for (let c = 0; c < cols && idx < count; c++) {
                            renderShape(desc, svg, spacingX * (c + 1), spacingY * (r + 1));
                            idx++;
                        }
                    }
                } else {
                    renderShape(desc, svg, cx + ox, cy + oy);
                }
            }
        }

        return svg;
    }

    // --- Render 3x3 matrix ---
    function renderMatrix(grid) {
        const container = document.createElement('div');
        container.className = 'matrix-grid';

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            if (grid[i] === null) {
                cell.classList.add('missing');
                // Question mark indicator
                const svg = createSVG(80, 80);
                const qmark = el('text', {
                    x: 40, y: 48,
                    'text-anchor': 'middle',
                    'font-size': '36',
                    'font-weight': 'bold',
                    fill: 'rgba(247,151,30,0.5)',
                    'font-family': 'sans-serif'
                });
                qmark.textContent = '?';
                svg.appendChild(qmark);
                cell.appendChild(svg);
            } else {
                cell.appendChild(renderCell(grid[i], 80, 80));
            }

            container.appendChild(cell);
        }

        return container;
    }

    // --- Render figure series ---
    function renderSeries(sequence) {
        const container = document.createElement('div');
        container.className = 'series-row';

        sequence.forEach((fig, i) => {
            const item = document.createElement('div');
            item.className = 'series-item';
            item.appendChild(renderCell(fig, 70, 70));
            container.appendChild(item);

            if (i < sequence.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'series-arrow';
                arrow.textContent = '\u25B6';
                container.appendChild(arrow);
            }
        });

        // Add the "?" box
        const arrow = document.createElement('span');
        arrow.className = 'series-arrow';
        arrow.textContent = '\u25B6';
        container.appendChild(arrow);

        const missing = document.createElement('div');
        missing.className = 'series-item missing';
        const svg = createSVG(70, 70);
        const qmark = el('text', {
            x: 35, y: 42,
            'text-anchor': 'middle',
            'font-size': '30',
            'font-weight': 'bold',
            fill: 'rgba(247,151,30,0.5)',
            'font-family': 'sans-serif'
        });
        qmark.textContent = '?';
        svg.appendChild(qmark);
        missing.appendChild(svg);
        container.appendChild(missing);

        return container;
    }

    // --- Render rotation stimulus ---
    function renderRotationStimulus(original, transformLabel) {
        const container = document.createElement('div');
        container.className = 'rotation-layout';

        // Original figure
        const origBox = document.createElement('div');
        origBox.className = 'rotation-original';
        origBox.appendChild(renderCell(original, 100, 100));
        container.appendChild(origBox);

        // Transform indicator: simple text badge with icon + angle
        const indicator = document.createElement('div');
        indicator.className = 'rotation-indicator';

        const labelMap = {
            'rotate90':  '↻ 90°',
            'rotate180': '↻ 180°',
            'rotate270': '↻ 270°',
            'mirror':    '↔ Mirror',
            'mirrorH':   '↔ Mirror',
            'mirrorV':   '↕ Mirror'
        };
        indicator.textContent = labelMap[transformLabel] || transformLabel;

        container.appendChild(indicator);

        return container;
    }

    return {
        renderCell,
        renderMatrix,
        renderSeries,
        renderRotationStimulus
    };
})();
