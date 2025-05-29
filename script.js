document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const htmlElement = document.documentElement

  // Set initial theme class if not already set
  if (!htmlElement.classList.contains("light-mode") && !htmlElement.classList.contains("dark-mode")) {
    htmlElement.classList.add("light-mode")
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    htmlElement.className = savedTheme
  } else {
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDarkMode) {
      htmlElement.classList.remove("light-mode")
      htmlElement.classList.add("dark-mode")
    } else {
      htmlElement.classList.remove("dark-mode")
      htmlElement.classList.add("light-mode")
    }
  }

  // Toggle theme when clicking the theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      console.log("Theme toggle clicked") // Debug log
      if (htmlElement.classList.contains("dark-mode")) {
        htmlElement.classList.remove("dark-mode")
        htmlElement.classList.add("light-mode")
        localStorage.setItem("theme", "light-mode")
      } else {
        htmlElement.classList.remove("light-mode")
        htmlElement.classList.add("dark-mode")
        localStorage.setItem("theme", "dark-mode")
      }
    })
  } else {
    console.error("Theme toggle button not found") // Debug log
  }

  // Timeline Animation
  const timeline = document.querySelector(".timeline")
  const timelineItems = document.querySelectorAll(".timeline-item")

  function animateTimeline() {
    timelineItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (itemPosition < screenPosition) {
        // Add animation class with a delay for each item
        setTimeout(() => {
          item.classList.add("animate")
        }, index * 200) // 200ms delay between each item

        // Animate the timeline line
        if (timeline) {
          timeline.classList.add("animate")
        }
      }
    })
  }

  // Skill Bars Animation
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-level")

    skillBars.forEach((bar) => {
      // Force the initial width to 0
      bar.style.width = "0%"

      // Get the target width from the style attribute
      const targetWidthMatch = bar.getAttribute("style") ? bar.getAttribute("style").match(/width:\s*(\d+)%/) : null

      const targetWidth = targetWidthMatch ? targetWidthMatch[1] + "%" : "0%"

      // Set a timeout to apply the animation
      setTimeout(() => {
        console.log("Animating bar to width:", targetWidth) // Debug log
        bar.style.width = targetWidth
      }, 500)
    })
  }

  // Visualization Cards Animation
  const vizCards = document.querySelectorAll(".viz-pattern-card")

  function animateVizCards() {
    vizCards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (cardPosition < screenPosition) {
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, index * 150)
      }
    })
  }

  // Set initial state for viz cards
  vizCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animations on scroll
  window.addEventListener("scroll", () => {
    animateTimeline()
    const skillsSection = document.querySelector(".skills")
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (sectionTop < screenPosition) {
        animateSkillBars()
      }
    }
    animateVizCards()
  })

  // Run animations on page load
  animateTimeline()
  setTimeout(() => {
    animateSkillBars()
  }, 1000)
  animateVizCards()

  // Active navigation based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  function setActiveNav() {
    const scrollPosition = window.scrollY
    const headerHeight = document.querySelector("header").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", setActiveNav)
  setActiveNav() // Set active nav on page load

  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  }

  // Typing Animation
  const typingElement = document.querySelector(".typing-animation")
  const phrases = [
    "Transforming Data into Actionable Insights",
    "Visualizing Complex Information",
    "Uncovering Patterns in Data",
    "Driving Decisions with Analytics",
  ]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingDelay = 100
  const newTextDelay = 2000 // Delay after typing a phrase
  const deletingDelay = 50 // Faster when deleting

  function typeText() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      // Remove a character
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingDelay = deletingDelay
    } else {
      // Add a character
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingDelay = typingDelay * 0.9 + 10 // Gradually speed up typing
    }

    // If word is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing
      typingDelay = newTextDelay
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase after deleting
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingDelay = 500 // Pause before typing next phrase
    }

    setTimeout(typeText, typingDelay)
  }

  // Start the typing animation
  if (typingElement) {
    setTimeout(typeText, 1000) // Start after a 1s delay
  }

  // Smooth scrolling for anchor links with enhanced animation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      // Add animation class to the clicked link
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.remove("clicked")
      })
      this.classList.add("clicked")

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Add a class to the target section for animation
        const allSections = document.querySelectorAll("section")
        allSections.forEach((section) => {
          section.classList.remove("section-active")
        })

        // Scroll to the target section
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Add active class to the target section after a small delay
        setTimeout(() => {
          targetElement.classList.add("section-active")
        }, 300)
      }
    })
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log("Form submitted:", { name, email, subject, message })

      // Reset form
      contactForm.reset()

      // Show success message (you can replace this with a proper UI notification)
      alert("Thank you for your message! I will get back to you soon.")
    })
  }

  // Project card hover effects enhancement
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Add a slight rotation based on mouse position for a 3D effect
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
        const mouseX = e.clientX
        const mouseY = e.clientY

        // Calculate rotation based on mouse position relative to card center
        const rotateY = (mouseX - cardCenterX) / 20
        const rotateX = (cardCenterY - mouseY) / 20

        // Apply the rotation transform
        card.style.transform = `translateY(-15px) scale(1.02) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
      })
    })

    // Reset the transform when mouse leaves
    card.addEventListener("mouseleave", () => {
      card.style.transform = ""
      // Remove the mousemove event listener
      card.removeEventListener("mousemove", null)
    })
  })

  // Force skill bars animation on page load
  setTimeout(() => {
    animateSkillBars()
  }, 1000)

  // Also trigger on scroll
  window.addEventListener("scroll", () => {
    const skillsSection = document.querySelector(".skills")
    if (skillsSection) {
      const sectionTop = skillsSection.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (sectionTop < screenPosition) {
        animateSkillBars()
      }
    }
  })
})
