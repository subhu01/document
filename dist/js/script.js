
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const cols = document.querySelectorAll(".col");

    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();

      // Loop through each .col
      cols.forEach(function (col) {
        const cardName = col.querySelector(".card").getAttribute("data-card-name").toLowerCase();

        // Check if the data-card-name contains the search term
        const cardMatchesSearch = cardName.includes(searchTerm);

        // Show or hide the .col based on the search result
        col.style.display = cardMatchesSearch ? "block" : "none";
      });

      centerVisibleCards();
    });
  });

