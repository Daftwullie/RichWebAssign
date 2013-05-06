Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  var MAX_CHARS = 200;

  Template.compose.events({
    'submit form': function (event) {
      var $body = $('#question-body');
      event.preventDefault();

      Questions.insert({
        body: $body.val(),
        created_at: Date()
      });
      $body.val('');
      $('#remaining').html(MAX_CHARS);
      window.alert("Question Submited"); 
    },

    'keyup #question-body': function() {
      $('#remaining').html(MAX_CHARS - $('#question-body').val().length);
    }
  });
/////////
 Template.list.selected = function () {
 return Session.equals("selected_question", this._id) ? "selected" : '';
 };
////////

  Template.list.events({
    'click': function() { 
     Session.set("selected_question", this._id)
     Questions.update(Session.get("selected_question"), {$inc: {upvote: 1}});
     window.alert("Question Up-Voted");    
   }
  });

  //Template.list.questions = Questions.find({}, {sort: {created_at: -1}});
  Template.list.questions = Questions.find({}, {sort: {upvote: -1}});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	//Questions.insert({upvote: 0});
  });
}
