/**
 * Marketplace Logic
 */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('marketplaceGrid');
    const countEl = document.getElementById('productCount');
    
    if (!grid) return;

    const productsStr = localStorage.getItem('kalai_products');
    if (productsStr) {
        const products = JSON.parse(productsStr).reverse(); // Show newest first
        
        if(countEl) countEl.textContent = products.length;

        products.forEach(product => {
            const card = document.createElement('a');
            card.href = `product-details.html?id=${product.id}`;
            card.className = 'card product-card card-hover';
            
            let badgesHTML = '';
            if (product.isAiEnhanced) {
                badgesHTML += `<div class="badge badge-ai product-badge" style="font-size: 0.65rem;"><i data-lucide="sparkles" style="width:10px; height:10px; margin-right:4px;"></i>AI Verified</div>`;
            }

            card.innerHTML = `
                <div class="product-img-wrap">
                    ${badgesHTML}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="card-body" style="display: flex; flex-direction: column; flex-grow: 1;">
                    <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 4px; display: flex; justify-content: space-between;">
                        <span>${product.category}</span>
                        <span>${product.location}</span>
                    </div>
                    <h3 style="font-size: 1.125rem; margin-bottom: 8px; line-height: 1.3;">${product.name}</h3>
                    <div style="color: var(--color-text-muted); font-size: 0.875rem; margin-bottom: 16px;">
                        By ${product.artisan}
                    </div>
                    <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;">
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary); font-family: var(--font-heading);">
                            ₹${product.price}
                        </div>
                        <div style="color: var(--color-success); font-size: 0.75rem; font-weight: 500;">
                            Available
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        lucide.createIcons();
    }
});
