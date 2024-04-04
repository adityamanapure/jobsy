// Sample data for featured jobs
const fc = [
  { title: 'Senior Software Engineer', company: 'Google', location: 'Delhi', salary: '$120,000 - $150,000' },
  { title: 'Digital Marketing Specialist', company: 'Amazon', location: 'New York, NY', salary: '$80,000 - $100,000' },
  { title: 'Graphic Designer', company: 'Facebook', location: 'Mumbai', salary: '$60,000 - $80,000' },
  { title: 'Product Manager', company: 'Microsoft', location: 'Amravati', salary: '$110,000 - $130,000' },
  { title: 'Data Analyst', company: 'Netflix', location: 'Bengluru', salary: '$70,000 - $90,000' },
  { title: 'Frontend Developer', company: 'Apple', location: 'San Francisco, CA', salary: '$100,000 - $120,000' },
  { title: 'Backend Developer', company: 'Tesla', location: 'Palo Alto, CA', salary: '$110,000 - $140,000' },
  { title: 'Full Stack Developer', company: 'IBM', location: 'Austin, TX', salary: '$90,000 - $110,000' },
  { title: 'Data Scientist', company: 'Adobe', location: 'San Jose, CA', salary: '$120,000 - $150,000' },
  { title: 'UX Designer', company: 'Spotify', location: 'Stockholm', salary: '$70,000 - $90,000' },
  { title: 'DevOps Engineer', company: 'Oracle', location: 'Redwood City, CA', salary: '$110,000 - $130,000' },
  { title: 'Project Manager', company: 'Intel', location: 'Santa Clara, CA', salary: '$100,000 - $120,000' },
  { title: 'Quality Assurance Engineer', company: 'Cisco', location: 'San Jose, CA', salary: '$80,000 - $100,000' },
  { title: 'Security Analyst', company: 'HP', location: 'Palo Alto, CA', salary: '$90,000 - $110,000' },
  { title: 'Systems Administrator', company: 'Dell', location: 'Round Rock, TX', salary: '$70,000 - $90,000' },
  { title: 'Network Engineer', company: 'Lenovo', location: 'Morrisville, NC', salary: '$80,000 - $100,000' },
  { title: 'Database Administrator', company: 'Asus', location: 'Taipei', salary: '$70,000 - $90,000' },
  { title: 'IT Manager', company: 'Acer', location: 'New Taipei City', salary: '$90,000 - $110,000' },
  { title: 'Technical Support Specialist', company: 'Logitech', location: 'Lausanne', salary: '$60,000 - $80,000' },
  { title: 'Web Developer', company: 'Mozilla', location: 'Mountain View, CA', salary: '$80,000 - $100,000' }
];



// Render featured jobs
renderJobs('fc', fc);




// Function to render job listings
function renderJobs(containerId, jobs) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  jobs.slice(0,6).forEach(job => {
    const jobElem = document.createElement('div');
    jobElem.classList.add('job');
    jobElem.innerHTML = `
    <section class="featured_card">
      <h3 class="card_body">${job.title}</h3>
      <p class="card_body"><strong>Company:</strong> ${job.company}</p>
      <p class="card_body"><strong>Location:</strong> ${job.location}</p>
      <p class="card_body"><strong>Salary:</strong> ${job.salary}</p>
      <button class="featured_btn" onclick="alert('You have applied for the ${job.title} position at ${job.company}.')">Apply Now</button>
      </section>
      `;
      
      // Add the job element to the container
     
      container.appendChild(jobElem);
   
   
  });
}


window.onload = function() {
  const searchButton = document.querySelector('.header_btn');
  const searchInput = document.querySelector('#search');

  searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const searchTerm = searchInput.value;
    performSearch(searchTerm);
  });
}

function performSearch(searchTerm) {
  // Convert the search term to lowercase for case-insensitive search
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  // Filter the jobs based on the search term
  const filteredJobs = fc.filter(job =>
    job.title.toLowerCase().includes(lowerCaseSearchTerm) ||
    job.company.toLowerCase().includes(lowerCaseSearchTerm) ||
    job.location.toLowerCase().includes(lowerCaseSearchTerm)
  );

  // Render the filtered jobs
  renderJobs('fc', filteredJobs);
}










