// Function to fetch and render jobs
function fetchAndRenderJobs(searchTerm = '') {
  const url = searchTerm ? `/api/jobs?search=${encodeURIComponent(searchTerm)}` : '/api/jobs';
  fetch(url)
    .then(response => response.json())
    .then(jobs => {
      renderFeaturedJobs('jobs-container', jobs);
    })
    .catch(error => console.error('Error fetching jobs:', error));
}

// Render jobs in the specified container
function renderFeaturedJobs(containerId, jobs) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const jobsToShow = jobs.slice(0, 6);
  jobsToShow.forEach(job => {
    const jobElem = document.createElement('div');
    jobElem.classList.add('job');
    jobElem.innerHTML = `
      <section class="featured_card">
        <h3 class="card_body">${job.title}</h3>
        <p class="card_body"><strong>Company:</strong> ${job.company}</p>
        <p class="card_body"><strong>Location:</strong> ${job.location}</p>
        <p class="card_body"><strong>Salary:</strong> ${job.salary}</p>
        <button class="featured_btn" onclick="error()">Apply</button>
      </section>
    `;
    container.appendChild(jobElem);
  });
}

// Function to handle job application
function error(){
  const modal = document.getElementById("applyModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = 'You must be logged in to apply for a job!';
  modal.style.display = "block";

  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when the user clicks anywhere outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Function to setup search functionality
function setupSearchFunctionality() {
  const searchInput = document.getElementById('search');
  const searchButton = document.querySelector('.header_btn');

  const searchJobs = () => {
    const searchTerm = searchInput.value.toLowerCase();
    fetchAndRenderJobs(searchTerm);
  };

  searchInput.addEventListener('input', searchJobs);
  searchButton.addEventListener('click', searchJobs);
}

// Function to handle flash messages
function handleFlashMessages() {
  const flashModal = document.getElementById("flashModal");
  const closeBtn = flashModal.querySelector(".close");

  if (flashModal) {
    flashModal.style.display = "block";

    closeBtn.onclick = function() {
      flashModal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == flashModal) {
        flashModal.style.display = "none";
      }
    };
  }
}
// Call the function to fetch and render jobs when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderJobs();
  setupSearchFunctionality();
  handleFlashMessages();
});