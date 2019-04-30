// Exercise 2 using fetch;

// Exapmle fetch with promise
// fetch('http://jsonplaceholder.typicode.com/todos/1')
//   .then(function(response) {
//     return response.json();
//   }).then(function(data) {
//   console.log(data);
//   }).catch(function() {
//   console.log("Booo");
// });

$("#signOut_Btn").hide();

// When the user inputs a name it does something
$(document).on("submit", "form", function(event){

    event.preventDefault();
    $("#signOut_Btn").show();

    var name = event.target.username.value;

    if(name === "Bret") {name = 1}
    if(name === "Antonette"){name = 2}
    if(name === "Samantha"){name = 3}
    if(name === "Karianne"){name = 4}
    if(name === "Kamren"){name = 5}
    if(name === "Leopoldo_Corkery"){name = 6}
    if(name === "Elwyn.Skiles"){name = 7}
    if(name === "Maxime_Nienow"){name = 8}
    if(name === "Delphine"){name = 9}
    if(name === "Moriah.Stanton"){name = 10}
    console.log(name);

    $.ajax({
        url: "http://jsonplaceholder.typicode.com/users/" + name,
        method: "GET"

    }).then((res) => {
        console.log(res);

        var div = $("<div class='border p-3 border-dark'>")
        var welcome = $("<h3>").text("Welcome back! " + res.name);
        var email = $("<h5>").text("Your primary email is: " + res.email);
        var phone = $("<h5>").text("Your primary phone number is: " + res.phone);
        var website = $("<a href=" + res.website + ">Link to website</a>");
        var albumsLink = $("<button class='m-2 albumLink' type='button' data-link='http://jsonplaceholder.typicode.com/users/" + res.id + "/albums/?userId=" + res.id + "'>").text("albums");
        var postTitleLink = $("<button class='m-2 titleLink' type='button' data-link='http://jsonplaceholder.typicode.com/users/" + res.id + "/posts/?userId=" + res.id + "'>").text("titles")
        $(div).append(welcome, email, phone, website,albumsLink, postTitleLink);
        $("#signedIn").append(div);

    }).catch((err) => {
        console.error(err);
        $("#signOut_Btn").hide();
        alert("Your input did not match any usernames!!! \n Try again.");
    })
    
});

// Too see a users albums listed
$(document).on("click", ".albumLink", function(){
    var link = $(this).data("link");
    console.log(link);
    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        console.log(res);
        $("#apiDump").empty();

        for(var i=0; i < res.length; i++){
            div = $("<div>");
            var h = $("<h4>").text("Album title: " + res[i].title);
            $(div).append(h);
            $("#apiDump").append(div);
        }

    })

});

// See post titles
$(document).on("click", ".titleLink", function(){
    link = $(this).data("link");
    console.log(link);
    $.ajax({
        url: link,
        method: "GET"
    }).then(function(res){
        console.log(res);
        $("#apiDump").empty();

        for(var i=0; i < res.length; i++){
            div = $("<div>");
            var h = $("<h4>").text("Album title: " + res[i].title);
            $(div).append(h);
            $("#apiDump").append(div);
        }

    })
    
})

$(document).on("click", "#signOut_Btn", function(){
    $("#signedIn").empty();
    $("#apiDump").empty();
    $("#signOut_Btn").hide();
})
