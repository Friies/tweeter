/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
];


$(document).ready(function() {
  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
    $("#tweet").append($tweet);
    }
  }
  
  const createTweetElement = function(tweet) {
  const  { user, content, created_at } = tweet;

    let $tweet = `
      <article class="tweet">
        <header>
          <div class="avatar">
            ${user.avatars}
          </div>
          <span class="name">${user.name}</span>
          <span class="handle">${user.handle}</span>
        </header>
        <span class="user-tweet">${content.text}</span>
        <span class="creation-date">${created_at}</span>
        <footer>
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
  renderTweets(data);  
});
