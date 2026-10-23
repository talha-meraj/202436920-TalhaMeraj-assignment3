import { useState } from 'react';
import {
    FaEnvelope,
    FaLinkedinIn,
    FaMapPin,
    FaCircleExclamation,
    FaSpinner,
    FaPaperPlane,
    FaCircleCheck,
    FaTriangleExclamation
} from 'react-icons/fa6';
import styles from './Contact.module.css';

// Regex patterns to check email format and valid name characters
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s\-'.]+$/;

export default function Contact() {
    // Form inputs stored in a single state object
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Track error messages for each field
    const [errors, setErrors] = useState({});
    // Loading state while submitting
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Feedback banner shown below the form
    const [feedback, setFeedback] = useState(null);

    // Validation rules: returns an error message string or '' if valid
    const validateField = (field, value) => {
        const val = value.trim();
        if (field === 'name') {
            if (!val) return 'Name is required.';
            if (val.length < 2) return 'Name must be at least 2 characters.';
            if (!NAME_REGEX.test(val)) return 'Name should only contain letters and standard characters.';
            return '';
        }
        if (field === 'email') {
            if (!val) return 'Email address is required.';
            if (!EMAIL_REGEX.test(val)) return 'Please provide a valid email (e.g. user@example.com).';
            return '';
        }
        if (field === 'message') {
            if (!val) return 'Message cannot be empty.';
            if (val.length < 10) return 'Please write at least 10 characters so I have enough context.';
            if (val.length > 500) return 'Message cannot exceed 500 characters.';
            return '';
        }
        return '';
    };

    // Generic input handler for all form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error as soon as user fixes the field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
        // Clear any old feedback banner
        if (feedback) setFeedback(null);
    };

    // Validate a specific field when it loses focus
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const fieldError = validateField(name, value);
        if (fieldError) {
            setErrors((prev) => ({ ...prev, [name]: fieldError }));
        }
    };

    // Validate entire form and simulate asynchronous submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            message: validateField('message', formData.message),
        };

        const activeErrors = Object.fromEntries(
            Object.entries(newErrors).filter(([, err]) => Boolean(err))
        );

        if (Object.keys(activeErrors).length > 0) {
            setErrors(activeErrors);
            const firstErrField = Object.keys(activeErrors)[0];
            const el = document.getElementById(`contact${firstErrField.charAt(0).toUpperCase() + firstErrField.slice(1)}`);
            if (el) el.focus();
            return;
        }

        setIsSubmitting(true);
        setErrors({});
        setFeedback(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 950));

            // Success: reset form and display confirmation banner
            setFormData({ name: '', email: '', message: '' });
            setFeedback({
                type: 'success',
                text: 'Message received! Thank you for reaching out; I will respond promptly.',
            });
        } catch {
            setFeedback({
                type: 'error',
                text: 'Network error: could not transmit your message. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Message character counter thresholds (max 500 characters)
    const charCount = formData.message.length;
    const maxChars = 500;
    const isOverLimit = charCount > maxChars;
    const isNearLimit = charCount >= 450 && !isOverLimit;

    return (
        <section id="contact" className="portfolio-section">
            <div className="section-header">
                <h2 className="section-title">
                    <FaEnvelope aria-hidden="true" /> Contact Me
                </h2>
                <p className="section-subtitle">
                    Feel free to reach out for questions, collaboration, or academic discussions.
                </p>
            </div>

            <div className={styles.contactGrid}>
                {/* Left Column: Direct Contact Details List */}
                <div className={styles.contactDetails}>
                    <h3 className={styles.getInTouchTitle}>Get In Touch</h3>
                    <p className={styles.getInTouchText}>
                        I would love to hear from you. Leave a message through the form or reach out directly using the details below:
                    </p>

                    <address className={styles.contactAddressBlock}>
                        <div className={styles.contactItem}>
                            <FaEnvelope className={styles.itemIcon} aria-hidden="true" />
                            <div>
                                <strong className={styles.itemLabel}>Email:</strong>
                                <br />
                                <a href="mailto:m.talhameraj@gmail.com" className={styles.itemLink}>
                                    m.talhameraj@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaLinkedinIn className={styles.itemIcon} aria-hidden="true" />
                            <div>
                                <strong className={styles.itemLabel}>LinkedIn:</strong>
                                <br />
                                <a
                                    href="https://www.linkedin.com/in/talha-meraj"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.itemLink}
                                >
                                    linkedin.com/in/talha-meraj
                                </a>
                            </div>
                        </div>

                        <div className={styles.contactItem}>
                            <FaMapPin className={styles.itemIcon} aria-hidden="true" />
                            <div>
                                <strong className={styles.itemLabel}>Location:</strong>
                                <br />
                                <span className={styles.itemText}>KFUPM, Dhahran, Saudi Arabia</span>
                            </div>
                        </div>
                    </address>
                </div>

                {/* Right Column: Contact Form with Fieldset & Legend */}
                <div className={styles.contactFormWrap}>
                    <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
                        <fieldset className={styles.formFieldset}>
                            <legend className={styles.formLegend}>SEND A MESSAGE</legend>

                            {/* Name Input */}
                            <div className={styles.formGroup}>
                                <label htmlFor="contactName" className={styles.formLabel}>
                                    Full Name <span className={styles.requiredStar}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="name"
                                    className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                                    placeholder="e.g. John Bro"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                    aria-invalid={Boolean(errors.name)}
                                    aria-describedby={errors.name ? 'contactNameError' : undefined}
                                />
                                {errors.name && (
                                    <span id="contactNameError" className={styles.errorMessage} role="alert">
                                        <FaCircleExclamation aria-hidden="true" /> {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className={styles.formGroup}>
                                <label htmlFor="contactEmail" className={styles.formLabel}>
                                    Email Address <span className={styles.requiredStar}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contactEmail"
                                    name="email"
                                    className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                                    placeholder="e.g. user@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={errors.email ? 'contactEmailError' : undefined}
                                />
                                {errors.email && (
                                    <span id="contactEmailError" className={styles.errorMessage} role="alert">
                                        <FaCircleExclamation aria-hidden="true" /> {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Message Textarea */}
                            <div className={styles.formGroup}>
                                <div className={styles.labelRow}>
                                    <label htmlFor="contactMessage" className={styles.formLabel}>
                                        Message <span className={styles.requiredStar}>*</span>
                                    </label>
                                    <span
                                        className={`${styles.charCount} ${isNearLimit ? styles.charNear : ''} ${isOverLimit ? styles.charOver : ''}`}
                                        aria-live="polite"
                                    >
                                        {charCount}/{maxChars}
                                    </span>
                                </div>
                                <textarea
                                    id="contactMessage"
                                    name="message"
                                    rows={5}
                                    maxLength={maxChars}
                                    className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                    aria-invalid={Boolean(errors.message)}
                                    aria-describedby={errors.message ? 'contactMessageError' : undefined}
                                />
                                {errors.message && (
                                    <span id="contactMessageError" className={styles.errorMessage} role="alert">
                                        <FaCircleExclamation aria-hidden="true" /> {errors.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={styles.btnSubmit}
                                disabled={isSubmitting || isOverLimit}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className={styles.spinner} aria-hidden="true" />
                                        <span>SENDING...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane aria-hidden="true" />
                                        <span>SEND MESSAGE</span>
                                    </>
                                )}
                            </button>

                            {/* Success / Error Feedback Banner */}
                            {feedback && (
                                <div
                                    className={`${styles.formFeedback} ${styles[feedback.type]}`}
                                    role="status"
                                >
                                    {feedback.type === 'success' ? (
                                        <FaCircleCheck className={styles.feedbackIcon} aria-hidden="true" />
                                    ) : (
                                        <FaTriangleExclamation className={styles.feedbackIcon} aria-hidden="true" />
                                    )}
                                    <span>{feedback.text}</span>
                                </div>
                            )}
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
}
