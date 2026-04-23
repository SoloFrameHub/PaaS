'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComponentState, hashText } from './use-component-state';

/* ------------------------------------------------------------------ */
/*  Body region data                                                   */
/* ------------------------------------------------------------------ */

interface BodyRegion {
    id: string;
    label: string;
    description: string;
    /** Primary dot position (in 200×420 viewport) */
    cx: number;
    cy: number;
    /** Optional second dot (e.g. hands shown on both sides) */
    cx2?: number;
    cy2?: number;
}

const REGIONS: BodyRegion[] = [
    {
        id: 'head',
        label: 'Head',
        description: 'Headaches, racing thoughts, dizziness, foggy thinking, or a feeling of pressure. Your brain is on high alert, consuming extra energy to scan for threats.',
        cx: 100, cy: 43,
    },
    {
        id: 'neck-shoulders',
        label: 'Neck & Shoulders',
        description: 'Tension, stiffness, aching, or the feeling of carrying a heavy weight. Your muscles are bracing for impact — a primal preparation to protect your head and vital organs.',
        cx: 100, cy: 100,
    },
    {
        id: 'chest',
        label: 'Chest',
        description: 'Tightness, pounding heart, shortness of breath, or a feeling of constriction. Your heart is pumping harder to send blood to your muscles, and your lungs are working overtime for oxygen.',
        cx: 100, cy: 155,
    },
    {
        id: 'stomach',
        label: 'Stomach',
        description: 'Butterflies, nausea, knots, cramps, or loss of appetite. Your body diverts blood away from digestion toward muscles — this is why anxiety so often hits the gut first.',
        cx: 100, cy: 215,
    },
    {
        id: 'hands',
        label: 'Hands',
        description: 'Trembling, sweaty palms, tingling, numbness, or clenching. Blood flow shifts to major muscle groups, leaving extremities cool and tingly. Sweat helps with grip — useful for climbing away from danger.',
        cx: 28, cy: 250,
        cx2: 172, cy2: 250,
    },
    {
        id: 'back',
        label: 'Back',
        description: 'Muscle pain, tension, aching, or stiffness along the spine. Your postural muscles tighten as your body unconsciously shifts into a defensive stance.',
        cx: 168, cy: 170,
    },
    {
        id: 'legs',
        label: 'Legs',
        description: 'Restlessness, weakness, jelly legs, an urge to pace, or feeling rooted to the spot. Your legs are primed for action — ready to run (flight) or frozen in place (freeze).',
        cx: 100, cy: 340,
    },
];

/**
 * Body silhouette path from reference SVG (20833×20833 coordinate space).
 * Rendered via <g transform="..."> to map into the 200×420 viewport.
 * Uses fill-rule="evenodd" to create the thick-bordered outline effect with
 * a hollow head circle and inner body contour.
 */
