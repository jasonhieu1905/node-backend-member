$(document).ready(function () {


    // bind member info
    if (localStorage.getItem("member")) {
        const member = JSON.parse(localStorage.getItem("member"));
        $("#member-username").html(member.username);
        $("#member-admin").html(member.admin ? 'true' : 'false');
        if (member.admin) {
            loadMembers();
        }
    } else {
        window.location.href = "/";
    }

    $("#logout").click(() => {
        localStorage.removeItem("member");
        window.location.href = "/";
    })

});

function loadMembers() {
    $.ajax({
        url: "members",
        type: "GET",
        success: function (members) {
            console.log(members);
            var tbody = $("#member-table tbody");
            tbody.empty();
            $.each(members, function (i, member) {
                var tr = $('<tr>');
                $('<td>').html(member.username).appendTo(tr);
                $('<td><button data-username=' + member.username + ' class="delete">Delete</button></td>').appendTo(tr);
                tbody.append(tr);
            });
            $("#member-table").css("display", "table");
            $(".delete").on('click', function (event) {
                const selectedUsername = event.target.getAttribute("data-username");
                handleDeleteMember(selectedUsername);
            })
        },
        error: function (err) {

        }
    });
}

function handleDeleteMember(username) {
    var r = confirm("Are you sure want to delete this member!");
    if (r == true) {
        const member = {
            username
        }
        $.ajax({
            url: "members",
            type: "DELETE",
            data: JSON.stringify(member),
            contentType: "application/json; charset=utf-8",
            success: function (member) {
                alert('Delete member succesfully.');
                loadMembers();
            },
            error: function (error) {
                alert('Can not delete member.');
            }
        })
    }
}
