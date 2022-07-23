$("#admin-pending-reservation").click(function (){
    $("#admin-reservation-title").css("display","block")
    $("#admin-todayPickups-title").css("display","none")

    $("#admin-update-reservation").css("display","block")
    $("#admin-view-reservation").css("display","none")
})

$("#admin-today-pickups").click(function (){
    $("#admin-reservation-title").css("display","none")
    $("#admin-todayPickups-title").css("display","block")

    $("#admin-update-reservation").css("display","none")
    $("#admin-view-reservation").css("display","block")

})