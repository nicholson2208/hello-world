var config = {
  apiKey: 'AIzaSyAeKg7zv44LoELkQzHx9xj-qYkkbwDsl90',
  databaseURL: 'https://firechat-36050.firebaseio.com'
};
firebase.initializeApp(config);

var database = firebase.database();
var messagesRef = database.ref('messages/');

var messageText = $('#message');
var taskTime = $('#time_it_will_take');
var sendButton = $('#send');
var messageList = $('#message-list');


sendButton.click(function () {
  messagesRef.push({
    text: messageText.val() || 'yo',
    time: firebase.database.ServerValue.TIMESTAMP,
    task_duration: taskTime.val() || 60
  }).then(function () {
    messageText.val('');
  });
});

// messagesRef.once('value').then(function (snapshot) {
//   var messages = snapshot.val();
//   for (var key in messages) {
//     showMessage(messages[key]);
//   }
// });

messagesRef.on('child_added', function (snapshot) {
    showMessage(snapshot.val());
});

function showMessage(msg) {
  messageList.append($('<li>' + msg.text +'<div class="onoffswitch">  <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>  <label class="onoffswitch-label" for="myonoffswitch">   <span class="onoffswitch-inner"></span>    <span class="onoffswitch-switch"></span>    </label></div>')); //reconfig this to make it so its a checkbox 
}
