/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
// ];


$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
  const  { user, content, created_at } = tweet;

    let $tweet = `
      <article class="tweet">
        <header>
          <div class="avatar-container">
            <img src=${escape(user.avatars)}
            ${user.avatars}
          </div>
          <span class="handle">${user.handle}</span>
        </header>
        <span class="user-tweet">${content.text}</span>
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
  // renderTweets(data);

  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: renderTweets
    });
  };

  loadTweets("/tweets", "GET", renderTweets);

  const handleSubmitRequest = function(text) {
    if (text.length > 140) {
      return alert("Error, this tweet is too long.");
    } else if (!text) {
      return alert("Error, your tweet can't be blank.");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: { text },
      })
        .done(function () {
          alert("Success!");
        })
        .fail(function () {
          alert("Error");
        })
        .always(function () {
          alert("Finished!");
        });
    }
  };

  $("form").on("submit", function(event) {
    event.preventDefault();
    $(this).serialize();
    // console.log($(this).serialize());
    handleSubmitRequest($("textarea").val());
  });
});
