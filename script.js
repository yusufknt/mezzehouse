// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.getElementById("navbar");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navbar.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }

  // Scroll Event for Header
  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });

  // Navigation Active Link
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("#navbar ul li a");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Click event for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.querySelector(".slider-btn.prev-btn");
  const nextBtn = document.querySelector(".slider-btn.next-btn");
  let currentSlide = 0;

  // Function to show a specific slide
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Auto slider
  let slideInterval = setInterval(nextSlide, 5000);

  // Function for next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Function for previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  // Event listeners for the slider buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function () {
      clearInterval(slideInterval);
      prevSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });

    nextBtn.addEventListener("click", function () {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  // Event listeners for the dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      clearInterval(slideInterval);
      showSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  // Menu Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      menuItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
  const testimonialPrevBtn = document.querySelector(
    ".testimonial-btn.prev-btn"
  );
  const testimonialNextBtn = document.querySelector(
    ".testimonial-btn.next-btn"
  );
  let currentTestimonial = 0;

  // Function to show a specific testimonial
  function showTestimonial(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialDots.forEach((dot) => dot.classList.remove("active"));

    testimonialSlides[index].classList.add("active");
    testimonialDots[index].classList.add("active");
    currentTestimonial = index;
  }

  // Auto slider for testimonials
  let testimonialInterval = setInterval(nextTestimonial, 6000);

  // Function for next testimonial
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }

  // Function for previous testimonial
  function prevTestimonial() {
    currentTestimonial =
      (currentTestimonial - 1 + testimonialSlides.length) %
      testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }

  // Event listeners for the testimonial slider buttons
  if (testimonialPrevBtn && testimonialNextBtn) {
    testimonialPrevBtn.addEventListener("click", function () {
      clearInterval(testimonialInterval);
      prevTestimonial();
      testimonialInterval = setInterval(nextTestimonial, 6000);
    });

    testimonialNextBtn.addEventListener("click", function () {
      clearInterval(testimonialInterval);
      nextTestimonial();
      testimonialInterval = setInterval(nextTestimonial, 6000);
    });
  }

  // Event listeners for the testimonial dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      clearInterval(testimonialInterval);
      showTestimonial(index);
      testimonialInterval = setInterval(nextTestimonial, 6000);
    });
  });

  // Full Menu Modal
  const fullMenuBtn = document.getElementById("full-menu-btn");
  const menuModal = document.getElementById("menuModal");
  const closeModal = document.querySelector(".close-modal");
  const modalBody = document.querySelector(".modal-body");

  if (fullMenuBtn && menuModal) {
    fullMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Create a complete menu inside the modal
      generateFullMenu();

      menuModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });

    closeModal.addEventListener("click", function () {
      menuModal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", function (e) {
      if (e.target === menuModal) {
        menuModal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Function to generate the full menu content
  function generateFullMenu() {
    const menuCategories = {
      starters: {
        title: "Starters",
        items: [
          {
            name: "Crispy Calamari",
            price: "$16",
            description:
              "Lightly fried with spiced marinara sauce and lemon aioli",
          },
          {
            name: "Burrata Salad",
            price: "$18",
            description:
              "Heirloom tomatoes, fresh basil, aged balsamic, extra virgin olive oil",
          },
          {
            name: "Tuna Tartare",
            price: "$22",
            description:
              "Sushi-grade tuna, avocado, cucumber, citrus soy dressing, crispy wonton",
          },
          // Continuing from where the code was cut off
          {
            name: "Truffle Arancini",
            price: "$17",
            description:
              "Risotto croquettes with black truffle and parmesan, served with truffle aioli",
          },
          {
            name: "Seasonal Soup",
            price: "$12",
            description: "Chef's daily preparation with artisanal bread",
          },
        ],
      },
      mains: {
        title: "Main Courses",
        items: [
          {
            name: "Herb Roasted Chicken",
            price: "$28",
            description:
              "Free-range chicken, garlic mashed potatoes, seasonal vegetables, natural jus",
          },
          {
            name: "Grilled Salmon",
            price: "$32",
            description:
              "Atlantic salmon, quinoa pilaf, roasted asparagus, lemon herb butter",
          },
          {
            name: "Beef Tenderloin",
            price: "$42",
            description:
              "8oz grass-fed beef, truffle potato puree, seasonal vegetables, red wine reduction",
          },
          {
            name: "Wild Mushroom Risotto",
            price: "$24",
            description:
              "Arborio rice, assorted wild mushrooms, white wine, parmesan, fresh herbs",
          },
          {
            name: "Seafood Linguine",
            price: "$34",
            description:
              "Shrimp, scallops, mussels, white wine garlic sauce, fresh herbs",
          },
        ],
      },
      sides: {
        title: "Sides",
        items: [
          {
            name: "Truffle Fries",
            price: "$10",
            description: "Hand-cut potatoes, truffle oil, parmesan, herbs",
          },
          {
            name: "Roasted Brussels Sprouts",
            price: "$9",
            description: "Crispy bacon, balsamic reduction",
          },
          {
            name: "Creamed Spinach",
            price: "$8",
            description: "Baby spinach, cream, nutmeg, parmesan crust",
          },
          {
            name: "Grilled Asparagus",
            price: "$10",
            description: "Extra virgin olive oil, lemon zest, sea salt",
          },
        ],
      },
      desserts: {
        title: "Desserts",
        items: [
          {
            name: "Chocolate Fondant",
            price: "$14",
            description:
              "Warm chocolate cake, vanilla bean ice cream, raspberry coulis",
          },
          {
            name: "Crème Brûlée",
            price: "$12",
            description: "Classic vanilla custard, caramelized sugar",
          },
          {
            name: "Seasonal Fruit Tart",
            price: "$13",
            description:
              "Shortbread crust, pastry cream, fresh seasonal fruits",
          },
          {
            name: "Artisanal Cheese Plate",
            price: "$18",
            description:
              "Selection of fine cheeses, dried fruits, nuts, artisanal crackers",
          },
        ],
      },
      drinks: {
        title: "Drinks",
        items: [
          {
            name: "Signature Cocktails",
            price: "$15-18",
            description: "Ask your server about our seasonal craft cocktails",
          },
          {
            name: "Premium Wines",
            price: "$12-16/glass",
            description: "Curated selection of old and new world wines",
          },
          {
            name: "Craft Beers",
            price: "$8-10",
            description: "Local and imported craft beers",
          },
          {
            name: "Non-Alcoholic",
            price: "$6-8",
            description:
              "House-made sodas, fresh juices, specialty coffee and tea",
          },
        ],
      },
    };

    // Build the menu HTML
    let menuHTML = "";

    for (const category in menuCategories) {
      const { title, items } = menuCategories[category];

      menuHTML += `
                <div class="menu-category">
                    <h3>${title}</h3>
                    <div class="menu-category-items">
            `;

      items.forEach((item) => {
        menuHTML += `
                    <div class="full-menu-item">
                        <div class="menu-item-header">
                            <h4>${item.name}</h4>
                            <span class="price">${item.price}</span>
                        </div>
                        <p>${item.description}</p>
                    </div>
                `;
      });

      menuHTML += `
                    </div>
                </div>
            `;
    }

    // Insert the menu into the modal
    if (modalBody) {
      modalBody.innerHTML = menuHTML;
    }
  }

  // Reservation Form Validation
  const reservationForm = document.getElementById("reservation-form");

  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const guests = document.getElementById("guests").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (!name || !email || !phone || !date || !time || !guests) {
        alert("Please fill all required fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Phone validation
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
        alert("Please enter a valid 10-digit phone number");
        return;
      }

      // If validation passes, show success message
      // In a real application, you would send this to a server
      alert(
        "Thank you for your reservation request! We will contact you shortly to confirm."
      );
      reservationForm.reset();
    });
  }

  // Newsletter Form Validation
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("newsletter-email").value;

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // If validation passes, show success message
      alert("Thank you for subscribing to our newsletter!");
      newsletterForm.reset();
    });
  }

  // Image Gallery Lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").getAttribute("src");
      const imgAlt = this.querySelector("img").getAttribute("alt");
      const title = this.querySelector(".gallery-info h3").textContent;
      const description = this.querySelector(".gallery-info p").textContent;

      // Create lightbox elements
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";

      lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <div class="lightbox-caption">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;

      // Add lightbox to the document
      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";

      // Close lightbox on click
      lightbox.addEventListener("click", function (e) {
        if (
          e.target === this ||
          e.target.classList.contains("close-lightbox")
        ) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = "auto";
        }
      });
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // AOS Animation Initialization (if AOS is included)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }

  // Add additional CSS for the lightbox
  const style = document.createElement("style");
  style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .lightbox img {
            max-width: 100%;
            max-height: 80vh;
            margin-bottom: 1rem;
        }
        
        .close-lightbox {
            position: absolute;
            top: -30px;
            right: 0;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .lightbox-caption {
            color: #fff;
            text-align: center;
        }
        
        .lightbox-caption h3 {
            margin-bottom: 0.5rem;
        }
        
        .full-menu-item {
            margin-bottom: 1.5rem;
        }
        
        .menu-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .menu-category {
            margin-bottom: 2rem;
        }
        
        .menu-category h3 {
            color: var(--primary-color);
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
        }
    `;

  document.head.appendChild(style);

  // Initialize the hero slider
  if (slides.length > 0) {
    showSlide(0);
  }

  // Initialize the testimonial slider
  if (testimonialSlides.length > 0) {
    showTestimonial(0);
  }
});
