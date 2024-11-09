var telegram_bot_id = "7031497239:AAF0EinTIcdyQf-czB-LyqmnnzbZxuFQqqA";
var chat_id = 5676930441;

function sendTelegram(event) {
    event.preventDefault(); // Prevent default form submission

    var u_name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    message =  "👤Имя: " + u_name + "\n\n☎️Телефон: " + phone +"\n\n📧email: " + email  + "\n\n💬Комментарий: " + message ;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
}