

$(document).ready(function () {
  var num1, num2;
  var captchaValue;

  // Function to generate a simple arithmetic captcha
  function generateCaptcha() {
    num1 = Math.floor(Math.random() * 100) + 1; // Random number 1-100
    num2 = Math.floor(Math.random() * 100) + 1; // Random number 1-100
    captchaValue = num1 + num2; // Store the correct answer
    return "What is " + num1 + " + " + num2 + " = ?";
  }

  // Function to update the captcha
  function updateCaptcha() {
    var captchaContainer = $("#captchaContainer");
    captchaContainer.text(generateCaptcha());
  }

  // Function to check the captcha value
  function checkCaptcha(answer) {
    return parseInt(answer) === captchaValue;
  }

  // Function to verify the captcha
  window.verifyCaptcha = function () {
    var captchaInput = $("#captchaInput");
    var verifyButton = $("#verifyButton");
    var downloadLink = $("#downloadLink");

    if (checkCaptcha(captchaInput.val())) {
      $('.loader-container').show();
    setTimeout (()=>{
      $('.loader-container').hide();
    },2000)
      // If captcha is correct, hide verify button and show download button
      verifyButton.hide();
      downloadLink.show();
    } else {
      alert("Captcha verification failed. Please try again.");
      // If captcha is incorrect, reset captcha, show a new one, and clear the input field
      updateCaptcha();
      captchaInput.val("");
    }
  };

  // Function to trigger the download based on the selected file
  window.downloadFile = function () {
    var fileName = $("#downloadLink").attr("data-file");
    var filePath = "/dist/img/document/" + fileName; // Replace with the actual path

    // Create a temporary link element
    var link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;

    // Trigger a click on the link to start the download
    link.click();
  };

  // Execute when the modal is shown
  $("#pdfModal").on("shown.bs.modal", function (event) {
    // Get the button that triggered the modal
    var button = $(event.relatedTarget);

    // Update the data-file attribute of the download button
    $("#downloadLink").attr("data-file", button.data("file"));

    updateCaptcha();
  });

  // Execute when the captcha input changes
  $("#captchaInput").on("input", function () {
    // Nothing to do here for the current implementation
  });

  // Execute when the modal is hidden
  $("#pdfModal").on("hidden.bs.modal", function () {
    // Reset captcha on modal close
    updateCaptcha();
    $("#captchaInput").val(""); // Clear input

    // Show verify button and hide download button
    $("#verifyButton").show();
    $("#downloadLink").hide();
  });
});
