/**
 * Add Product Flow & AI Simulation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Setup Slider
    setupComparisonSlider();
    setupVoiceSimulation();
});

// Navigation between steps
function nextStep(stepId) {
    document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('active'));
    document.getElementById(stepId).classList.add('active');
    
    // Update progress dots
    const dots = document.querySelectorAll('#headerProgress .step-dot');
    const stepIndex = parseInt(stepId.replace('step', '')) - 1;
    if(stepIndex >= 0 && stepIndex < dots.length) {
        document.getElementById('headerProgress').style.display = 'flex';
        dots.forEach((dot, idx) => {
            if (idx <= stepIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
}

function prevStep(stepId) {
    nextStep(stepId);
}

// Step 1: Simulate Upload & Processing
function simulateUpload() {
    nextStep('stepProcessing');
    const msgs = [
        "Analyzing your craft...",
        "Removing background...",
        "Enhancing lighting...",
        "Identifying product type...",
        "Preparing AI Studio..."
    ];
    
    let i = 0;
    const msgEl = document.getElementById('processingMsg');
    
    const interval = setInterval(() => {
        i++;
        if (i < msgs.length) {
            msgEl.textContent = msgs[i];
            msgEl.classList.remove('animate-slide-up');
            // trigger reflow
            void msgEl.offsetWidth;
            msgEl.classList.add('animate-slide-up');
        } else {
            clearInterval(interval);
            nextStep('step2');
            // reset processing message
            setTimeout(()=> { msgEl.textContent = msgs[0]; }, 500);
        }
    }, 1200);
}

// Step 2: Comparison Slider
function setupComparisonSlider() {
    const slider = document.getElementById('comparisonSlider');
    if (!slider) return;
    
    const handle = document.getElementById('sliderHandle');
    const beforeImg = document.getElementById('imgBefore');
    let isDragging = false;

    const moveSlider = (clientX) => {
        const rect = slider.getBoundingClientRect();
        let x = clientX - rect.left;
        
        // Boundaries
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percentage = (x / rect.width) * 100;
        
        handle.style.left = `${percentage}%`;
        beforeImg.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        moveSlider(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        moveSlider(e.touches[0].clientX);
    }, {passive: true});

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
    }, {passive: true});

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Step 3: Voice Simulation
function setupVoiceSimulation() {
    const btn = document.querySelector('#productVoiceBtn .btn-voice');
    if (!btn) return;
    
    const sim = document.getElementById('productVoiceSimulation');
    const transcript = document.getElementById('productTranscript');
    const genBtn = document.getElementById('btnGenerateCatalog');
    
    let transcriptText = "It is made of pure terracotta river clay. I molded it by hand. It took me about 5 hours to paint the intricate traditional designs.";
    let i = 0;
    let typeInterval;

    btn.addEventListener('click', () => {
        if (btn.classList.contains('recording')) {
            // Stop
            clearInterval(typeInterval);
            btn.classList.remove('recording');
            btn.innerHTML = '<i data-lucide="mic"></i> Retake';
            document.querySelector('.waveform').style.display = 'none';
            genBtn.disabled = false;
            lucide.createIcons();
            return;
        }

        // Start
        btn.classList.add('recording');
        btn.innerHTML = '<i data-lucide="square"></i> Stop Recording';
        sim.classList.remove('hidden');
        document.querySelector('.waveform').style.display = 'flex';
        transcript.textContent = "";
        genBtn.disabled = true;
        lucide.createIcons();
        
        i = 0;
        // Simulate speech to text typing
        typeInterval = setInterval(() => {
            if (i < transcriptText.length) {
                transcript.textContent += transcriptText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                btn.click(); // Auto stop when done
            }
        }, 50);
    });
}

// Step 4: AI Catalog Generation Simulation
function simulateCatalogueGeneration() {
    nextStep('stepProcessing');
    const msgs = [
        "Analyzing your voice description...",
        "Extracting materials and craft type...",
        "Writing professional description...",
        "Translating to Hindi and Tamil...",
        "Generating tags..."
    ];
    
    let i = 0;
    const msgEl = document.getElementById('processingMsg');
    msgEl.textContent = msgs[0];
    
    const interval = setInterval(() => {
        i++;
        if (i < msgs.length) {
            msgEl.textContent = msgs[i];
            msgEl.classList.remove('animate-slide-up');
            void msgEl.offsetWidth;
            msgEl.classList.add('animate-slide-up');
        } else {
            clearInterval(interval);
            nextStep('step4');
            setTimeout(()=> { msgEl.textContent = "Processing..."; }, 500);
        }
    }, 1000);
}

function switchLang(lang, element) {
    document.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('catalogFormEn').classList.add('hidden');
    document.getElementById('catalogFormHi').classList.add('hidden');
    
    if(lang === 'en') document.getElementById('catalogFormEn').classList.remove('hidden');
    if(lang === 'hi') document.getElementById('catalogFormHi').classList.remove('hidden');
    // For demo, Tamil just shows Hindi placeholder
    if(lang === 'ta') document.getElementById('catalogFormHi').classList.remove('hidden');
}

// Step 6: Publish
function publishProduct() {
    // Save to localStorage demo data
    const newProduct = {
        id: 'p' + Date.now(),
        name: document.getElementById('catName').value,
        artisan: JSON.parse(localStorage.getItem('kalai_user'))?.name || 'Lakshmi Devi',
        location: JSON.parse(localStorage.getItem('kalai_user'))?.location || 'Tamil Nadu',
        price: document.getElementById('finalPrice').value,
        category: 'Pottery',
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800',
        tags: document.getElementById('catTags').value.split(',').map(t => t.trim()),
        isAiEnhanced: true
    };
    
    const productsStr = localStorage.getItem('kalai_products');
    if (productsStr) {
        const products = JSON.parse(productsStr);
        products.push(newProduct);
        localStorage.setItem('kalai_products', JSON.stringify(products));
    }
    
    App.openModal('successModal');
}
