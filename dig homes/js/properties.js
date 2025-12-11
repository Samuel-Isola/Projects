/**
 * Properties Page JavaScript
 * D.i.G Homes - Premium Real Estate
 */

class PropertiesPage {
    constructor() {
        this.properties = [
            {
                id: 1,
                title: 'Golden Park Estates',
                category: 'serviced',
                location: 'Malete, KWASU',
                price: 3500000,
                image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Premium serviced plots with registered survey titles in the rapidly developing Malete area.',
                features: ['Registered Survey', 'Access Roads', 'Water Provision', 'Legal Documentation'],
                plotSizes: ['300 SQM', '450 SQM', '600 SQM', '900 SQM']
            },
            {
                id: 2,
                title: 'Kwasu Prime Land',
                category: 'virgin',
                location: 'Kwasu, Malete',
                price: 500000,
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Prime virgin land with exceptional investment potential and natural surroundings.',
                features: ['Large Plots', 'Natural Surroundings', 'High Growth', 'Community Integration'],
                plotSizes: ['600 SQM', '900 SQM', '1200 SQM']
            },
            {
                id: 3,
                title: 'Emerald Heights',
                category: 'premium',
                location: 'Premium Location',
                price: 8500000,
                image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Ultra-premium serviced plots with modern amenities and exclusive community features.',
                features: ['Resort Amenities', '24/7 Security', 'Modern Infrastructure', 'Exclusive Community'],
                plotSizes: ['500 SQM', '750 SQM', '1000 SQM']
            },
            {
                id: 4,
                title: 'Heritage Villas',
                category: 'serviced',
                location: 'Ilorin City',
                price: 4500000,
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Luxury serviced plots in the heart of Ilorin with premium amenities.',
                features: ['City Center', 'Premium Amenities', 'Modern Design', 'Secure Environment'],
                plotSizes: ['400 SQM', '600 SQM', '800 SQM']
            },
            {
                id: 5,
                title: 'Green Valley Lands',
                category: 'virgin',
                location: 'Outskirts Malete',
                price: 350000,
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Affordable virgin land with beautiful natural surroundings and development potential.',
                features: ['Scenic Views', 'Natural Environment', 'Affordable', 'Development Ready'],
                plotSizes: ['800 SQM', '1000 SQM', '1500 SQM']
            },
            {
                id: 6,
                title: 'Royal Estates (Coming Soon)',
                category: 'upcoming',
                location: 'Abuja Road',
                price: 12000000,
                image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                description: 'Ultra-luxury estates with world-class amenities and architectural excellence.',
                features: ['World-class Design', 'Premium Location', 'Exclusive Community', 'Future Development'],
                plotSizes: ['Coming Soon']
            }
        ];

        this.init();
    }

    init() {
        this.setupFilters();
        this.renderProperties();
        this.setupGallery();
        this.setupInvestmentCalculator();
        this.setupPropertyComparison();
        this.setupFAQ();
        this.setupBrochureDownload();
    }

    setupFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const searchInput = document.querySelector('.search-box input');
        const priceSlider = document.querySelector('.range-slider');
        const locationSelect = document.querySelector('.location-select');
        const applyFiltersBtn = document.querySelector('.btn-filter-apply');
        const clearFiltersBtn = document.querySelector('.btn-clear-filters');

        let activeFilter = 'all';
        let searchQuery = '';
        let minPrice = 500000;
        let maxPrice = 50000000;
        let selectedLocation = 'all';

