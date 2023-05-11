/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const escape = function(string) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(string));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
  const  { user, content, created_at } = tweet;

    let $tweet = `
      <article class="tweet">
        <header>
          <div class="avatar-container">
            <img src=${escape(user.avatars)}
            <span class="name">${escape(user.name)}</span>            
            ${user.avatars}
          </div>
          <span class="handle">${escape(user.handle)}</span>
        </header>
        <span class="user-tweet">${escape(content.text)}</span>
        <footer>
          <span class="creation-date">${timeago.format(created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-sharp fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
    return $tweet;
  };

// Fetches the Tweets
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: renderTweets
    });
  };

  loadTweets("/tweets", "GET", renderTweets);

  // const handleSubmitRequest = function (text) {
  const formReset = function () {
    document.getElementById("tweet-form").reset();
  };
    ${"form"}.on("submit", function (event) {
      event.preventDefault();
      const text = $("textarea").length;
      
    if (text.length > 140) {
      return alert("Error, this tweet is too long.");
    } else if (!text) {
      return alert("Error, your tweet can't be blank.");
    } else {
      let serializedData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/tweets",
      data: serializedData,
    })
      .done(function () {
        alert("Success!");
        formReset();
      })
      .fail(function () {
        alert("Error");
      })
      .always(function () {
        console.log("Finished!")
      });

    loadTweets();
    }
  });
});
