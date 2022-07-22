
$("#btnDriverSave").click(function (){

    var driverDTO={
        nic:$("#save-driver-nic").val(),
        driver_name:$("#save-driver-name").val(),
        address:$("#save-driver-address").val(),
        license_no:$("#save-driver-license").val(),
        mobile:$("#save-driver-mobile").val(),
        join_date:$("#save-driver-date").val(),
        user_name:$("#save-driver-user-name").val(),
        password:$("#save-driver-password").val(),
    }
    var serialize = $("#driverSaveForm").serialize();
    console.log(serialize)

    $.ajax({
        url: baseUrl+"controller/driver/addDriver",
        method: "POST",
        contentType:"application/json",
        data: JSON.stringify(driverDTO),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message);
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    })


})