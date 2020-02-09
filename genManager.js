module.exports = {
  generateHTML (data) {
    return `<div class="col mb-4">
    <div class="card h-100 shadow rounded">
      <div class="card-header">
          <h2>${data.name}</h2>
          <h2><i class="fas fa-mug-hot"> </i> Manager</h2>
      </div>
      <div class="card-body">
      <h5 class="card-title border border-dark p-2">ID: ${data.id}</h5>
      <h5 class="card-title border border-dark p-2">Email: ${data.email}</h5>
      <h5 class="card-title border border-dark p-2">Ofice #: ${data.officeNumber}</h5>
      </div>
    </div>
  </div>`;
  },
};
