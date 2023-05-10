$(document).ready(function() {
  
  let textarea = $("textarea");

  textarea.on("input", function() {
    const NumOftweets = 140 - $(this).val().length;


    $(".counter").html(`${NumOftweets}`)

    if (NumOftweets < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149")
    }
  });
});