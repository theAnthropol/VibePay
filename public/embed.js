(function() {
  'use strict';

  // Find all VibePay scripts on the page
  var scripts = document.querySelectorAll('script[data-vibepay-id]');

  scripts.forEach(function(script) {
    var productId = script.getAttribute('data-vibepay-id');
    if (!productId) return;

    // Determine the base URL
    var baseUrl = script.src.replace('/embed.js', '');

    // Create container
    var container = document.createElement('div');
    container.className = 'vibepay-container';
    container.style.cssText = 'font-family: system-ui, -apple-system, sans-serif;';

    // Create button
    var button = document.createElement('a');
    button.href = baseUrl + '/pay/' + productId;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';
    button.className = 'vibepay-button';
    button.style.cssText = [
      'display: inline-block',
      'background-color: #00ff88',
      'color: #0a0a0a',
      'font-weight: 700',
      'padding: 12px 24px',
      'text-decoration: none',
      'font-size: 16px',
      'transition: opacity 0.2s',
      'cursor: pointer'
    ].join(';');

    // Get custom text or use default
    var buttonText = script.getAttribute('data-vibepay-text') || 'Buy Now';
    button.textContent = buttonText;

    // Hover effect
    button.onmouseenter = function() {
      button.style.opacity = '0.9';
    };
    button.onmouseleave = function() {
      button.style.opacity = '1';
    };

    container.appendChild(button);

    // Insert after the script tag
    script.parentNode.insertBefore(container, script.nextSibling);
  });
})();
