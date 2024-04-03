// Sample data for featured jobs
const fc = [
  { title: 'Senior Software Engineer', company: 'XYZ Corp', location: 'Delhi', salary: '$120,000 - $150,000' },
  { title: 'Digital Marketing Specialist', company: 'Marketing Pro', location: 'New York, NY', salary: '$80,000 - $100,000' },
  { title: 'Graphic Designer', company: 'Creative Studios', location: 'Mumbai', salary: '$60,000 - $80,000' },
  { title: 'Product Manager', company: 'Tech Innovators', location: 'Amravati', salary: '$110,000 - $130,000' },
  { title: 'Data Analyst', company: 'Data Insights', location: 'Bengluru', salary: '$70,000 - $90,000' }
];

// Sample data for trending companies
const trendingCompanies = [
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook',
  'Netflix', 'Tesla', 'SpaceX', 'Uber', 'Airbnb'
];

// Render featured jobs
renderJobs('fc', fc);

// Render trending companies
renderTrendingCompanies('trending-Companies', trendingCompanies);

// Function to render job listings
function renderJobs(containerId, jobs) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  jobs.forEach(job => {
    const jobElem = document.createElement('div');
    jobElem.classList.add('job');
    jobElem.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
    `;

    const button = document.createElement('button');
    // Set the button text
    button.textContent = 'Apply Now';
    // Add the button to the job element
    jobElem.appendChild(button);
    // Add the job element to the container
   
    container.appendChild(jobElem);
  });
}

// Function to render trending companies
function renderTrendingCompanies(containerId, companies) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  companies.forEach(company => {
    const companyElem = document.createElement('div');
    companyElem.classList.add('company');
    companyElem.textContent = company;
    container.appendChild(companyElem);
  });
}




const searchInput = document.getElementById('search');

// Rest of your code...

// Event listener for search input
searchInput.addEventListener('input', filterJobs);

function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm) ||
    job.company.toLowerCase().includes(searchTerm) ||
    job.location.toLowerCase().includes(searchTerm) ||
    job.category.toLowerCase().includes(searchTerm)
  );
  // Assuming your jobs container has an id of 'jobs'
  renderJobs('jobs', filteredJobs);
}