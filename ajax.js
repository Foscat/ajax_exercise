
// 1) Get all posts
$("#getAll").on("click", function(){
    console.log("clicked");
    $.ajax({
        url: "http://jsonplaceholder.typicode.com/posts",
        method: "GET"
    }).then(function(res) {
        
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
        console.log(res)
    })
});

// 4) Get all the posts from user with id of 2
$("#get2").on("click", function api(){
    $.ajax({
        url:"http://jsonplaceholder.typicode.com/user/2/posts",
        method: "GET"
    }).then(function(res){
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
("#makeList").on("click", function(){
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
            console.log(res);
            var Ul = $("<ul>");
            var title = res.title;
            var body = res.body;
            var h1 = $("<h1>").text("Respective Title: " + title);
            var p = $("<p>").text(body);
            $(Div).append(h1, p);
            $("#apiDump").append(Div);
        })

    })
});