const BODY_PATH = `M 10416.650391 2219.929688 C 9417.765625 2219.931641 8601.783203 3035.912109 8601.782227 4034.798828 C 8601.783203 4721.668945 8989.176758 5318.477539 9555.143555 5626.481445 C 9528.211914 5631.680664 9500.311523 5633.453125 9473.608398 5639.274414 C 9473.470703 5639.292969 9473.331055 5639.301758 9473.193359 5639.331055 C 9473.25 5639.320313 9473.061523 5639.353516 9472.648438 5639.469727 C 9472.579102 5639.489258 9472.505859 5639.49707 9472.436523 5639.526367 C 8569.692383 5839.932617 7839.088867 6377.847656 7465.494629 7000.146484 C 7465.425781 7000.353516 7465.286621 7000.485352 7465.218262 7000.692383 C 7464.736328 7001.524414 7464.525879 7001.782227 7464.257813 7002.270508 C 7464.199707 7002.338867 7464.20752 7002.405273 7464.127441 7002.474609 C 7259.04541 7350.234375 7220.889648 7729.322266 7192.146973 8084.855469 L 6849.291992 12169.637695 L 6849.080566 12172.167969 L 6849.023438 12172.518555 L 6848.885254 12173.983398 C 6848.609863 12178.31543 6848.609863 12182.661133 6848.885254 12186.996094 C 6829.727539 12417.529297 6876.630859 12641.035156 6989.745605 12825.211914 C 7107.21875 13016.486328 7307.005859 13168.400391 7552.970215 13192.75 C 7798.573242 13217.061523 8023.716309 13108.814453 8179.02002 12947.314453 C 8332.668945 12787.536133 8430.401367 12573.499023 8460.124023 12337.100586 L 8540.8125 11695.385742 L 8575.578125 12329.044922 C 8575.635742 12329.987305 8575.711914 12330.918945 8575.78125 12331.860352 L 8575.837891 12332.821289 C 8587.59082 12515.650391 8591.163086 12683.017578 8591.894531 12870.572266 L 8591.894531 17621.509766 C 8591.894531 18146.324219 8980.907227 18612.728516 9501.977539 18612.728516 C 10016.612305 18612.728516 10384.748047 18156.441406 10409.635742 17651.089844 L 10416.682617 17522.460938 L 10422.126953 17650.871094 C 10446.791992 18156.423828 10816.514648 18612.736328 11331.323242 18612.736328 C 11852.392578 18612.736328 12241.40625 18146.333984 12241.40625 17621.517578 L 12241.40625 12871.419922 L 12241.40625 12870.939453 L 12241.40625 12870.524414 C 12242.148438 12682.724609 12245.724609 12515.181641 12257.519531 12332.040039 C 12257.577148 12331.310547 12257.588867 12330.578125 12257.658203 12329.842773 C 12257.628906 12330.688477 12257.714844 12329.066406 12257.714844 12329.052734 L 12257.771484 12327.816406 L 12292.480469 11695.458984 L 12373.168945 12337.060547 C 12402.890625 12573.458984 12500.624023 12787.495117 12654.272461 12947.273438 C 12809.567383 13108.763672 13034.702148 13217.080078 13280.322266 13192.765625 C 13526.306641 13168.414063 13726.078125 13016.4375 13843.546875 12825.171875 C 13930.52832 12683.541992 13979.075195 12518.578125 13988.126953 12345.279297 C 13988.333008 12341.916992 13988.333008 12338.556641 13988.126953 12335.197266 L 13988.15918 12335.229492 C 13988.021484 12333.97168 13987.950195 12332.711914 13987.744141 12331.454102 C 13989.649414 12284.005859 13988.362305 12235.916016 13984.367188 12187.492188 C 13984.642578 12182.988281 13984.642578 12178.46875 13984.367188 12173.966797 L 13984.228516 12172.501953 L 13984.171875 12171.655273 L 13983.967773 12169.572266 L 13641.056641 8084.179688 C 13612.314453 7728.825195 13574.091797 7349.942383 13369.075195 7002.360352 C 13369.092773 7002.388672 13369.060547 7002.291992 13369.075195 7002.303711 C 13369.0625 7002.28125 13369.018555 7002.276367 13369.018555 7002.246094 C 13369.224609 7002.589844 13369.226563 7002.583008 13368.538086 7001.449219 C 13368.263672 7000.967773 13367.991211 7000.551758 13367.756836 7000.097656 C 12994.165039 6377.803711 12263.554688 5839.882813 11360.807617 5639.477539 C 11360.256836 5639.34082 11359.907227 5639.274414 11359.790039 5639.274414 L 11359.586914 5639.274414 C 11332.636719 5633.400391 11304.654297 5631.731445 11277.490234 5626.538086 C 11843.724609 5318.645508 12231.460938 4721.867188 12231.461914 4034.798828 C 12231.460938 3035.917969 11415.535156 2219.931641 10416.650391 2219.929688 Z M 10416.723633 2537.255859 C 11243.777344 2537.253906 11914.237305 3207.710938 11914.241211 4034.765625 C 11914.242188 4861.820313 11243.782227 5532.283203 10416.726563 5532.28418 C 10416.725586 5532.28418 10416.724609 5532.28418 10416.723633 5532.28418 C 9589.669922 5532.279297 8919.212891 4861.818359 8919.213867 4034.765625 C 8919.217773 3207.714844 9589.672852 2537.259766 10416.723633 2537.255859 Z M 10371.362305 5864.364258 C 10385.662109 5864.364258 10400.356445 5864.429688 10416.658203 5864.567383 C 10710.023438 5863.591797 11013.388672 5888.522461 11292.106445 5949.276367 C 12110.716797 6131.00293 12776.525391 6631.704102 13095.759766 7163.452148 C 13257.092773 7436.921875 13296.688477 7762.170898 13324.861328 8110.685547 L 13668.171875 12200.472656 C 13702.167969 12548.361328 13520.541992 12850.076172 13249.040039 12876.953125 C 12977.541992 12903.830078 12731.614258 12644.189453 12688.020508 12297.469727 L 12244.726563 8772.355469 L 12243.318359 8759.554688 C 12241.046875 8730.251953 12221.088867 8706.491211 12189.729492 8705.941406 C 12170.811523 8705.941406 12153.070313 8716.375 12143.896484 8731.095703 C 12141.166016 8735.194336 12139.446289 8739.90918 12138.208008 8744.750977 C 12136.619141 8751.75 12135.561523 8761.845703 12135.148438 8771.208008 L 11940.901367 12311.645508 C 11928.545898 12503.536133 11924.87207 12678.896484 11924.128906 12870.524414 L 11924.128906 17621.476563 C 11924.128906 17994.789063 11659.793945 18295.353516 11331.379883 18295.353516 C 11002.966797 18295.353516 10750.211914 17994.554688 10738.582031 17621.476563 L 10521.191406 12563.354492 C 10521.191406 12563.079102 10521.167969 12562.946289 10521.15918 12562.670898 L 10521.15918 12563.354492 C 10520.268555 12541.806641 10519.572266 12524.538086 10514.021484 12507.243164 C 10510.694336 12496.865234 10505.632813 12486.476563 10497.729492 12475.163086 C 10486.102539 12459.728516 10470.288086 12447.631836 10451.994141 12440.527344 C 10451.994141 12440.522461 10451.974609 12440.53125 10451.960938 12440.527344 C 10444.649414 12437.6875 10436.939453 12435.644531 10428.947266 12434.489258 C 10428.947266 12434.487305 10428.927734 12434.491211 10428.914063 12434.489258 C 10424.911133 12433.890625 10420.847656 12433.547852 10416.707031 12433.480469 C 10412.574219 12433.583008 10408.495117 12433.938477 10404.492188 12434.489258 C 10400.504883 12435.05957 10396.538086 12435.870117 10392.700195 12436.874023 C 10381.164063 12439.905273 10370.379883 12444.834961 10360.758789 12451.334961 C 10351.141602 12457.829102 10342.666016 12465.90625 10335.693359 12475.163086 C 10330.424805 12482.706055 10326.390625 12489.829102 10323.323242 12496.818359 C 10320.249023 12503.807617 10318.113281 12510.686523 10316.59375 12517.667969 C 10315.073242 12524.651367 10314.229492 12531.757813 10313.541992 12539.282227 C 10312.950195 12546.810547 10312.607422 12554.734375 10312.263672 12563.354492 L 10312.263672 12562.670898 C 10312.263672 12562.946289 10312.241211 12563.079102 10312.231445 12563.354492 L 10094.848633 17621.476563 C 10083.219727 17994.554688 9830.463867 18295.353516 9502.050781 18295.353516 C 9173.635742 18295.353516 8909.293945 17994.787109 8909.293945 17621.476563 L 8909.293945 12870.515625 C 8908.560547 12678.890625 8904.891602 12503.510742 8892.537109 12311.621094 L 8698.291016 8771.183594 C 8697.87793 8761.820313 8696.803711 8751.724609 8695.214844 8744.726563 C 8693.976563 8739.886719 8692.240234 8735.169922 8689.509766 8731.071289 C 8680.335938 8716.350586 8662.613281 8705.932617 8643.693359 8705.932617 C 8612.335938 8706.508789 8592.350586 8730.226563 8590.087891 8759.530273 L 8588.639648 8772.338867 L 8145.385742 12297.460938 C 8101.792969 12644.181641 7855.866699 12903.822266 7584.366699 12876.945313 C 7312.864746 12850.067383 7131.238281 12548.353516 7165.234375 12200.463867 L 7508.520508 8110.661133 C 7536.692383 7762.146484 7576.321777 7436.911133 7737.654785 7163.444336 C 8056.888184 6631.693359 8722.707031 6130.996094 9541.316406 5949.267578 C 9792.094727 5894.606445 10062.961914 5868.569336 10328.442383 5864.608398 L 10328.385742 5864.591797 C 10343.155273 5864.443359 10357.0625 5864.381836 10371.362305 5864.388672 L 10371.362305 5864.364258 Z`;

