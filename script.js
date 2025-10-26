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
// const contactForm = document.getElementById("contactForm")
// const thankYouMessage = document.getElementById("thankYouMessage")

// if (contactForm) {
//   contactForm.addEventListener("submit", (e) => {
//     e.preventDefault()

//     // Get form data
//     const formData = {
//       firstName: document.getElementById("firstName").value,
//       lastName: document.getElementById("lastName").value,
//       email: document.getElementById("email").value,
//       phone: document.getElementById("phone").value,
//       address: document.getElementById("address").value,
//       description: document.getElementById("description").value,
//     }

//     // Log form data (in production, you would send this to a server)
//     console.log("Form submitted:", formData)

//     // Hide form and show thank you message
//     contactForm.style.display = "none"
//     thankYouMessage.style.display = "block"

//     // Scroll to top of thank you message
//     thankYouMessage.scrollIntoView({ behavior: "smooth", block: "center" })
//   })
// }

// Contact Form Submission
const contactForm = document.getElementById("contactForm")
const thankYouMessage = document.getElementById("thankYouMessage")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Replace with your Google Apps Script Web app URL
    const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';  // Paste your URL here

    // Get form data
    const formData = new FormData(contactForm);

    // Send data via Fetch
    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      if (result.result === 'success') {
        // Hide form and show thank you message
        contactForm.style.display = "none";
        thankYouMessage.style.display = "block";
        thankYouMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form. Please try again.');
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
