/**
 * Form Authenticator JavaScript
 * D.i.G Homes - Premium Real Estate
 */

class FormAuthenticator {
    constructor() {
        this.modal = document.getElementById('authenticatorModal');
        this.forms = document.querySelectorAll('form[data-authenticate]');
        this.init();
    }

    init() {
        if (!this.modal) this.createModal();
        this.setupFormListeners();
        this.setupModalClose();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'authenticatorModal';
        modal.className = 'authenticator-modal';
        modal.innerHTML = `
            <div class="authenticator-content">
                <div class="authenticator-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="authenticator-icon error">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <h3 class="authenticator-title">Message Sent</h3>
                <p class="authenticator-message">
                    Thank you for your inquiry! Our team will contact you within 24 hours.
                </p>
                <button class="btn-close-authenticator">Continue</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modal = modal;
    }

    setupFormListeners() {
        this.forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!this.validateForm(form)) {
                    this.showError('Please fill in all required fields correctly.');
                    return;
                }
                
                await this.submitForm(form);
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Reset previous errors
        form.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        requiredFields.forEach(field => {
            const errorElement = field.parentElement.querySelector('.form-error') || 
                                this.createErrorElement(field);
            
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

    createErrorElement(field) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.display = 'none';
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentElement.appendChild(errorElement);
        return errorElement;
    }

    showFieldError(field, message, errorElement) {
        field.style.borderColor = 'var(--color-error)';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add shake animation
        field.classList.add('error-shake');
        setTimeout(() => {
            field.classList.remove('error-shake');
        }, 500);
    }

    clearFieldError(field, errorElement) {
        field.style.borderColor = '';
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        // Accept Nigerian phone numbers and international formats
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    async submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="submit-text">Processing...</span>
            <div class="submit-loader">
                <div class="loader-spinner"></div>
            </div>
        `;
        
        // Simulate API call with random success/failure
        const isSuccess = Math.random() > 0.1; // 90% success rate for demo
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (isSuccess) {
            this.showSuccess('Form submitted successfully! We will contact you shortly.');
            form.reset();
        } else {
            this.showError('Submission failed. Please try again or contact us directly.');
        }
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }

    showSuccess(message) {
        this.showModal('success', message);
        
        // Log to console (for debugging)
        console.log('Form submitted successfully:', {
            timestamp: new Date().toISOString(),
            message: message
        });
    }

    showError(message) {
        this.showModal('error', message);
        
        // Log to console (for debugging)
        console.error('Form submission failed:', {
            timestamp: new Date().toISOString(),
            message: message
        });
    }

    showModal(type, message) {
        if (!this.modal) return;
        
        // Update modal content
        const content = this.modal.querySelector('.authenticator-content');
        const successIcon = content.querySelector('.authenticator-icon.success');
        const errorIcon = content.querySelector('.authenticator-icon.error');
        const title = content.querySelector('.authenticator-title');
        const messageElement = content.querySelector('.authenticator-message');
        
        // Update based on type
        if (type === 'success') {
            successIcon.style.display = 'block';
            errorIcon.style.display = 'none';
            title.textContent = 'Success!';
        } else {
            successIcon.style.display = 'none';
            errorIcon.style.display = 'block';
            title.textContent = 'Error';
        }
        
        messageElement.textContent = message;
        
        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (this.modal.classList.contains('active')) {
                this.closeModal();
            }
        }, 5000);
    }

    setupModalClose() {
        // Close button
        const closeBtn = this.modal.querySelector('.btn-close-authenticator');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal content after animation
        setTimeout(() => {
            const content = this.modal.querySelector('.authenticator-content');
            const successIcon = content.querySelector('.authenticator-icon.success');
            const errorIcon = content.querySelector('.authenticator-icon.error');
            const title = content.querySelector('.authenticator-title');
            const messageElement = content.querySelector('.authenticator-message');
            
            successIcon.style.display = 'block';
            errorIcon.style.display = 'none';
            title.textContent = 'Message Sent';
            messageElement.textContent = 'Thank you for your inquiry! Our team will contact you within 24 hours.';
        }, 300);
    }

    // Utility function to show notification
    showNotification(message, type = 'info') {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormAuthenticator();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-tertiary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: 1rem 1.5rem;
            min-width: 300px;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid var(--color-success);
        }
        
        .notification-error {
            border-left: 4px solid var(--color-error);
        }
        
        .notification-info {
            border-left: 4px solid var(--color-info);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification-success .notification-content i {
            color: var(--color-success);
        }
        
        .notification-error .notification-content i {
            color: var(--color-error);
        }
        
        .notification-info .notification-content i {
            color: var(--color-info);
        }
        
        .error-shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .submit-loader {
            display: none;
        }
        
        button[disabled] .submit-loader {
            display: inline-block;
        }
        
        .loader-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: inline-block;
            vertical-align: middle;
            margin-left: 0.5rem;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormAuthenticator;
}