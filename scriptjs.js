/*

Show the goats, allow users to vote by click, after x clicks show the reults as a list.


define global variable goatsArray = [];

Goat : Define a constructor ( for the goat image)
  - liveClicks : keep track of clicks
  - imgName : 'Floating Goat'
  - imgSrc : 'floating-goat.jpg'
  - push 'this' into goatsArray
  - TODO: lifeTimeClicks: clicks from past iterations

Instantiate goat objects

Goat.prototype.renderGoat(): Render a goat to the page ( so that it can be clicked on)
  - with text (p)
  - with an alt attribute for alt text (name)
  - target a ul
  - make a list item
  - make an image - give it src and alt
  - append to the li
  - make a p tag /w text (of name)
  - append it to li
  - append li to ul
  - TODO: add an id that references the goat instance in the js       - goatName [];

Event listener on the img tags with type click and an event handler
Event handler:
  - add 1 to the clicks of the goat image we clicked on
  - TODO: check if image's src attribute matches the obj
  - showClicks
  - display 2 new goat images (displayGoats())

displayGoats(): display 2 new goat iamges
  - pick 2 goats - randomly based on array indexes
  - make the first two disappear, reset the content.
  - display them(renderGoat():)

showClicks() :Show clicks per goat, live (live || after x clicks)
  - Show each click in a list
  - use the constuctor's instances for the info

CSS:
  - Set all image height and width the same

HTML:
  - 

TODO: on day 13 we will differentiate between live clicks and stored clicks.
*/