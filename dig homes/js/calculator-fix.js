/**
 * Investment Calculator Fix
 * D.i.G Homes - Premium Real Estate
 */

class InvestmentCalculator {
    constructor() {
        this.propertyRates = {
            'golden-park': 0.15,  // 15% annual appreciation
            'virgin-land': 0.20,   // 20% annual appreciation
            'premium': 0.25        // 25% annual appreciation
        };
        
        this.init();
    }
    
    init() {
        this.setupCalculator();
        this.setupRangeInputs();
        this.calculateReturns();
    }
    
    setupCalculator() {
        const calculateBtn = document.querySelector('.btn-calculate');
        if (!calculateBtn) return;
        
        calculateBtn.addEventListener('click', () => this.calculateReturns());
        
        // Calculate on input changes
        document.getElementById('calcProperty')?.addEventListener('change', () => this.calculateReturns());
        document.getElementById('calcAmount')?.addEventListener('input', () => {
            this.updateAmountValue();
            this.calculateReturns();
        });
        document.getElementById('calcYears')?.addEventListener('input', () => {
            this.updateYearsValue();
            this.calculateReturns();
        });
    }
    
    setupRangeInputs() {
        const amountInput = document.getElementById('calcAmount');
        const yearsInput = document.getElementById('calcYears');
        
        if (amountInput) {
            amountInput.addEventListener('input', () => this.updateAmountValue());
            this.updateAmountValue();
        }
        
        if (yearsInput) {
            yearsInput.addEventListener('input', () => this.updateYearsValue());
            this.updateYearsValue();
        }
    }
    
    updateAmountValue() {
        const amountInput = document.getElementById('calcAmount');
        const amountValue = document.getElementById('amountValue');
        
        if (amountInput && amountValue) {
            const value = parseInt(amountInput.value);
            amountValue.textContent = this.formatCurrency(value);
        }
    }
    
    updateYearsValue() {
        const yearsInput = document.getElementById('calcYears');
        const yearsValue = document.getElementById('yearsValue');
        
        if (yearsInput && yearsValue) {
            const value = parseInt(yearsInput.value);
            yearsValue.textContent = `${value} Year${value !== 1 ? 's' : ''}`;
        }
    }
    
    calculateReturns() {
        const propertySelect = document.getElementById('calcProperty');
        const amountInput = document.getElementById('calcAmount');
        const yearsInput = document.getElementById('calcYears');
        
        if (!propertySelect || !amountInput || !yearsInput) return;
        
        const propertyType = propertySelect.value;
        const amount = parseFloat(amountInput.value);
        const years = parseFloat(yearsInput.value);
        const annualRate = this.propertyRates[propertyType] || 0.15;
        
        // Calculate future value
        const futureValue = amount * Math.pow(1 + annualRate, years);
        
        // Calculate profit
        const potentialProfit = futureValue - amount;
        
        // Calculate annual ROI
        const annualROI = (futureValue / amount - 1) / years * 100;
        
        // Calculate growth rate
        const growthRate = annualRate * 100;
        
        // Update display
        this.updateResult('futureValue', futureValue, true);
        this.updateResult('potentialProfit', potentialProfit, true);
        this.updateResult('annualROI', annualROI, false, true);
        this.updateResult('growthRate', growthRate, false, true);
    }
    
    updateResult(elementId, value, isCurrency = false, isPercentage = false) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let formattedValue;
        
        if (isCurrency) {
            formattedValue = this.formatCurrency(value);
        } else if (isPercentage) {
            formattedValue = `${value.toFixed(1)}%`;
        } else {
            formattedValue = value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        element.textContent = isCurrency ? `₦${formattedValue}` : formattedValue;
        
        // Add animation
        element.classList.add('result-updated');
        setTimeout(() => {
            element.classList.remove('result-updated');
        }, 500);
    }
    
    formatCurrency(amount) {
        if (amount >= 1000000) {
            return `₦${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `₦${(amount / 1000).toFixed(1)}K`;
        }
        return amount.toLocaleString('en-US');
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    new InvestmentCalculator();
    
    // Add CSS for calculator animations
    const style = document.createElement('style');
    style.textContent = `
        .result-updated {
            animation: resultPulse 0.5s ease;
        }
        
        @keyframes resultPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .range-value {
            margin-top: 0.5rem;
            font-weight: 600;
            color: var(--color-gold);
        }
        
        input[type="range"] {
            width: 100%;
            height: 6px;
            background: var(--color-border);
            border-radius: 3px;
            outline: none;
            -webkit-appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            background: var(--color-gold);
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--color-primary);
        }
        
        input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: var(--color-gold);
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid var(--color-primary);
        }
    `;
    document.head.appendChild(style);
});