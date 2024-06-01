/*making navbar responsive*/
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }
  
  function closeDropdownMenu() {
    dropdown.forEach((drop) => {
      drop.classList.remove("active");
      drop.addEventListener("click", (e) => e.stopPropagation());
    });
  }
  
  function toggleHamburger() {
      navMenu.classList.toggle("show");
      hamburgerBtn.setAttribute(
          "aria-expanded",
          hamburgerBtn.getAttribute("aria-expanded") === "false" ? "true" : "false"
      );
  }
  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
      console.log(dropdownElement);
    });
  });
  dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
  
      dropdownElement.classList.toggle("active");
      dropdown.forEach((drop) => {
        if (drop.id !== btn.dataset["dropdown"]) {
          drop.classList.remove("active");
        }
      });
      e.stopPropagation();
    });
  });
  btn.setAttribute(
    "aria-expanded",
    btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
);
// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);
hamburgerBtn.addEventListener("click", toggleHamburger);

function uploadImages() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput.files;
  if (files.length === 0) {
    alert('Please select at least one image.');
    return;
  }
  // Only the owner can upload images (for demonstration purpose, using a hardcoded owner ID)
  const ownerId = 'owner123';
  // Check if the uploader is the owner
  const uploaderId = prompt('Please enter your ID:');
  if (uploaderId !== ownerId) {
    alert('You are not authorized to upload images.');
    return;
  }
  const imageContainer = document.getElementById('imageContainer');
  // Loop through selected files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please select only images.');
      continue;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
      // Create image preview
      const imagePreview = document.createElement('div');
      imagePreview.classList.add('image-preview');
      const img = document.createElement('img');
      img.src = event.target.result;
      imagePreview.appendChild(img);
      imageContainer.appendChild(imagePreview);
    }
    reader.readAsDataURL(file);
  }
}