$(function() {
    $(".change-devoured").on("click", function(event) {
        let id = $(this).data("id");
        let changedDevoured = {
            devoured: true
            };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: changedDevoured
        }).then(
            function() {
                location.reload();
            }
        );
    });

    $(".burger-form").on("submit", function(event) {
        event.preventDefault();
        if ($("#burgers").val().trim() === "") {
            location.reload();
        } else {
            let newBurger = {
                burger_name: $("#burgers").val().trim(),
                devoured: false
            };
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function() {
                    location.reload();
                }
            );
        }
    });
});