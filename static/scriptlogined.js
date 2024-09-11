// Function to fetch and render jobs
function fetchAndRenderJobs(searchTerm = '') {
  const url = searchTerm ? `/api/jobs?search=${encodeURIComponent(searchTerm)}` : '/api/jobs';
  fetch(url)
    .then(response => response.json())
    .then(jobs => {
      renderFeaturedJobs('jobs-container', jobs);
      setupSearchFunctionality(jobs);
    })
    .catch(error => console.error('Error fetching jobs:', error));
}

// Function to render jobs in the specified container
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
        <button class="featured_btn" onclick="applyForJob('${job.title}', '${job.company}')">Apply</button>
      </section>
    `;
    container.appendChild(jobElem);
  });
}

// Function to handle job application
function applyForJob(jobTitle, company) {
  const modal = document.getElementById("applyModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = `Applied for Position ${jobTitle} at ${company} Successfully!`;
  modal.style.display = "block";
}

// Function to show error in modal
function showErrorModal(errorMessage) {
  const modal = document.getElementById("applyModal");
  const modalMessage = document.getElementById("modalMessage");
  modalMessage.textContent = `Error: ${errorMessage}`;
  modal.style.display = "block";
}

// Get the modal
var modal = document.getElementById("applyModal");
var span = document.getElementsByClassName("close")[0];
if (span) {
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Function to setup search functionality
function setupSearchFunctionality(jobs) {
  const searchInput = document.getElementById('search');
  const searchButton = document.querySelector('.header_btn');

  const searchJobs = () => {
    const searchTerm = searchInput.value.toLowerCase();
    fetchAndRenderJobs(searchTerm);
  };

  searchInput.addEventListener('input', searchJobs);
  searchButton.addEventListener('click', searchJobs);
}

// Call the function to fetch and render jobs when the page loads
document.addEventListener('DOMContentLoaded', () => fetchAndRenderJobs());