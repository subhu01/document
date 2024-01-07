
$(document).ready(function () {
  let progressTimeout;

  // Function to show the image and fill the progress bar
  function showImage(imageSrc) {
    // Reset the progress bar
    $("#progress-bar").width("0%").attr("aria-valuenow", 0);

    // Set the image source dynamically based on the button clicked
    $("#modal-image").attr("src", imageSrc);
    $("#myModal").modal("show");

    // Set the duration for displaying the image and filling the progress bar (in milliseconds)
    const duration = 6000;
    const interval = 50; // Update the progress bar every 50 milliseconds

    let currentProgress = 0;

    // Update the progress bar
    const updateProgressBar = () => {
      currentProgress += (interval / duration) * 100;
      $("#progress-bar")
        .width(currentProgress + "%")
        .attr("aria-valuenow", currentProgress);

      if (currentProgress < 100) {
        progressTimeout = setTimeout(updateProgressBar, interval);
      } else {
        // Hide the modal when progress is complete
        $("#myModal").modal("hide");
      }
    };

    // Initial call to updateProgressBar
    progressTimeout = setTimeout(updateProgressBar, interval);
  }

  // Attach the showImage function to all buttons with the "view-button" class
  $(".view-button").on("click", function () {
    // Clear the previous timeout to prevent it from interfering with the new one
    clearTimeout(progressTimeout);

    const imageSrc = $(this).data("src");
    showImage(imageSrc);
  });

  // Reset the progress bar when the modal is closed
  $("#myModal").on("hide.bs.modal", function () {
    // Clear the timeout when the modal is closed
    clearTimeout(progressTimeout);

    // Reset the progress bar
    $("#progress-bar").width("0%").attr("aria-valuenow", 0);
  });
});
