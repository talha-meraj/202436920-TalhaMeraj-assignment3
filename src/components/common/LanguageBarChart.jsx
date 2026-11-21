import { FaCircle } from 'react-icons/fa6';
import styles from './LanguageBarChart.module.css';

/**
 * Renders a GitHub-style horizontal language breakdown bar with a color-coded legend.
 * Props:
 * - languages: Array of { name: string, percentage: number, color: string }
 * - isLoading: boolean
 */
export default function LanguageBarChart({ languages = [], isLoading = false }) {
    if (isLoading) {
        return (
            <div className={styles.loadingWrapper} aria-busy="true">
                <div className={styles.skeletonBar}></div>
                <div className={styles.skeletonLegend}>
                    <span className={styles.skeletonPill}></span>
                    <span className={styles.skeletonPill}></span>
                </div>
            </div>
        );
    }

    if (!languages || languages.length === 0) {
        return (
            <p className={styles.emptyNote}>
                Language breakdown not reported by repository.
            </p>
        );
    }

    return (
        <div className={styles.chartWrapper} role="region" aria-label="Repository language distribution">
            {/* Segmented Horizontal Bar */}
            <div className={styles.barTrack} title={languages.map(l => `${l.name}: ${l.percentage}%`).join(', ')}>
                {languages.map((item, idx) => (
                    <div
                        key={idx}
                        className={styles.barSegment}
                        style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color
                        }}
                        title={`${item.name}: ${item.percentage}%`}
                        aria-label={`${item.name} makes up ${item.percentage}% of the codebase`}
                    />
                ))}
            </div>

            {/* Language Legend Row */}
            <div className={styles.legendRow}>
                {languages.map((item, idx) => (
                    <div key={idx} className={styles.legendItem}>
                        <FaCircle
                            className={styles.legendDot}
                            style={{ color: item.color }}
                            aria-hidden="true"
                        />
                        <span className={styles.legendName}>{item.name}</span>
                        <span className={styles.legendPercent}>{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}