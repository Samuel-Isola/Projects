/**
 * Contact Page JavaScript
 * D.i.G Homes - Premium Real Estate
 */

class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupConsultationForm();
        this.setupMap();
        this.setupFAQ();
        this.setupSocialLinks();
        this.setupAppointmentScheduler();
        this.setupFileUpload();
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const submitBtn = form.querySelector('.btn-submit');
        const submitText = form.querySelector('.submit-text');
        const submitLoader = form.querySelector('.submit-loader');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!this.validateContactForm(form)) {
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitText.textContent = 'Sending...';
            submitLoader.style.display = 'inline-block';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message
                this.showSuccessMessage('Message sent successfully! We will contact you within 24 hours.');

                // Reset form
                form.reset();
            } catch (error) {
                this.showErrorMessage('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitText.textContent = 'Send Message';
                submitLoader.style.display = 'none';
            }
        });

        // Real-time validation
        this.setupRealTimeValidation(form);
    }

    validateContactForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        // Reset errors
        form.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        requiredFields.forEach(field => {
            const errorElement = field.parentElement.querySelector('.form-error');

            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required', errorElement);
                isValid = false;
            } else if (field.type === 'email' && !this.validateEmail(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address', errorElement);
                isValid = false;
            } else if (field.type === 'tel' && !this.validatePhone(field.value)) {
                this.showFieldError(field, 'Please enter a valid phone number', errorElement);
                isValid = false;
            } else {
                this.clearFieldError(field, errorElement);
            }
        });

        return isValid;
    }

    setupRealTimeValidation(form) {
        const fields = form.querySelectorAll('.form-input, .form-select, .form-textarea');

        fields.forEach(field => {
            field.addEventListener('blur', () => {
                const errorElement = field.parentElement.querySelector('.form-error');

                if (!field.value.trim() && field.hasAttribute('required')) {
                    this.showFieldError(field, 'This field is required', errorElement);
                } else if (field.type === 'email' && field.value && !this.validateEmail(field.value)) {
                    this.showFieldError(field, 'Please enter a valid email address', errorElement);
                } else if (field.type === 'tel' && field.value && !this.validatePhone(field.value)) {
                    this.showFieldError(field, 'Please enter a valid phone number', errorElement);
                } else {
                    this.clearFieldError(field, errorElement);
                }
            });

            field.addEventListener('input', () => {
                const errorElement = field.parentElement.querySelector('.form-error');
                this.clearFieldError(field, errorElement);
            });
        });
    }

    showFieldError(field, message, errorElement) {
        field.style.borderColor = 'var(--color-error)';
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }

        // Add shake animation
        field.classList.add('error-shake');
        setTimeout(() => {
            field.classList.remove('error-shake');
        }, 500);
    }

    clearFieldError(field, errorElement) {
        field.style.borderColor = '';
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    setupConsultationForm() {
        const form = document.getElementById('consultationForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validate
            if (!data.date || !data.time || !data.consultationType || !data.budget) {
                this.showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Show loading
            const submitBtn = form.querySelector('.btn-submit-consultation');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Booking...</span>';
            submitBtn.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success modal
                this.showConsultationSuccess(data);
                
                // Reset form
                form.reset();
            } catch (error) {
                this.showNotification('Failed to book consultation. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Setup date picker restrictions
        this.setupDatePicker();
    }

    setupDatePicker() {
        const dateInput = document.querySelector('input[type="date"]');
        if (!dateInput) return;

        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;

        // Set max date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
    }

    showConsultationSuccess(data) {
        const modal = document.getElementById('consultationModal');
        if (!modal) return;

        // Update modal content
        document.getElementById('bookingDate').textContent = this.formatDate(data.date);
        document.getElementById('bookingTime').textContent = this.getTimeSlot(data.time);
        document.getElementById('bookingType').textContent = this.getConsultationType(data.consultationType);

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close button
        const closeBtn = modal.querySelector('.btn-close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Auto close after 10 seconds
        setTimeout(() => {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 10000);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getTimeSlot(timeValue) {
        const slots = {
            '9-11': '9:00 AM - 11:00 AM',
            '11-1': '11:00 AM - 1:00 PM',
            '1-3': '1:00 PM - 3:00 PM',
            '3-5': '3:00 PM - 5:00 PM'
        };
        return slots[timeValue] || timeValue;
    }

    getConsultationType(type) {
        const types = {
            'phone': 'Phone Call',
            'video': 'Video Call',
            'office': 'Office Visit'
        };
        return types[type] || type;
    }

    setupMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        // Add interactive features to the map
        const directionsBtn = mapContainer.querySelector('.btn-directions');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                // Open Google Maps directions
                window.open('https://www.google.com/maps/dir//Boyi+Guest+house+Malete+Kwara+State+Nigeria', '_blank');
            });
        }

        // Add map markers
        this.addMapMarkers();
    }

    addMapMarkers() {
        // This would typically be done with a proper map API
        // For now, we'll just log the positions
        const markers = [
            { lat: 8.70815481961063, lng: 4.468986038902739, title: 'Main Office' },
            { lat: 8.708, lng: 4.469, title: 'Golden Park Estates' },
            { lat: 8.707, lng: 4.470, title: 'Kwasu Prime Land' }
        ];

        console.log('Map markers:', markers);
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggleIcon = question.querySelector('i');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                        otherItem.querySelector('.faq-question i').className = 'fas fa-chevron-down';
                    }
                });
                
                // Toggle current item
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggleIcon.className = 'fas fa-chevron-down';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggleIcon.className = 'fas fa-chevron-up';
                }
            });
        });
    }

    setupSocialLinks() {
        // Add click tracking for social links
        const socialLinks = document.querySelectorAll('.social-link, .contact-method');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.classList.contains('whatsapp') ? 'WhatsApp' :
                                link.classList.contains('instagram') ? 'Instagram' :
                                link.classList.contains('facebook') ? 'Facebook' : 'Social';
                
                console.log(`${platform} link clicked`);
                
                // You could add analytics tracking here
                // Example: trackSocialClick(platform);
            });
        });
    }

    setupAppointmentScheduler() {
        // This would integrate with a calendar API in a real application
        // For now, we'll just log the intent
        const appointmentButtons = document.querySelectorAll('[href*="calendar"], [href*="schedule"]');
        
        appointmentButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!button.href.includes('calendar') && !button.href.includes('schedule')) {
                    e.preventDefault();
                    this.showNotification('Appointment scheduling coming soon!', 'info');
                }
            });
        });
    }

    setupFileUpload() {
        // If there's a file upload field in the future
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    if (file.size > 5 * 1024 * 1024) { // 5MB limit
                        this.showNotification('File size must be less than 5MB', 'error');
                        e.target.value = '';
                    } else if (!file.type.match('image.*|application/pdf')) {
                        this.showNotification('Only images and PDF files are allowed', 'error');
                        e.target.value = '';
                    } else {
                        this.showNotification(`File "${file.name}" selected`, 'success');
                    }
                }
            });
        }
    }

    showSuccessMessage(message) {
        // Use the form authenticator modal
        const authenticator = document.getElementById('authenticatorModal');
        if (authenticator) {
            const content = authenticator.querySelector('.authenticator-content');
            const successIcon = content.querySelector('.authenticator-icon.success');
            const errorIcon = content.querySelector('.authenticator-icon.error');
            const title = content.querySelector('.authenticator-title');
            const messageElement = content.querySelector('.authenticator-message');
            
            successIcon.style.display = 'block';
            errorIcon.style.display = 'none';
            title.textContent = 'Success!';
            messageElement.textContent = message;
            
            authenticator.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Auto close after 5 seconds
            setTimeout(() => {
                if (authenticator.classList.contains('active')) {
                    authenticator.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }, 5000);
        } else {
            this.showNotification(message, 'success');
        }
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Utility function to format phone number
    formatPhoneNumber(phone) {
        // Format Nigerian phone numbers
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `+234 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
            return `+234 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
        }
        return phone;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .consultation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9998;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-slow);
        }
        
        .consultation-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .consultation-modal .modal-content {
            background: var(--color-tertiary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            padding: 3rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            transform: translateY(30px);
            transition: transform var(--transition-slow);
        }
        
        .consultation-modal.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-icon {
            font-size: 4rem;
            color: var(--color-success);
            margin-bottom: 1.5rem;
        }
        
        .modal-title {
            font-family: var(--font-secondary);
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: 1rem;
        }
        
        .modal-message {
            color: var(--color-text-secondary);
            line-height: 1.8;
            margin-bottom: 2rem;
        }
        
        .modal-details {
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1.5rem;
            margin-bottom: 2rem;
            text-align: left;
        }
        
        .detail-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
        }
        
        .detail-item:last-child {
            margin-bottom: 0;
        }
        
        .detail-label {
            color: var(--color-text-tertiary);
            font-weight: 500;
        }
        
        .detail-value {
            color: var(--color-text-primary);
            font-weight: 600;
        }
        
        .btn-close-modal {
            padding: 1rem 3rem;
            background: var(--color-gold);
            border: none;
            border-radius: var(--radius-md);
            color: var(--color-primary);
            font-family: var(--font-primary);
            font-size: 0.95rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            cursor: pointer;
            transition: all var(--transition-normal);
        }
        
        .btn-close-modal:hover {
            background: var(--color-gold-light);
            transform: translateY(-2px);
        }
        
        .consultation-types {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 0.5rem;
        }
        
        .type-option input[type="radio"] {
            display: none;
        }
        
        .type-option .option-content {
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all var(--transition-normal);
        }
        
        .type-option input[type="radio"]:checked + .option-content {
            background: var(--color-tertiary);
            border-color: var(--color-gold);
            color: var(--color-gold);
        }
        
        .type-option .option-content:hover {
            border-color: var(--color-border-light);
        }
        
        .type-option .option-content i {
            display: block;
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        
        .map-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent 70%, var(--color-tertiary));
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 1rem;
            pointer-events: none;
        }
        
        .btn-directions {
            pointer-events: auto;
            padding: 0.75rem 1.5rem;
            background: var(--color-gold);
            border: none;
            border-radius: var(--radius-md);
            color: var(--color-primary);
            font-family: var(--font-primary);
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all var(--transition-normal);
        }
        
        .btn-directions:hover {
            background: var(--color-gold-light);
            transform: translateY(-2px);
        }
        
        .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            text-decoration: none;
            color: var(--color-text-primary);
            transition: all var(--transition-normal);
        }
        
        .contact-method:hover {
            border-color: var(--color-gold);
            transform: translateX(5px);
        }
        
        .contact-method i {
            font-size: 1.5rem;
            width: 30px;
        }
        
        .contact-method.whatsapp i { color: #25D366; }
        .contact-method.instagram i { color: #E4405F; }
        .contact-method.facebook i { color: #1877F2; }
        
        .method-name {
            display: block;
            font-size: 0.9rem;
            color: var(--color-text-tertiary);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .method-value {
            display: block;
            font-weight: 600;
        }
        
        .office-hours .hours-list {
            margin-top: 1rem;
        }
        
        .hour-item {
            display: flex;
            justify-content: space-between;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--color-border);
        }
        
        .hour-item:last-child {
            border-bottom: none;
        }
        
        .hour-item .day {
            color: var(--color-text-secondary);
        }
        
        .hour-item .time {
            color: var(--color-text-primary);
            font-weight: 600;
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
});