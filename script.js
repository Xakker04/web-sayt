// ==================== Smooth Scrolling ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Intersection Observer for Animations ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== Bar Chart Animation ==================== 
function animateBarChart() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.transition = 'height 0.8s ease';
            bar.style.height = height;
        }, index * 100);
    });
}

// Trigger bar chart animation when section is visible
const chartContainer = document.querySelector('.statistics');
if (chartContainer) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBarChart();
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    chartObserver.observe(chartContainer);
}

// ==================== Pie Chart Animation ==================== 
function animatePieChart() {
    const pieSegments = document.querySelectorAll('.pie-segment');
    pieSegments.forEach((segment, index) => {
        const startAngle = parseFloat(segment.style.getPropertyValue('--start-angle'));
        const endAngle = parseFloat(segment.style.getPropertyValue('--end-angle'));
        const color = segment.style.getPropertyValue('--color');
        
        // Calculate stroke dasharray for pie slice
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const startPercent = startAngle / 360;
        const endPercent = endAngle / 360;
        const arcLength = (endPercent - startPercent) * circumference;
        
        segment.setAttribute('cx', '100');
        segment.setAttribute('cy', '100');
        segment.setAttribute('r', radius);
        segment.setAttribute('fill', 'none');
        segment.setAttribute('stroke', color);
        segment.setAttribute('stroke-width', '80');
        segment.setAttribute('stroke-dasharray', `0 ${circumference}`);
        segment.setAttribute('stroke-dashoffset', `${-startPercent * circumference}`);
        segment.setAttribute('transform', `rotate(${startAngle} 100 100)`);
        
        // Animate
        setTimeout(() => {
            segment.style.transition = 'stroke-dasharray 1s ease';
            segment.setAttribute('stroke-dasharray', `${arcLength} ${circumference}`);
        }, index * 200);
    });
}

// Trigger pie chart animation
const pieChartContainer = document.querySelector('.pie-chart-container');
if (pieChartContainer) {
    const pieObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animatePieChart();
                pieObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    pieObserver.observe(pieChartContainer);
}

// ==================== Line Chart Animation ==================== 
function animateLineChart() {
    const lineChartSvg = document.querySelector('.line-chart-svg');
    if (!lineChartSvg) return;
    
    const polyline = lineChartSvg.querySelector('polyline');
    if (!polyline) return;
    
    const length = polyline.getTotalLength();
    polyline.style.strokeDasharray = length;
    polyline.style.strokeDashoffset = length;
    polyline.style.transition = 'stroke-dashoffset 2s ease';
    
    setTimeout(() => {
        polyline.style.strokeDashoffset = 0;
    }, 100);
    
    // Animate data points
    const dataPoints = lineChartSvg.querySelectorAll('.data-point');
    dataPoints.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            point.style.opacity = '1';
        }, 1500 + index * 150);
    });
}

// Trigger line chart animation
const lineChartContainer = document.querySelector('.line-chart');
if (lineChartContainer) {
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateLineChart();
                lineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    lineObserver.observe(lineChartContainer);
}

// ==================== Interactive Bar Hover Effect ==================== 
document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2)';
        const label = this.querySelector('.bar-label');
        if (label) {
            label.style.transform = 'scale(1.2)';
        }
    });
    
    bar.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
        const label = this.querySelector('.bar-label');
        if (label) {
            label.style.transform = 'scale(1)';
        }
    });
});

// ==================== Data Point Tooltip ==================== 
const dataPoints = document.querySelectorAll('.data-point');
dataPoints.forEach((point, index) => {
    const labels = ['Solar Panel: 83', 'Sport AI: 2816', 'Smart Ketekshe: 120', 'Water NKS-AI: 160', 'Махалле: 160'];
    
    point.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = labels[index];
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);
        
        const rect = point.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        point.dataset.tooltip = tooltip;
    });
    
    point.addEventListener('mouseleave', function() {
        if (this.dataset.tooltip) {
            document.body.removeChild(this.dataset.tooltip);
            delete this.dataset.tooltip;
        }
    });
});

// ==================== Program Cards Stagger Animation ==================== 
function animateProgramCards() {
    const cards = document.querySelectorAll('.program-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Trigger program cards animation
const programsSection = document.querySelector('.programs');
if (programsSection) {
    const programsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgramCards();
                programsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    programsObserver.observe(programsSection);
}

// ==================== Stat Box Counter Animation ==================== 
function animateCounters() {
    const statBoxes = document.querySelectorAll('.stat-box, .big-stat');
    
    statBoxes.forEach(box => {
        const numberElement = box.querySelector('.stat-number, .big-number');
        if (!numberElement) return;
        
        const finalValue = parseInt(numberElement.textContent);
        if (isNaN(finalValue)) return;
        
        let currentValue = 0;
        const increment = Math.ceil(finalValue / 50);
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(interval);
            }
            numberElement.textContent = currentValue;
        }, 30);
    });
}

// Trigger counter animation
const statsSection = document.querySelector('.statistics');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ==================== CTA Button Click Handler ==================== 
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        alert('Маълумот олиш учун бизга хабар қилинг!');
    });
});

// ==================== Table Row Hover Effect ==================== 
document.querySelectorAll('.data-table tbody tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f0f0f0';
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
        this.style.transform = 'scale(1)';
    });
});

// ==================== Navbar Active Link ==================== 
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent-color)';
            link.style.borderBottom = '2px solid var(--accent-color)';
        } else {
            link.style.color = '';
            link.style.borderBottom = '';
        }
    });
});

// ==================== Parallax Effect ==================== 
window.addEventListener('scroll', function() {
    const floatingBoxes = document.querySelectorAll('.floating-box');
    floatingBoxes.forEach((box, index) => {
        const scrollPosition = window.pageYOffset;
        box.style.transform = `translateY(${scrollPosition * (0.5 + index * 0.1)}px)`;
    });
});

// ==================== Lazy Load Images ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== Mobile Menu Toggle ==================== 
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
    `;
    
    document.querySelector('.navbar .container').appendChild(menuButton);
    
    // Show menu button on mobile
    function updateMenuButton() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuButton.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }
    
    updateMenuButton();
    window.addEventListener('resize', updateMenuButton);
    
    // Toggle menu
    menuButton.addEventListener('click', function() {
        if (navLinks.style.display === 'none') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(0, 0, 0, 0.9)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '0.5rem';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
}

setupMobileMenu();

// ==================== Scroll to Top Button ==================== 
function setupScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

setupScrollToTop();

// ==================== Page Load Animation ==================== 
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== Console Message ==================== 
console.log('%c🎓 Телевизион технологиялари кафедраси', 'font-size: 20px; font-weight: bold; color: #FF6B6B;');
console.log('%cМуҳаммад ал-Хоразмий номидаги ТАТУ Нукус филиали', 'font-size: 14px; color: #4ECDC4;');
