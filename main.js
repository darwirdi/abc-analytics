// Pushes custom events to the Google Tag Manager dataLayer.
// In GTM, create a "Custom Event" trigger with the same event name
// (cta_click, sign_up) and a GA4 Event tag to forward it to Google Analytics.
window.dataLayer = window.dataLayer || [];
function track(eventName, params) {
  var data = { event: eventName };
  for (var k in params) { data[k] = params[k]; }
  window.dataLayer.push(data);
}

// Track clicks on any element with a data-track attribute (CTA buttons, nav links).
document.querySelectorAll('[data-track]').forEach(function (el) {
  el.addEventListener('click', function () {
    track('cta_click', {
      cta_id: el.dataset.track,
      cta_text: el.textContent.trim()
    });
  });
});

// Track waitlist signups as a GA4 recommended "sign_up" event.
// Note: the email itself is NOT sent to GA (Google prohibits sending PII).
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  track('sign_up', { method: 'waitlist_form' });
  document.getElementById('signup-msg').textContent = '¡Gracias! Ya estás en la lista.';
  e.target.reset();
});