/* ------------------------------------------------------------------ */
/*  Transform: maps the 20833-space path into a 200×420 viewport       */
/*  Body center ≈ (10416, 10416). Scale = 200/8400 ≈ 0.02381          */
/* ------------------------------------------------------------------ */
const BODY_TRANSFORM = 'translate(100, 210) scale(0.02381) translate(-10416, -10416)';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface BodyMapProps {
    title?: string;
    prompt?: string;
    persistKey?: string;
}

function hashStr(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return `bodymap_${Math.abs(h).toString(36)}`;
}

export default function BodyMap({
    title = 'Your Anxiety Body Map',
    prompt = 'Tap the areas where you typically feel anxiety symptoms.',
    persistKey,
}: BodyMapProps) {
    const storageKey = useMemo(() => persistKey ?? hashStr(title), [persistKey, title]);
    const componentKey = useMemo(() => hashText(title + prompt), [title, prompt]);
    const { state: serverState, loading: serverLoading, getComponentData, saveComponentData } = useComponentState();
    const hydratedRef = useRef(false);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [activeRegion, setActiveRegion] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    // Load persisted state: prefer server, fallback to localStorage
    useEffect(() => {
        if (serverLoading) return;
        if (hydratedRef.current) return;
        hydratedRef.current = true;

        const serverData = getComponentData('bodyMaps', componentKey);
        if (serverData && Array.isArray(serverData)) {
            setSelected(new Set(serverData));
            setSaved(true);
            return;
        }

        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const data = JSON.parse(raw);
                if (Array.isArray(data.regions)) {
                    setSelected(new Set(data.regions));
                    setSaved(true);
                }
            }
        } catch { /* ignore */ }
    }, [serverLoading, storageKey, componentKey, getComponentData]);

    const toggleRegion = useCallback((regionId: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(regionId)) {
                next.delete(regionId);
                setActiveRegion(null);
            } else {
                next.add(regionId);
                setActiveRegion(regionId);
            }
            const regionsArray = Array.from(next);
            // Save to server
            saveComponentData('bodyMaps', componentKey, regionsArray);
            // Fallback: also save to localStorage
            try {
                localStorage.setItem(storageKey, JSON.stringify({
                    regions: regionsArray,
                    savedAt: new Date().toISOString(),
                }));
            } catch { /* storage full */ }
            setSaved(true);
            return next;
        });
    }, [storageKey, componentKey, saveComponentData]);

    const activeData = useMemo(() => {
        if (!activeRegion) return null;
        return REGIONS.find(r => r.id === activeRegion) ?? null;
    }, [activeRegion]);

    /** Render a clickable dot + invisible hit circle for a region at (cx, cy) */
    const renderDot = (region: BodyRegion, cx: number, cy: number, keySuffix = '') => {
        const isSelected = selected.has(region.id);
        const isActive = activeRegion === region.id;

        return (
            <g key={region.id + keySuffix}>
                {/* Invisible hit area (larger touch target) */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={20}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => toggleRegion(region.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${region.label} — ${isSelected ? 'selected' : 'tap to select'}`}
                    aria-pressed={isSelected}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleRegion(region.id);
                        }
                    }}
                />

                {/* Selected highlight glow */}
                {isSelected && (
                    <motion.circle
                        cx={cx}
                        cy={cy}
                        r={14}
                        fill="rgba(99, 102, 241, 0.12)"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="pointer-events-none"
                    />
                )}

                {/* Visible dot */}
                <motion.circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 6}
                    fill={isSelected ? 'rgb(99, 102, 241)' : 'rgb(199, 210, 254)'}
                    stroke="white"
                    strokeWidth={2}
                    className="pointer-events-none"
                    animate={isActive ? {
                        scale: [1, 1.3, 1],
                        transition: { repeat: Infinity, duration: 1.5 },
                    } : { scale: 1 }}
                />
            </g>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="not-prose my-8"
        >
            <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 overflow-hidden">
                {/* Header */}
                <div className="p-4 pb-3 sm:p-5 sm:pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
                            </svg>
                            Body Awareness
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-indigo-400 dark:text-indigo-500">
                                {selected.size} of {REGIONS.length} areas explored
                            </span>
                            {saved && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Saved
                                </motion.span>
                            )}
                        </div>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base mb-1">{title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{prompt}</p>
                </div>

                {/* Body SVG */}
                <div className="px-4 pb-2 sm:px-5">
                    <div className="max-w-xs mx-auto">
                        <svg
                            viewBox="0 0 200 420"
                            className="w-full"
                            role="img"
                            aria-label={`Interactive body map. ${selected.size} of ${REGIONS.length} regions selected.`}
                        >
                            {/* Body silhouette — transformed from reference SVG coordinates */}
                            <g transform={BODY_TRANSFORM}>
                                <path
                                    d={BODY_PATH}
                                    fillRule="evenodd"
                                    fill="currentColor"
                                    className="text-indigo-300 dark:text-indigo-700"
                                    opacity={0.35}
                                />
                            </g>

                            {/* Clickable region dots */}
                            {REGIONS.map(region => (
                                <g key={`region-${region.id}`}>
                                    {/* Primary dot */}
                                    {renderDot(region, region.cx, region.cy)}

                                    {/* Second dot (for hands) */}
                                    {region.cx2 != null && region.cy2 != null && (
                                        renderDot(region, region.cx2, region.cy2, '-2')
                                    )}

                                    {/* Region label (shown when selected) */}
                                    {selected.has(region.id) && (
                                        <text
                                            x={region.cx}
                                            y={region.cy - 14}
                                            textAnchor="middle"
                                            className="fill-indigo-600 dark:fill-indigo-400 pointer-events-none"
                                            fontSize="8"
                                            fontWeight="bold"
                                        >
                                            {region.label}
                                        </text>
                                    )}
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Region description panel */}
                <AnimatePresence mode="wait">
                    {activeData && (
                        <motion.div
                            key={activeData.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="mx-4 mb-4 sm:mx-5 sm:mb-5 rounded-xl bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 p-4">
                                <div className="flex items-start gap-3">
                                    <motion.div
                                        className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                    >
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                    </motion.div>
                                    <div>
                                        <p className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-1">{activeData.label}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{activeData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty state hint */}
                {selected.size === 0 && (
                    <div className="px-5 pb-4">
                        <p className="text-xs text-center text-indigo-400 dark:text-indigo-500 italic">
                            Tap on the dots to explore where anxiety shows up in your body
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
