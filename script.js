fetch("https://api.covid19api.com/summary")
  .then((res) => {
    if (!res.ok) {
      showError();
    } else {
      res.json().then((data) => {
        if (data.Message === "Caching in progress") {
          showError(data.Message);
        } else {
          console.log(data);
          document.querySelector("select").innerHTML = `
            <option value="World">World</option>
            ${data.Countries.map(
              (country) =>
                `<option value="${country.Country}">${country.Country}</option>`
            )}
          `;

          showContent(data.Global);

          document.querySelector("select").addEventListener("change", (e) => {
            const value = e.target.value;
            if (value === "World") {
              showContent(data.Global);
            } else {
              showContent(
                data.Countries.find((country) => country.Country === value)
              );
            }
          });
        }
      });
    }
  })
  .catch((err) => {
    console.log(err);
    showError();
  });

const showError = (message = "") => {
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".error").style.display = "flex";
  document.querySelector(".main").style.display = "none";
  if (message) {
    document.querySelector(
      ".error"
    ).innerText = `Failed to load data. "${message}"`;
  }
};

const showContent = (data) => {
  document.querySelector(".loading").style.display = "none";
  document.querySelector(".error").style.display = "none";
  document.querySelector(".main").style.display = "block";

  document.querySelector(".content").innerHTML = `
    <p>New Confirmed: ${data.NewConfirmed}. New Deaths: ${data.NewDeaths}. New Recovered: ${data.NewRecovered}</p>
    <p>Total Confirmed: ${data.TotalConfirmed}. Total Deaths: ${data.TotalDeaths}. Total Recovered: ${data.TotalRecovered}</p>
  `;
};
