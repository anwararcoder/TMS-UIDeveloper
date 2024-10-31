document.addEventListener("DOMContentLoaded", function () {
  // Add 'active' class to the navbar when the content-area is scrolled past 50px
  const contentArea = document.querySelector(".content-area");
  const navbar = document.querySelector(".navbar");

  contentArea.addEventListener("scroll", function () {
    if (contentArea.scrollTop > 50) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
  });

  // Open & Close aside-nav
  document.querySelectorAll(".toggle-sidebar").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".sidebar").classList.toggle("active");
      document.querySelector(".content-area").classList.toggle("active");
    });
  });

  // Links Box
  document.querySelectorAll(".accordion").forEach((accordion) => {
    const headers = accordion.querySelectorAll(".header");

    headers.forEach((header) => {
      const linkHref = header.querySelector(".link-href");
      const collapse = header.querySelector(".collapse");

      if (linkHref && collapse) {
        linkHref.addEventListener("click", function (event) {
          event.preventDefault();

          const isOpen = collapse.classList.contains("open");

          // Close all open collapses in this accordion
          accordion.querySelectorAll(".collapse").forEach((item) => {
            item.classList.remove("open");
          });
          accordion.querySelectorAll(".header").forEach((item) => {
            item.classList.remove("open");
          });

          // Toggle the clicked link's collapse
          if (!isOpen) {
            collapse.classList.add("open");
            header.classList.add("open");
          }
        });
      }
    });
  });

  // Open Modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    const closeBtn = modal.querySelectorAll(".close-btn");
    closeBtn.forEach((item) => {
      item.addEventListener("click", () => closeModal(modal));
      window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });
  }

  // Close Modal
  function closeModal(modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    const modalId = btn.getAttribute("data-modal");
    btn.addEventListener("click", () => openModal(modalId));
  });

  // Make AR-Tabs
  document.querySelectorAll(".tab-container").forEach(function (container) {
    var tabs = container.querySelectorAll(".tab");
    var contents = container.querySelectorAll(".ar-box-content");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (tab) {
          tab.classList.remove("active");
        });
        this.classList.add("active");

        var val = this.getAttribute("data-filterTab");
        contents.forEach(function (content) {
          content.classList.add("tab-hide");
          if (content.getAttribute("data-filterTab") === val || val === "all") {
            content.classList.remove("tab-hide");
          }
        });
      });
    });
  });

  // Make Dropdown
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const menu = dropdown.querySelector(".dropdown-menu");

    button.addEventListener("click", () => {
      const isActive = menu.classList.contains("active");

      // Close all dropdown menus and remove "active" class from all buttons
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("active");
      });
      document.querySelectorAll(".dropdown button").forEach((button) => {
        button.classList.remove("active");
      });

      if (!isActive) {
        menu.classList.add("active");
        button.classList.add("active"); // Add "active" class to the clicked button
      }
    });
  });

  // Close dropdown if clicked outside
  window.addEventListener("click", (e) => {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.querySelector(".dropdown-menu").classList.remove("active");
        dropdown.querySelector("button").classList.remove("active"); // Remove "active" class when closing the dropdown
      }
    });
  });
});
