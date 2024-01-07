
$(document).ready(function () {
  $("#searchInput").on("input", function () {
    var searchTerm = $(this).val().toLowerCase();
    var noMatchMessage = $("#noMatchMessage");

    $(".card").each(function () {
      var card = $(this);
      var cardName = card.data("card-name").toLowerCase();
      var containsTerm = cardName.includes(searchTerm);

      // Show or hide the card based on the search result
      if (containsTerm) {
        card.show();
        noMatchMessage.hide();
      } else {
        card.hide();
      }
    });

    // Show or hide the "No Match" message based on search results
    if ($(".card:visible").length === 0) {
      noMatchMessage.show();
    } else {
      noMatchMessage.hide();
    }
  });
});
