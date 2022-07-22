/*---------------Navigation---------------*/

//-------------login page------------
$("#loginFormBtn").click(function () {
    $("#landingPage").css('display', 'none')
    $("#landingNavbar").css('display', 'none')

    $("#loginPage").css('display', 'block')
})

//-------------register page

$(".getStartBtn").click(function () {
    $("#landingPage").css('display', 'none')
    $("#landingNavbar").css('display', 'none')
    $("#loginPage").css('display', 'none')

    $("#registerForm").css('display', 'block')
})

//-------------Back Btn in Login & Register Page
$(".backToHomeBtn").click(function () {
    $("#landingPage").css('display', 'block')
    $("#landingNavbar").css('display', 'block')

    $("#loginPage").css('display', 'none')
    $("#registerForm").css('display', 'none')
})


//----------------------user Login
$("#loginUserBtn").click(function () {


    let userDTO = {
        user_name: $("#login-page-user-name").val(),
        password: $("#login-page-password").val()
    }

    $.ajax({
        url: "http://localhost:8080/Easy_Car_Rental/controller/login",
        method: "POST",
        contentType: "application/json",
        data:JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message===("Customer")){
                    customerLogin(res.data)
                }else if (res.message===("Driver")){
                    driverLogin(res.data)
                }else if (res.message===("Admin")){
                    adminLogin(res.data)
                }else {
                    alert(res.message)
                }
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

function customerLogin(data) {

    $("#loginPage").css("display","none")
    $("#customer").css("display","block")
    $("#customerNavbar").css("display","block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.user_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)


}

function driverLogin(data) {
    $("#loginPage").css("display","none")
    $("#driverNavBar").css("display","block")
    $("#driver").css("display","block")

}

function adminLogin(data) {
    $("#loginPage").css("display","none")
    $("#admin").css("display","block")

}

//---------------------User Logout
$("#logOutBtn").click(function () {
    $("#customer").css("display","none")
    $("#customerNavbar").css("display","none")

    $("#driverNavBar").css("display","none")
    $("#driver").css("display","none")

    $("#admin").css("display","none")

    $("#landingPage").css("display","block")
    $("#landingNavbar").css("display","block")

})


//----------------customer navigation
$("#customerHomeBtn").click(function () {
    $("#customerReservation").css("display","none")
    $("#customerProfile").css("display","none")

    $("#customerHome").css("display","block")
})

$("#customerReservationBtn").click(function () {
    $("#customerProfile").css("display","none")
    $("#customerHome").css("display","none")
    $("#customerReservation").css("display","block")

})
$("#customerAccountBtn").click(function () {
    $("#customerHome").css("display","none")
    $("#customerReservation").css("display","none")

    $("#customerProfile").css("display","block")
})

//---------------customer Profile navigations

$("#customerInformationBtn").click(function () {
    $("#customerProfileChangePassword").css("display","none")

    $("#customerProfileUpdateDetail").css("display","block")
})

$("#customerChangePasswordBtn").click(function () {
    $("#customerProfileChangePassword").css("display","block")

    $("#customerProfileUpdateDetail").css("display","none")
})

//---------------admin profile navigations
$("#adminDashboardBtn").click(function () {

    $("#adminDailySummary").css("display","block")

    $("#adminReservation").css("display","none")
    $("#adminCars").css("display","none")
    $("#adminDrivers").css("display","none")
    $("#adminCustomer").css("display","none")
})
$("#adminReservationBtn").click(function () {
    $("#adminReservation").css("display","block")

    $("#adminDailySummary").css("display","none")
    $("#adminCars").css("display","none")
    $("#adminDrivers").css("display","none")
    $("#adminCustomer").css("display","none")
})
$("#adminCarsBtn").click(function () {
    $("#adminCars").css("display","block")

    $("#adminReservation").css("display","none")
    $("#adminDailySummary").css("display","none")
    $("#adminDrivers").css("display","none")
    $("#adminCustomer").css("display","none")
})
$("#adminCustomerBtn").click(function () {
    $("#adminCustomer").css("display","block")

    $("#adminCars").css("display","none")
    $("#adminReservation").css("display","none")
    $("#adminDailySummary").css("display","none")
    $("#adminDrivers").css("display","none")
})
$("#adminDriversBtn").click(function () {
    $("#adminDrivers").css("display","block")

    $("#adminCustomer").css("display","none")
    $("#adminCars").css("display","none")
    $("#adminReservation").css("display","none")
    $("#adminDailySummary").css("display","none")
})









