/**
 * Dashboard specific logic
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load User Data
    const userDataStr = localStorage.getItem('kalai_user');
    if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        const nameDisplay = document.getElementById('artisanNameDisplay');
        const headerInitial = document.getElementById('headerInitial');
        
        if (nameDisplay && userData.name) {
            // Get first name
            nameDisplay.textContent = userData.name.split(' ')[0];
        }
        
        if (headerInitial && userData.name) {
            headerInitial.textContent = userData.name.charAt(0).toUpperCase();
        }
    }

    // Load Products
    const productsStr = localStorage.getItem('kalai_products');
    const productList = document.getElementById('dashboardProductList');
    
    if (productsStr && productList) {
        const products = JSON.parse(productsStr);
        
        // Show last 3 products
        const recentProducts = products.slice(-3).reverse();
        
        if (recentProducts.length > 0) {
            productList.innerHTML = ''; // Clear loading state if any
            
            recentProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.display = 'flex';
                card.style.padding = 'var(--spacing-md)';
                card.style.gap = 'var(--spacing-md)';
                card.style.alignItems = 'center';
                
                card.innerHTML = `
                    <div style="width: 80px; height: 80px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0;">
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="flex-grow: 1;">
                        <h4 style="margin-bottom: 4px; font-size: 1rem;">${product.name}</h4>
                        <div style="color: var(--color-primary); font-weight: 600; margin-bottom: 4px;">₹${product.price}</div>
                        ${product.isAiEnhanced ? `<span class="badge badge-success" style="font-size: 0.65rem; padding: 2px 6px;">AI Enhanced</span>` : ''}
                    </div>
                    <div>
                        <button class="btn-icon text-muted">
                            <i data-lucide="more-vertical"></i>
                        </button>
                    </div>
                `;
                
                productList.appendChild(card);
            });
            lucide.createIcons();
        } else {
            productList.innerHTML = `
                <div class="card" style="padding: var(--spacing-xl); text-align: center;">
                    <p class="text-muted">You haven't listed any products yet.</p>
                </div>
            `;
        }
    }
});
