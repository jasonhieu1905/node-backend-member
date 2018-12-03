$(document).ready(function () {

    $("#register-form").submit(function () {
        var name = $("#username").val();
        var password = $("#password").val();
        var cpassword = $("#cpassword").val();
        if (name == '' || password == '' || cpassword == '') {
            alert("Please fill all fields...!!!!!!");
            return false;
        } else if ((password.length) < 6 || (name.length < 6)) {
            alert("Fields should atleast 6 character in length...!!!!!!");
            return false;
        } else if (!(password).match(cpassword)) {
            alert("Your passwords don't match. Try again?");
            return false;
        } else {
            const member = {
                username: name,
                password: password
            }
            $.ajax({
                url: "register",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(member),
                success: function(result){
                    alert("Create user successfully ...");
                    $('#switch-to-login').click();
                },
                error: function(err) {
                    alert("Error when creating new user: " + err.responseText);
                }
            });
            return false;
        }
    });

    $("#login-form").submit(function() {
        var name = $("#username-login").val();
        var password = $("#password-login").val();
        if (name == '' || password == '') {
            alert("Please fill all fields...!!!!!!");
            return false;
        }
        const member = {
            username: name,
            password: password
        }
        $.ajax({
            url: "login",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(member),
            success: function(result){                
                alert("Login successfully ...");
                localStorage.setItem("member", JSON.stringify(result));
                window.location.href = "/member";
            },
            error: function(err) {
                alert("Can not login: " + err.responseText);
            }
        });
        return false;
    });
});