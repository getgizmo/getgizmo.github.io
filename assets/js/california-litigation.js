$(function () {

  $("#nav-about").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#about").offset().top - $("#header").outerHeight()
    }, "fast");
  });

  $("#subscribe").click(function () {
    if ($("#mce-EMAIL").val().trim()) {
      $("small").html("");
      $.ajax({
        url: "https://ghostgunner.us17.list-manage.com/subscribe/post-json?u=e204d9ef7718991df1c974644&amp;id=4253170ab8&c=?",
        type: "GET",
        data: $("#mc-embedded-subscribe-form").serialize(),
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          if (data["result"] != "success") {
            let message = data["msg"].slice(4);
            $("small").html("<i class=\"fa-solid fa-circle-exclamation me-1\"></i>" + message);
          } else {
            $("#mce-EMAIL").val("");
            $("small").html("<i class=\"fa-solid fa-circle-check me-1\"></i>Thank you! Your submission has been received!");
          }
        },
      });
    }
  });

});