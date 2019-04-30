// Exercise 1 using ajax;

// 1) Get all posts
$("#getAll").on("click", function(){
    console.log("clicked");
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET"
    }).then(function(res) {
        $("#apiDump").empty();
        for(var i=0; i < res.length; i++){
            // console.log(res[i]);
            var div = $("<div class='border border-dark m-1 p-1'>")
            var h = $("<h3 class='border-bottom border-danger'>").text("ID: " + res[i].id + "\n Title: "+res[i].title);
            var p = $("<p>").text("Body: " + res[i].body);

            $(div).append(h,p);

            $("#apiDump").append(div);
        }
        console.log(res[9]);

    });
});

$("#get10post").on("click", function(){
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/10",
        method: "GET"
    }).then(function(res) {
        $("#apiDump").empty();

        div = $("<div class='border border-dark m-1 p-1'>")
        h = $("<h3 class='border-bottom border-danger'>").text("ID: " + res.id + "\n Title: "+res.title);
        p = $("<p>").text("Body: " + res.body);

        $(div).append(h,p);
        $("#apiDump").append(div);

    });
})


// 3) Get the comments from post with id of 12
$("#get12com").on("click", function api(){
    $.ajax({
        url:"https://jsonplaceholder.typicode.com/comments/?postId=12",
        method: "GET"
    }).then(function(res){
        console.log(res)
        $("#apiDump").empty();
        for(var i=0; i < res.length; i++){
            console.log(res[i]);
            div = $("<div class='border border-dark m-1 p-1'>")
            h = $("<h3 class='border-bottom border-danger'>").text("ID: " + res[i].id + "\n Title: "+res[i].name);
            var h2 = $("<h4>").text("Post Id: " + res[i].userId + "Emailed to: " + res[i].email);
            p = $("<p>").text("Body: " + res[i].body);

            $(div).append(h, h2,p);

            $("#apiDump").append(div);
        }
    })
});

// 4) Get all the posts from user with id of 2
$("#get2").on("click", function api(){
    $.ajax({
        url:"https://jsonplaceholder.typicode.com/posts?userId=2",
        method: "GET"
    }).then(function(res){
        $("#apiDump").empty();
        console.log(res);
        for(var i=0; i < res.length; i++){
            // console.log(res[i]);
            var div = $("<div class='border border-dark m-1 p-1'>")
            var h = $("<h3 class='border-bottom border-danger'>").text("ID: " + res[i].id + "\n Title: "+res[i].title);
            var p = $("<p>").text("Body: " + res[i].body);

            $(div).append(h,p);

            $("#apiDump").append(div);
        }
    })
});

// 5) Create a new post and log the id generated for it by the server
var data = { title: "CEO of K-Fizzle Enterprises", body: "It aint easy bein cheesy."}
$("#poster").on("click", function api(){
    $.ajax({
        url:"https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        data: data,
        success: true,
        
    }).then(function(res){
        $("#apiDump").empty();
        console.log(res.id)
        div = $("<div class='border border-dark m-1 p-1'>")
        h = $("<h3 class='border-bottom border-danger'>").text("Computer generated id: " + res.id + "\n Title: "+res.title);
        p = $("<p>").text("Body: " + res.body);

        $(div).append(h,p);
        $("#apiDump").append(div);
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
    // 7) Update the title field of the post with id of 12
    $.ajax({
        method: 'PATCH',
        url: 'https://jsonplaceholder.typicode.com/posts/12',
        data: {
        title: "patched it"
    },
        complete: function(res){
            $("#apiDump").empty();
            console.log(res.responseJSON);
            div = $("<div class='border border-dark m-1 p-1'>")
            h = $("<h3 class='border-bottom border-danger'>").text("ID: " + res.responseJSON.id + 
            "\n Title: "+res.responseJSON.title);
            p = $("<p>").text("Body: " + res.responseJSON.body);

            $(div).append(h,p);
            $("#apiDump").append(div);
        }
    })
});

// Delete the post with id of 12 and render a success message
$("#deletePosts").on("click", function(){
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/12",
        method: "DELETE"
    }).then(function(res){
        console.log(res);
        $("#apiDump").empty();
        $("#apiDump").append("<div class='jumbotron bg-info'><h1>You deleted it!!!!</h1></div>")
    })
});

// Display a list of posts.
// When the user clicks on a post, display all the comments from that post
// Display a link back to all posts
$(document).on("click", ".makeList", function(){
    $("#apiDump").empty();
    // One api call to see what is there originally
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET"
    }).then(function(res){
        for(var i=0; i < res.length; i++){
            // console.log(res[i]);
            var infolink =(
                '<button class="link btn btn-info" data-link="http://jsonplaceholder.typicode.com/posts?postId=' 
                + res[i].id + '/comments/">See Post history</button>');
            div = $("<div>")
            h1 = $("<h1>").text(res[i].title);
            p = $("<p>").text(res[i].body);

            $(div).append(h1,p,infolink);

            $("#apiDump").append(div);
        }
            // console.log(res);
    })
});

// This must be a document on click function since buttons are generated dynamically and are not present on inital load
// Good practice to do for all click functions so you to not have usesles click functions
$(document).on("click", ".link", function(){
    console.log(this)
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
            var h1 = $("<h2>").text(res[i].id + " Title: " + res[i].title);
            p = $("<p>").text(res[i].body);
            $(Div).append(h1, p);
            $("#apiDump").append(Div);
        }
        backButton =('<button class="makeList btn btn-primary" data-link="https://jsonplaceholder.typicode.com/posts">See all posts</button>');
        $("#apiDump").prepend(backButton);

    })
});
