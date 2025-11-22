// Load countries into homepage
async function loadCountries(targetId) {
  const container = document.getElementById(targetId);
  const response = await fetch("countries.json");
  const countries = await response.json();

  countries.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.name;
    btn.onclick = () => {
      window.location.href = `country.html?country=${c.code}`;
    };
    container.appendChild(btn);
  });
}

// Load individual country page
async function loadCountryPage() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("country");

  const response = await fetch("countries.json");
  const countries = await response.json();

  const country = countries.find(c => c.code === code);

  if (!country) {
    document.getElementById("content").innerHTML = "<h2>Country not found.</h2>";
    return;
  }

  document.getElementById("countryName").innerText = country.name;
  document.getElementById("embassyLink").href = country.embassy;
  document.getElementById("embassyLink").innerText = `U.S. Embassy in ${country.name}`;
}
