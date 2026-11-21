import { useEffect, useCallback, useRef, useState } from 'react';
import {
    FaXmark,
    FaStar,
    FaFont,
    FaCalendarDays,
    FaClockRotateLeft,
    FaCircleInfo
} from 'react-icons/fa6';
import styles from './SortInfoModal.module.css';

const SORT_EXPLANATIONS = [
    {
        field: 'featured',
        label: 'Featured (Default)',
        icon: FaStar,
        desc: 'My personal top picks, the projects that took the most effort and best show what I can build.'
    },
    {
        field: 'title',
        label: 'Alphabetical Title',
        icon: FaFont,
        desc: 'Organizes projects alphabetically by name from A to Z (or Z to A).'
    },
    {
        field: 'date',
        label: 'Chronological Release Date',
        icon: FaCalendarDays,
        desc: 'Shows projects by when they were completed, starting with the newest first.'
    },
    {
        field: 'updated',
        label: 'GitHub Last Updated (Live API)',
        icon: FaClockRotateLeft,
        desc: 'Checks GitHub in real time to show projects with the most recent commits or pushes first.'
    }
];

export default function SortInfoModal({ isOpen, onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const closingRef = useRef(false);

    const handleClose = useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
            closingRef.current = false;
        }, 200);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
        <div
            className={`${styles.infoModalBackdrop} ${isClosing ? styles.isClosing : ''}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sortGuideTitle"
        >
            <div
                className={`${styles.infoModalCard} ${isClosing ? styles.isClosing : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className={styles.infoModalHeader}>
                    <div className={styles.headerTitleWrap}>
                        <FaCircleInfo className={styles.infoIcon} aria-hidden="true" />
                        <h3 id="sortGuideTitle" className={styles.infoModalTitle}>
                            Project Sorting Guide
                        </h3>
                    </div>
                    <button
                        type="button"
                        className={styles.infoModalClose}
                        onClick={handleClose}
                        aria-label="Close sort guide"
                    >
                        <FaXmark aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className={styles.infoModalBody}>
                    <p className={styles.infoModalIntro}>
                        Here is a quick look at how you can sort the projects. Click any button again to reverse the order.
                    </p>

                    <div className={styles.sortGuideList}>
                        {SORT_EXPLANATIONS.map(({ field, label, icon: IconComponent, desc }) => (
                            <div key={field} className={styles.sortGuideItem}>
                                <div className={styles.itemHeader}>
                                    <span className={styles.itemIconWrap}>
                                        <IconComponent aria-hidden="true" />
                                    </span>
                                    <strong className={styles.itemLabel}>{label}</strong>
                                </div>
                                <p className={styles.itemDesc}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.infoModalFooter}>
                    <button
                        type="button"
                        className={styles.btnGotIt}
                        onClick={handleClose}
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
}