        // Filter tabs
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeFilter = tab.dataset.filter;
                this.filterProperties();
            });
        });

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase();
                this.filterProperties();
            });
        }

        // Price range
        if (priceSlider) {
            // This would be a more complex implementation with dual range sliders
            // For simplicity, using a single range for demo
            priceSlider.addEventListener('input', (e) => {
                maxPrice = parseInt(e.target.value);
                document.getElementById('maxPrice').textContent = this.formatPrice(maxPrice);
                this.filterProperties();
            });
        }

        // Location select
        if (locationSelect) {
            locationSelect.addEventListener('change', (e) => {
                selectedLocation = e.target.value;
                this.filterProperties();
            });
        }

        // Apply filters button
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                this.filterProperties();
                this.showNotification('Filters applied successfully');
            });
        }

        // Clear filters button
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                activeFilter = 'all';
                searchQuery = '';
                minPrice = 500000;
                maxPrice = 50000000;
                selectedLocation = 'all';

                // Reset UI
                filterTabs.forEach(tab => {
                    if (tab.dataset.filter === 'all') {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });

                if (searchInput) searchInput.value = '';
                if (priceSlider) priceSlider.value = maxPrice;
                if (locationSelect) locationSelect.value = 'all';

                this.filterProperties();
                this.showNotification('Filters cleared');
            });
        }
    }

    filterProperties() {
        const filtered = this.properties.filter(property => {
            // Category filter
            if (activeFilter !== 'all' && property.category !== activeFilter) {
                return false;
            }

            // Search filter
            if (searchQuery && !property.title.toLowerCase().includes(searchQuery) &&
                !property.description.toLowerCase().includes(searchQuery) &&
                !property.location.toLowerCase().includes(searchQuery)) {
                return false;
            }

            // Price filter
            if (property.price < minPrice || property.price > maxPrice) {
                return false;
            }

            // Location filter
            if (selectedLocation !== 'all' && property.location.toLowerCase() !== selectedLocation) {
                return false;
            }

            return true;
        });

        this.renderProperties(filtered);
    }

    renderProperties(properties = this.properties) {
        const grid = document.getElementById('propertiesGrid');
        if (!grid) return;

        const loading = document.querySelector('.properties-loading');
        const empty = document.querySelector('.properties-empty');

        // Show loading
        if (loading) loading.style.display = 'flex';
        if (empty) empty.style.display = 'none';

        setTimeout(() => {
            if (loading) loading.style.display = 'none';

            if (properties.length === 0) {
                if (empty) empty.style.display = 'block';
                grid.innerHTML = '';
                return;
            }

            grid.innerHTML = properties.map(property => `
                <div class="property-card" data-id="${property.id}">
                    <div class="property-media">
                        <div class="property-image" style="background-image: url('${property.image}')">
                            <div class="property-overlay">
                                <div class="property-badge">${property.category === 'upcoming' ? 'Coming Soon' : property.category === 'premium' ? 'Premium' : property.category === 'serviced' ? 'Serviced' : 'Virgin Land'}</div>
                                <div class="property-actions">
                                    <button class="action-btn btn-view-details" data-id="${property.id}">
                                        <i class="fas fa-expand"></i>
                                    </button>
                                    <button class="action-btn btn-favorite" data-id="${property.id}">
                                        <i class="fas fa-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="property-gallery">
                            <div class="gallery-item active"></div>
                            <div class="gallery-item"></div>
                            <div class="gallery-item"></div>
                        </div>
                    </div>
                    <div class="property-details">
                        <div class="property-header">
                            <h3 class="property-title">${property.title}</h3>
                            <div class="property-price">
                                <span class="price-value">${this.formatPrice(property.price)}</span>
                                <span class="price-label">Starting Price</span>
                            </div>
                        </div>
                        <p class="property-description">${property.description}</p>
                        <div class="property-features">
                            <div class="feature">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${property.location}</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-expand-arrows-alt"></i>
                                <span>${property.plotSizes[0]}${property.plotSizes.length > 1 ? '+' : ''}</span>
                            </div>
                            <div class="feature">
                                <i class="fas fa-chart-line"></i>
                                <span>High ROI</span>
                            </div>
                        </div>
                        <div class="property-footer">
                            <button class="btn-view btn-view-details" data-id="${property.id}">View Details</button>
                            <a href="contact-dark.html" class="btn-inquire">Inquire Now</a>
                        </div>
                    </div>
                </div>
            `).join('');

            // Add event listeners to view details buttons
            document.querySelectorAll('.btn-view-details').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const propertyId = parseInt(e.currentTarget.dataset.id);
                    const property = this.properties.find(p => p.id === propertyId);
                    if (property) {
                        this.showPropertyDetails(property);
                    }
                });
            });

            // Add event listeners to favorite buttons
            document.querySelectorAll('.btn-favorite').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const propertyId = parseInt(e.currentTarget.dataset.id);
                    this.toggleFavorite(propertyId);
                });
            });
        }, 500);
    }

    showPropertyDetails(property) {
        const modal = document.getElementById('propertyModal');
        if (!modal) return;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="property-details-modal">
                <div class="modal-gallery">
                    <div class="modal-main-image" style="background-image: url('${property.image}')"></div>
                    <div class="modal-thumbnails">
                        <div class="thumbnail active"></div>
                        <div class="thumbnail"></div>
                        <div class="thumbnail"></div>
                        <div class="thumbnail"></div>
                    </div>
                </div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${property.title}</h3>
                        <div class="modal-price">${this.formatPrice(property.price)}</div>
                    </div>
                    <div class="modal-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <div class="modal-description">
                        <p>${property.description}</p>
                    </div>
                    <div class="modal-features">
                        <h4>Property Features</h4>
                        <ul>
                            ${property.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-plot-sizes">
                        <h4>Available Plot Sizes</h4>
                        <div class="plot-sizes">
                            ${property.plotSizes.map(size => `<span class="plot-size">${size}</span>`).join('')}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <a href="contact-dark.html" class="btn-primary">
                            <i class="fas fa-calendar-alt"></i>
                            Schedule Site Visit
                        </a>
                        <button class="btn-secondary btn-download-modal">
                            <i class="fas fa-download"></i>
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Close modal
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Download brochure button
        const downloadBtn = modal.querySelector('.btn-download-modal');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadBrochure(property);
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
    }

    toggleFavorite(propertyId) {
        // Get favorites from localStorage
        let favorites = JSON.parse(localStorage.getItem('propertyFavorites') || '[]');
        
        if (favorites.includes(propertyId)) {
            // Remove from favorites
            favorites = favorites.filter(id => id !== propertyId);
            this.showNotification('Removed from favorites');
        } else {
            // Add to favorites
            favorites.push(propertyId);
            this.showNotification('Added to favorites');
        }
        
        // Save to localStorage
        localStorage.setItem('propertyFavorites', JSON.stringify(favorites));
        
        // Update UI
        const favoriteBtn = document.querySelector(`.btn-favorite[data-id="${propertyId}"]`);
        if (favoriteBtn) {
            const icon = favoriteBtn.querySelector('i');
            if (favorites.includes(propertyId)) {
                icon.className = 'fas fa-heart';
                icon.style.color = 'var(--color-error)';
            } else {
                icon.className = 'fas fa-heart';
                icon.style.color = '';
            }
        }
    }

    setupGallery() {
        const galleries = document.querySelectorAll('.property-gallery');
        
        galleries.forEach(gallery => {
            const items = gallery.querySelectorAll('.gallery-item');
            let currentIndex = 0;
            
            // Auto cycle
            setInterval(() => {
                items[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].classList.add('active');
            }, 3000);
            
            // Click to select
            items.forEach((item, index) => {
                item.addEventListener('click', () => {
                    items[currentIndex].classList.remove('active');
                    currentIndex = index;
                    items[currentIndex].classList.add('active');
                });
            });
        });
    }

    setupInvestmentCalculator() {
        const calculator = document.querySelector('.property-calculator');
        if (!calculator) return;

        const periodSlider = document.getElementById('calcPeriod');
        const periodValue = document.getElementById('periodValue');
        const calculateBtn = calculator.querySelector('.btn-calculate');
        const initialInvestment = document.getElementById('initialInvestment');
        const estimatedValue = document.getElementById('estimatedValue');
        const potentialProfit = document.getElementById('potentialProfit');
        const annualROI = document.getElementById('annualROI');
        const investmentChart = document.getElementById('investmentChart');

        // Update period value
        if (periodSlider && periodValue) {
            periodSlider.addEventListener('input', (e) => {
                periodValue.textContent = `${e.target.value} Years`;
            });
        }

        // Calculate button
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateInvestment();
            });
        }

        // Initialize chart
        if (investmentChart) {
            this.initializeInvestmentChart(investmentChart);
        }
    }

    calculateInvestment() {
        // Get values from form
        const plotSize = document.querySelector('select').value;
        const period = document.getElementById('calcPeriod').value;
        
        // Base calculations
        const basePrice = 3500000; // Golden Park base price
        const annualGrowthRate = 0.18; // 18% annual growth
        const years = parseInt(period);
        
        // Calculate returns
        const futureValue = basePrice * Math.pow(1 + annualGrowthRate, years);
        const profit = futureValue - basePrice;
        const annualROIValue = annualGrowthRate * 100;
        
        // Update UI
        document.getElementById('estimatedValue').textContent = this.formatPrice(futureValue);
        document.getElementById('potentialProfit').textContent = this.formatPrice(profit);
        document.getElementById('annualROI').textContent = `${annualROIValue.toFixed(1)}%`;
        document.getElementById('growthRate').textContent = `${annualROIValue.toFixed(1)}%`;
        
        // Update chart
        this.updateInvestmentChart(years, futureValue);
        
        // Show results section
        document.querySelector('.calculator-results').style.display = 'grid';
    }

    initializeInvestmentChart(canvas) {
        const ctx = canvas.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)');
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0.05)');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
                datasets: [{
                    label: 'Investment Growth',
                    data: [3500000, 4130000, 4873400, 5750612, 6785722],
                    borderColor: 'var(--color-gold)',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Value: ${this.formatPrice(context.raw)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: (value) => {
                                if (value >= 1000000) {
                                    return `₦${(value / 1000000).toFixed(1)}M`;
                                }
                                return `₦${value}`;
                            }
                        }
                    }
                }
            }
        });
    }

    updateInvestmentChart(years, finalValue) {
        if (!this.chart) return;
        
        // Generate data points
        const dataPoints = [];
        const baseValue = 3500000;
        const growthRate = 0.18;
        
        for (let i = 0; i <= years; i++) {
            dataPoints.push(baseValue * Math.pow(1 + growthRate, i));
        }
        
        // Update labels
        const labels = [];
        for (let i = 0; i <= years; i++) {
            labels.push(`Year ${i}`);
        }
        
        // Update chart
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = dataPoints;
        this.chart.update();
    }

    setupPropertyComparison() {
        const compareTable = document.querySelector('.compare-table');
        if (!compareTable) return;

        // Add hover effects to table rows
        const rows = compareTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                rows.forEach(r => r.classList.remove('highlight'));
                row.classList.add('highlight');
            });
            
            row.addEventListener('mouseleave', () => {
                row.classList.remove('highlight');
            });
        });
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

    setupBrochureDownload() {
        const downloadBtns = document.querySelectorAll('.btn-download-brochure');
        
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadBrochure();
            });
        });
    }

    downloadBrochure(property = null) {
        // Create a mock PDF download
        const fileName = property ? 
            `${property.title.replace(/\s+/g, '_')}_Brochure.pdf` : 
            'DIG_Homes_Property_Brochure.pdf';
        
        // Simulate download
        this.showNotification(`Downloading ${fileName}...`, 'info');
        
        // In a real application, this would link to an actual PDF file
        setTimeout(() => {
            this.showNotification('Brochure downloaded successfully!', 'success');
        }, 1500);
    }

    formatPrice(price) {
        if (price >= 1000000) {
            return `₦${(price / 1000000).toFixed(1)}M`;
        } else if (price >= 1000) {
            return `₦${(price / 1000).toFixed(1)}K`;
        }
        return `₦${price}`;
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PropertiesPage();
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .properties-loading {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem;
            color: var(--color-text-tertiary);
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid var(--color-border);
            border-top-color: var(--color-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        .properties-empty {
            display: none;
            text-align: center;
            padding: 4rem;
        }
        
        .empty-icon {
            font-size: 3rem;
            color: var(--color-text-tertiary);
            margin-bottom: 1rem;
        }
        
        .btn-clear-filters {
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: transparent;
            border: 1px solid var(--color-border);
            color: var(--color-text-primary);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all var(--transition-normal);
        }
        
        .btn-clear-filters:hover {
            border-color: var(--color-gold);
            color: var(--color-gold);
        }
        
        .property-modal {
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
        
        .property-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .property-modal .modal-content {
            background: var(--color-tertiary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            max-width: 900px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: translateY(30px);
            transition: transform var(--transition-slow);
        }
        
        .property-modal.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            border-radius: 50%;
            color: var(--color-text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1;
            transition: all var(--transition-normal);
        }
        
        .modal-close:hover {
            background: var(--color-gold);
            border-color: var(--color-gold);
            color: var(--color-primary);
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .property-details-modal {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .property-details-modal {
                grid-template-columns: 1fr;
            }
        }
        
        .compare-table table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .compare-table th,
        .compare-table td {
            padding: 1rem;
            border: 1px solid var(--color-border);
            text-align: center;
        }
        
        .compare-table th {
            background: var(--color-tertiary);
            font-weight: 600;
        }
        
        .compare-table tr.highlight {
            background: rgba(212, 175, 55, 0.1);
        }
        
        .compare-table .success {
            color: var(--color-success);
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
    `;
    
    document.head.appendChild(style);
});