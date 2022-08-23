$(function () {

  let continueButtonDisabled = false;
  let selectedAmount;

  $(".plus-minus").click(function () {
    $(this).toggleClass("fa-circle-plus fa-circle-minus");
  });

  $(".topic").click(function () {
    $(this).parent().parent().find(".plus-minus").toggleClass("fa-circle-plus fa-circle-minus");
  });

  $(".payment-amount").click(function () {
    $("#other").val("");
    $(".payment-amount").removeClass("payment-amount-active");
    $(this).addClass("payment-amount-active");
    selectedAmount = $(this).data("amount");
  });

  $("#other").on("input", function () {
    $(".payment-amount").removeClass("payment-amount-active");
    this.value = this.value.replace(/\D/g, '');
    this.value ? selectedAmount = this.value : selectedAmount = 0;
  });

  $(".btn-continue").click(function () {
    if (selectedAmount && !continueButtonDisabled) {
      $(this).css("background-color", "#666");
      $(this).css({ pointerEvents: "none" });
      $("#continue-text").text("Continuing");
      $("#loading").removeClass("d-none");
      continueButtonDisabled = true;
      setTimeout(() => {
        window.open("https://thegunspringurl.com/?org=dd&amount=" + selectedAmount, "_blank");
        $(".btn-close").click();
        $(".payment-amount").removeClass("payment-amount-active");
        $("#other").val("");
        selectedAmount = 0;
        continueButtonDisabled = false;
        $("#continue-text").text("Continue");
        $(this).css("background-color", "#d32f2f");
        $(this).css({ pointerEvents: "auto" });
        $("#loading").addClass("d-none");
      }, 2000)
    }
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