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
// $("#signOut_Btn").hide();

// Find user and log in
$(document).on("submit", "form", function(event){
    console.log(event.target);
    // $("#signOut_Btn").show();
})