
// 1) Get all posts
$("#getAll").on("click", function(){
    console.log("clicked");
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts",
        method: "GET"
    }).then(function(res) {
        $("#apiDump").empty();
        console.log(res);
        // 2) Get post with id of 10
        console.log(res[9]);

    });
});


// 3) Get the comments from post with id of 12
$("#get12com").on("click", function api(){
    $.ajax({
        url:"http://jsonplaceholder.typicode.com/post/12/comments",
        method: "GET"
    }).then(function(res){
        $("#apiDump").empty();
        console.log(res)
    })
});

// 4) Get all the posts from user with id of 2
$("#get2").on("click", function api(){
    $.ajax({
        url:"http://jsonplaceholder.typicode.com/user/2/posts",
        method: "GET"
    }).then(function(res){
        $("#apiDump").empty();
        console.log(res)
    })
});

// 5) Create a new post and log the id generated for it by the server
var data = {userId: 69, title: "CEO of K-Fizzle Enterprises", body: "It aint easy bein cheesy."}
$("#poster").on("click", function api(){
    $.ajax({
        url:"http://jsonplaceholder.typicode.com/posts",
        method: "POST",
        data: data,
        success: true,
        
    }).then(function(res){
        $("#apiDump").empty();
        console.log(res.id)
    })
    // Test to see of i can get my post back as a get. **TLDR It doesnt come back as anything
    // .then(function(res){
    //     console.log(res)
    //     $.ajax({
    //         url: "http://jsonplaceholder.typicode.com/posts",
    //         method: "GET"
    //     }).then(function(res1){
    //         console.log(res1)
    //     })
    // })
});

// Replace the post with id of 12 and render the responseJSON
$("#replacePost").on("click", function(){
    // One api call to see what is there originally
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts/12",
        method: "GET"
    }).then(function(res){
        console.log("First response", res);

        // Second api cal that posts to you can see what is now there
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/posts/12",
            method: "PUT",
            data: data
        }).then(function(res){
            $("#apiDump").empty();
            console.log(res);
            var Div = $("<div>");
            var title = res.title;
            var body = res.body;
            var h1 = $("<h1>").text("Respective Title: " + title);
            var p = $("<p>").text(body);
            $(Div).append(h1, p);
            $("#apiDump").append(Div);
        })

    })
});

// Delete the post with id of 12 and render a success message
$("#deletePosts").on("click", function(){
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts/12",
        method: "DELETE"
    }).then(function(res){
        console.log(res);
        $("#apiDump").empty();
        $("#apiDump").append("You deleted it!!!!")
    })
});

// Display a list of posts.
// When the user clicks on a post, display all the comments from that post
// Display a link back to all posts
$(document).on("click", ".makeList", function(){
    $("#apiDump").empty();
    // One api call to see what is there originally
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts",
        method: "GET"
    }).then(function(res){
        for(var i=0; i < res.length; i++){
            // console.log(res[i]);
            var infolink =('<button class="link btn btn-info" data-link="http://jsonplaceholder.typicode.com/posts/' + res[i].id + '/comments">See Post history</button>');
            var div = $("<div>")
            var h1 = $("<h1>").text(res[i].title);
            var p = $("<p>").text(res[i].body);

            $(div).append(h1,p,infolink);

            $("#apiDump").append(div);
        }
            // console.log(res);
    })
});

// This must be a document on click function since buttons are generated dynamically and are not present on inital load
// Good practice to do for all click functions so you to not have usesles click functions
($(document).on("click", ".link", function(){
    var postLink = $(this).data("link");
    console.log(postLink);
    $("#apiDump").empty();
    $.ajax({
        url:postLink,
        method:"GET",
    }).then(function(res){
        console.log(res);
        for(i=0; i<res.length; i++){
            Div = $("<div>");
            var h1 = $("<h2>").text(res[i].postId + " To: " + res[i].name);
            p = $("<p>").text(res[i].body);
            var email = $("<h3>").text(res[i].email)
            $(Div).append(h1, email, p);
            $("#apiDump").append(Div);
        }
        backButton =('<button class="makeList btn btn-primary" data-link="http://jsonplaceholder.typicode.com/posts">See Post history</button>');
        $("#apiDump").prepend(backButton);

    })
}))