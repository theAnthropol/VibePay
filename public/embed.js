(function() {
  'use strict';

  // Find all VibePay scripts on the page
  var scripts = document.querySelectorAll('script[data-vibepay-id]');

  scripts.forEach(function(script) {
    var productId = script.getAttribute('data-vibepay-id');
    if (!productId) return;

    // Determine the base URL
    var baseUrl = script.src.replace('/embed.js', '');

    // Get customization options
    var theme = script.getAttribute('data-theme') || 'dark';
    var size = script.getAttribute('data-size') || 'medium';
    var customText = script.getAttribute('data-text');

    // Create container
    var container = document.createElement('div');
    container.className = 'vibepay-container';
    container.innerHTML = '<span style="opacity: 0.5; font-family: system-ui, sans-serif; font-size: 14px;">Loading...</span>';

    // Insert after the script tag
    script.parentNode.insertBefore(container, script.nextSibling);

    // Fetch product info and create button
    fetch(baseUrl + '/api/product/' + productId)
      .then(function(res) {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(function(product) {
        var buttonText = customText || 'Buy ' + product.name;
        var priceText = '$' + (product.price / 100).toFixed(2);

        // Build button HTML
        var button = document.createElement('a');
        button.href = baseUrl + '/pay/' + productId;
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.className = 'vibepay-btn vibepay-' + theme + ' vibepay-' + size;

        button.innerHTML = '<span class="vibepay-label">' + buttonText + '</span>' +
                          '<span class="vibepay-price">' + priceText + '</span>';

        // Inject styles if not already present
        if (!document.getElementById('vibepay-styles')) {
          var styles = document.createElement('style');
          styles.id = 'vibepay-styles';
          styles.textContent = getStyles();
          document.head.appendChild(styles);
        }

        container.innerHTML = '';
        container.appendChild(button);
      })
      .catch(function(err) {
        console.error('VibePay:', err.message);
        container.innerHTML = '<span style="color: #ef4444; font-family: system-ui, sans-serif; font-size: 12px;">Product unavailable</span>';
      });
  });

  function getStyles() {
    return '\
      .vibepay-btn {\
        display: inline-flex;\
        align-items: center;\
        gap: 8px;\
        font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;\
        font-weight: 600;\
        border: none;\
        border-radius: 6px;\
        cursor: pointer;\
        transition: all 0.2s ease;\
        text-decoration: none;\
      }\
      .vibepay-btn:hover {\
        transform: translateY(-1px);\
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\
      }\
      /* Sizes */\
      .vibepay-small { padding: 8px 16px; font-size: 13px; }\
      .vibepay-medium { padding: 12px 24px; font-size: 15px; }\
      .vibepay-large { padding: 16px 32px; font-size: 17px; }\
      /* Dark theme */\
      .vibepay-dark {\
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);\
        color: #ffffff;\
      }\
      .vibepay-dark:hover { background: linear-gradient(135deg, #252542 0%, #1a2744 100%); }\
      .vibepay-dark .vibepay-price {\
        background: rgba(0, 255, 136, 0.15);\
        color: #00ff88;\
        padding: 4px 10px;\
        border-radius: 4px;\
      }\
      /* Light theme */\
      .vibepay-light {\
        background: #ffffff;\
        color: #1a1a2e;\
        border: 1px solid #e5e7eb;\
      }\
      .vibepay-light:hover { background: #f9fafb; }\
      .vibepay-light .vibepay-price {\
        background: #f0fdf4;\
        color: #16a34a;\
        padding: 4px 10px;\
        border-radius: 4px;\
      }\
      /* Accent theme */\
      .vibepay-accent {\
        background: #00ff88;\
        color: #0a0a0a;\
      }\
      .vibepay-accent:hover { background: #00e67a; }\
      .vibepay-accent .vibepay-price {\
        background: rgba(0, 0, 0, 0.1);\
        padding: 4px 10px;\
        border-radius: 4px;\
      }\
      /* Minimal theme */\
      .vibepay-minimal {\
        background: transparent;\
        color: inherit;\
        border: 2px solid currentColor;\
      }\
      .vibepay-minimal:hover { background: rgba(128, 128, 128, 0.1); }\
      .vibepay-minimal .vibepay-price { opacity: 0.8; }\
    ';
  }
})();
