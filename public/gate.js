(function() {
  'use strict';

  // Find the gate script
  var script = document.querySelector('script[data-vibepay-gate]');
  if (!script) return;

  var productId = script.getAttribute('data-vibepay-gate');
  if (!productId) {
    console.error('VibePay Gate: Missing product ID');
    return;
  }

  // Configuration
  var baseUrl = script.src.replace('/gate.js', '');
  var storageKey = 'vibepay_' + productId;
  var theme = script.getAttribute('data-theme') || 'dark';
  var title = script.getAttribute('data-title') || 'Premium Access Required';
  var description = script.getAttribute('data-description') || 'Unlock this app with a one-time payment.';
  var buttonText = script.getAttribute('data-button-text');

  // Check if already paid
  function isPaid() {
    try {
      var data = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return data.paid === true;
    } catch (e) {
      return false;
    }
  }

  // Mark as paid
  function markPaid(paymentId) {
    localStorage.setItem(storageKey, JSON.stringify({
      paid: true,
      paymentId: paymentId,
      paidAt: new Date().toISOString()
    }));
  }

  // Check URL for payment confirmation
  function checkPaymentCallback() {
    var urlParams = new URLSearchParams(window.location.search);
    var vibePaySuccess = urlParams.get('vibepay_success');
    var vibePayProduct = urlParams.get('vibepay_product');
    var vibePayPayment = urlParams.get('vibepay_payment');

    if (vibePaySuccess === 'true' && vibePayProduct === productId) {
      markPaid(vibePayPayment || 'unknown');

      // Clean up URL
      urlParams.delete('vibepay_success');
      urlParams.delete('vibepay_product');
      urlParams.delete('vibepay_payment');

      var newUrl = window.location.pathname;
      var remaining = urlParams.toString();
      if (remaining) newUrl += '?' + remaining;

      window.history.replaceState({}, '', newUrl);
      return true;
    }
    return false;
  }

  // If payment callback detected, mark as paid
  if (checkPaymentCallback()) {
    return; // Already paid, no gate needed
  }

  // If already paid, don't show gate
  if (isPaid()) {
    return;
  }

  // Fetch product info
  fetch(baseUrl + '/api/product/' + productId)
    .then(function(res) {
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    })
    .then(function(product) {
      showGate(product);
    })
    .catch(function(err) {
      console.error('VibePay Gate:', err.message);
      // Show fallback gate
      showGate({
        name: 'Premium Access',
        price: 999
      });
    });

  function showGate(product) {
    var priceText = '$' + (product.price / 100).toFixed(2);
    var buyText = buttonText || 'Unlock for ' + priceText;

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'vibepay-gate';
    overlay.innerHTML = getGateHTML(product.name, priceText, buyText, title, description, theme);

    // Add styles
    if (!document.getElementById('vibepay-gate-styles')) {
      var styles = document.createElement('style');
      styles.id = 'vibepay-gate-styles';
      styles.textContent = getStyles(theme);
      document.head.appendChild(styles);
    }

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Add to page
    document.body.appendChild(overlay);

    // Handle buy button click
    var buyButton = document.getElementById('vibepay-gate-buy');
    buyButton.addEventListener('click', function() {
      // Build return URL with callback params
      var returnUrl = window.location.href;
      var separator = returnUrl.includes('?') ? '&' : '?';
      returnUrl += separator + 'vibepay_success=true&vibepay_product=' + productId;

      // Open payment page
      window.location.href = baseUrl + '/pay/' + productId + '?return_url=' + encodeURIComponent(returnUrl);
    });
  }

  function getGateHTML(productName, priceText, buyText, title, description, theme) {
    var isDark = theme === 'dark';

    return '\
      <div class="vibepay-gate-backdrop">\
        <div class="vibepay-gate-modal">\
          <div class="vibepay-gate-icon">\
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>\
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>\
            </svg>\
          </div>\
          <h2 class="vibepay-gate-title">' + title + '</h2>\
          <p class="vibepay-gate-description">' + description + '</p>\
          <div class="vibepay-gate-product">\
            <span class="vibepay-gate-product-name">' + productName + '</span>\
            <span class="vibepay-gate-product-price">' + priceText + '</span>\
          </div>\
          <button id="vibepay-gate-buy" class="vibepay-gate-button">\
            ' + buyText + '\
          </button>\
          <p class="vibepay-gate-footer">\
            Secure payment via <strong>Stripe</strong>\
          </p>\
        </div>\
      </div>\
    ';
  }

  function getStyles(theme) {
    var isDark = theme === 'dark';
    var bgColor = isDark ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.98)';
    var modalBg = isDark ? '#1a1a2e' : '#ffffff';
    var textColor = isDark ? '#ffffff' : '#1a1a2e';
    var mutedColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';
    var borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    var accentColor = '#00ff88';

    return '\
      #vibepay-gate {\
        position: fixed;\
        top: 0;\
        left: 0;\
        right: 0;\
        bottom: 0;\
        z-index: 999999;\
      }\
      .vibepay-gate-backdrop {\
        position: absolute;\
        top: 0;\
        left: 0;\
        right: 0;\
        bottom: 0;\
        background: ' + bgColor + ';\
        backdrop-filter: blur(8px);\
        display: flex;\
        align-items: center;\
        justify-content: center;\
        padding: 20px;\
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
      }\
      .vibepay-gate-modal {\
        background: ' + modalBg + ';\
        border-radius: 16px;\
        padding: 40px;\
        max-width: 400px;\
        width: 100%;\
        text-align: center;\
        box-shadow: 0 25px 50px rgba(0,0,0,0.25);\
        border: 1px solid ' + borderColor + ';\
      }\
      .vibepay-gate-icon {\
        color: ' + accentColor + ';\
        margin-bottom: 20px;\
      }\
      .vibepay-gate-title {\
        color: ' + textColor + ';\
        font-size: 24px;\
        font-weight: 700;\
        margin: 0 0 12px 0;\
      }\
      .vibepay-gate-description {\
        color: ' + mutedColor + ';\
        font-size: 15px;\
        margin: 0 0 24px 0;\
        line-height: 1.5;\
      }\
      .vibepay-gate-product {\
        display: flex;\
        justify-content: space-between;\
        align-items: center;\
        padding: 16px;\
        background: ' + (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)') + ';\
        border-radius: 8px;\
        margin-bottom: 24px;\
      }\
      .vibepay-gate-product-name {\
        color: ' + textColor + ';\
        font-weight: 600;\
      }\
      .vibepay-gate-product-price {\
        color: ' + accentColor + ';\
        font-weight: 700;\
        font-size: 18px;\
      }\
      .vibepay-gate-button {\
        width: 100%;\
        padding: 16px 24px;\
        font-size: 16px;\
        font-weight: 600;\
        border: none;\
        border-radius: 8px;\
        cursor: pointer;\
        background: ' + accentColor + ';\
        color: #0a0a0a;\
        transition: all 0.2s ease;\
      }\
      .vibepay-gate-button:hover {\
        transform: translateY(-2px);\
        box-shadow: 0 8px 20px rgba(0,255,136,0.3);\
      }\
      .vibepay-gate-footer {\
        color: ' + mutedColor + ';\
        font-size: 12px;\
        margin: 16px 0 0 0;\
      }\
      .vibepay-gate-footer strong {\
        color: ' + textColor + ';\
      }\
    ';
  }
})();
