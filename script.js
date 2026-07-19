// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    // Animate hamburger icon
    const spans = mobileMenuBtn.querySelectorAll("span")
    if (mobileMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(7px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translateY(-7px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    const spans = mobileMenuBtn.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#" && href.length > 1) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")
const thankYouMessage = document.getElementById("thankYouMessage")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // ⚠️ PASTE YOUR OWN GOOGLE APPS SCRIPT WEB APP URL BELOW
    // Get this from: Extensions > Apps Script > Deploy > New deployment > Web app
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwBHIv4MFDH_VV-8kHk-qYS6enBjOLqOGbHSOZ7L9cKVuGHlbcKtSMZ-yd8Q1GxvkvHqw/exec';

    // Fail loudly if the URL was never set — this is a common cause of
    // "nothing happens" with no clear error
    if (!scriptURL || scriptURL === 'PASTE_YOUR_WEB_APP_URL_HERE') {
      console.error('Contact form: scriptURL has not been set. Paste your Apps Script Web App URL into script.js.');
      alert('Form is not fully configured yet. Please contact us by phone or email instead.');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    // Get form data
    const formData = new FormData(contactForm);

    // Send data via Fetch
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      // Log raw status so real failures (redirects, 4xx/5xx, HTML error
      // pages from a misconfigured deployment) are visible in the console
      console.log('Apps Script response status:', response.status, response.type);
      return response.text();
    })
    .then(text => {
      console.log('Apps Script raw response:', text);
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseErr) {
        // The response wasn't JSON — almost always means the Apps Script
        // deployment is misconfigured (e.g. "Who has access" isn't set to
        // "Anyone"), so Google returned a login/error page instead of our
        // doPost() output.
        throw new Error('Server did not return valid JSON. Check the Apps Script deployment settings (Who has access must be "Anyone").');
      }

      if (result.result === 'success') {
        // Hide form and show thank you message
        contactForm.style.display = "none";
        thankYouMessage.style.display = "block";
        thankYouMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        console.error('Apps Script returned an error result:', result);
        alert('There was an error submitting the form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Contact form submission failed:', error);
      alert('There was an error submitting the form. Please try again, or contact us by phone/email.');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  })
}

// Add scroll effect to header
let lastScroll = 0
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})
