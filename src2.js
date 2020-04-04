document.getElementById("passwordInput").addEventListener("input", function(){
    if(document.getElementById("passwordInput").value === "littybop"){
        console.log("hello");
        document.getElementById("button-submit").style.display = "block";
    }
});