//Window Methods / Objects / Propperties

//Alert
//window.alert("Hello World");
//alert("Hello World");

//Prompt
// const input = prompt();
// alert(input);

//Confirm
// if (confirm("Are you sure")) {
//   console.log("YES");
// } else {
//   console.log("No");
// }

let val;

//Outer Height and Width
val = window.outerHeight;
val = window.outerWidth;
//Inner Height and Width
val = window.innerHeight;
val = window.innerWidth;

//Scrollpoints (Helps to know where you're at at scrolling to show the animation)
val = window.scrollY;
val = window.scrollX;

//Location Object
val = window.location;
val = window.location.hostname;
val = window.location.port;
val = window.location.href;
val = window.location.search; //Outputs everything that comes after the ? in the address bar

//Redirect
//window.location.href= "http://google.com/";
//Reload
// window.location.reload();

//History Object

// window.history.go(+1);  //Jump back or forth like with the back button
val = window.history.length;

//Navigator
val = window.navigator;
val = window.navigator.appName;
val = window.navigator.appVersion;
val = window.navigator.userAgent;
val = window.navigator.platform;
val = window.navigator.vendor;
val = window.navigator.language;

console.log(val);