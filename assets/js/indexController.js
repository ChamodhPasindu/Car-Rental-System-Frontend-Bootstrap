var baseUrl = "http://localhost:8080/Easy_Car_Rental/"

//Set current date
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var tomorrow = now.getFullYear() + "-" + (month) + "-" + ((+day)+(+1));


/*---------------Navigation---------------*/
loadTodayAvailableCars();
//-------------login page------------
$("#loginFormBtn").click(function () {
    listNo=0

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
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === ("Customer")) {
                    customerLogin(res.data)
                } else if (res.message === ("Driver")) {
                    driverLogin(res.data)
                } else if (res.message === ("Admin")) {
                    adminLogin(res.data)
                } else {
                    alert(res.message)
                }
            }
            $("#login-page-user-name").val("")
            $("#login-page-password").val("")
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

function clearAllReservationDetails() {
    $("#customer-reservationStatus").text("No Reservation")
    $("#customer-reservationStatus").css("color", "black")

    $("#driverStatus").text("Not Required")
    $("#driverStatus").css("color", "black")


    $('#customer-reservation-driver-id,#customer-reservation-driver-name, #customer-reservation-driver-license,#customer-reservation-driver-mobile, #customer-reservation-driver-joinDate').text("")
    $('#customer-reservation-id,#customer-reservation-name,#customer-reservation-vehicle,#customer-reservation-venue,#customer-reservation-pickUp-time,#customer-reservation-pickUp-date,#customer-reservation-return-date,#customer-reservation-days').text("")
}

//---------Customer Login
function customerLogin(data) {
    customer = data
    $("#loginPage").css("display", "none")
    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.customer_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)

    getAvailableCar();
    clearAllReservationDetails()

}

//---------Driver Login
function driverLogin(data) {
    $("#loginPage").css("display", "none")
    $("#driverNavBar").css("display", "block")
    $("#driver").css("display", "block")

    loadDriverSchedule(data);

}

//---------admin Login
function adminLogin(data) {
    $("#loginPage").css("display", "none")
    $("#admin").css("display", "block")

    $("#adminDailySummary").css("display", "block")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadDailySummary();

}

//---------------------User Logout
$("#logOutBtn").click(function () {
    $("#customer").css("display", "none")
    $("#customerNavbar").css("display", "none")

    $("#driverNavBar").css("display", "none")
    $("#driver").css("display", "none")

    $("#admin").css("display", "none")

    $("#landingPage").css("display", "block")
    $("#landingNavbar").css("display", "block")

    loadTodayAvailableCars()
    listNo=0;
})

//----------------customer navigation
//---Home
$("#customerHomeBtn").click(function () {
    $("#customerReservation").css("display", "none")
    $("#customerProfile").css("display", "none")

    $("#customerHome").css("display", "block")
})

//---Reservations
$("#customerReservationBtn").click(function () {
    $("#customerProfile").css("display", "none")
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "block")

    loadUpcomingReservation();

})

//---Account
$("#customerAccountBtn").click(function () {
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "none")

    $("#customerProfile").css("display", "block")
})

//---------------customer Profile navigations
$("#customerInformationBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "none")

    $("#customerProfileUpdateDetail").css("display", "block")
})

$("#customerChangePasswordBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "block")

    $("#customerProfileUpdateDetail").css("display", "none")
})

//---------------admin profile navigations
//--Dashboard
$("#adminDashboardBtn").click(function () {

    $("#adminDailySummary").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadDailySummary();
})

//--Reservation
$("#adminReservationBtn").click(function () {
    $("#adminReservation").css("display", "inline-flex")

    $("#adminDailySummary").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-reservation-title").css("display", "block")
    $("#admin-todayPickups-title").css("display", "none")

    $("#admin-update-reservation").css("display", "block")
    $("#admin-view-reservation").css("display", "none")

    loadPendingReservations();
})

//--Cars
$("#adminCarsBtn").click(function () {
    $("#adminCars").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadAllCars("allCarDetail");
    $("#availableBtn").css("display", "none");
    $("#unavailableBtn").css("display", "none");
    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "block");


    $("#admin-all-cars-title").css("display", "block")
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");

})

//--Customer
$("#adminCustomerBtn").click(function () {
    $("#adminCustomer").css("display", "inline-flex")

    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadAllCustomer()
})

//--Drivers
$("#adminDriversBtn").click(function () {
    $("#adminDrivers").css("display", "inline-flex")

    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-driver-schedule-table").css("display", "none")
    $("#admin-driver-table").css("display", "block")


    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")

    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()
})

//--Payment
$("#adminPaymentBtn").click(function () {
    $("#adminPayments").css("display", "inline-flex")

    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")

    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")


    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()
})

//--------------Today available cars------------


function loadTodayAvailableCars() {
    $.ajax({
        url: baseUrl + "controller/car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Available",
        method: 'GET',
        success: function (resp) {
            if (resp.status === 200) {
                carList = resp.data
                loadDataToDiv()
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}


let divArray = ["#div-one", "#div-two", "#div-three"];

function loadDataToDiv() {
    displayDiv=0
    for (var i = 0; listNo <= carList.length-1; i++,listNo++,displayDiv++) {

        $("#tag").css("display", "none")
        $(divArray[i]).css("display", "block")

        if (i > 2) {
            break
        }
        let img = "#" + $(divArray[i]).children()[0].id
        let type = "#" + $(divArray[i]).children().children()[0].id;
        let brand = "#" + $(divArray[i]).children().children()[1].id;
        let daily = "#" + $(divArray[i]).children().children()[4].id
        let monthly = "#" + $(divArray[i]).children().children()[7].id

        let fuel = "#" + $("#" + $(divArray[i]).children().children()[9].id).children()[1].id;
        let transmission = "#" + $("#" + $(divArray[i]).children().children()[10].id).children()[1].id;

        $(img).attr("src", baseUrl + carList[listNo].carImgDetail.image_1)
        $(type).text(carList[listNo].type)
        $(brand).text(carList[listNo].brand)
        $(daily).text(carList[listNo].daily_rate)
        $(monthly).text(carList[listNo].monthly_rate)
        $(fuel).text(carList[listNo].fuel_type)
        $(transmission).text(carList[listNo].transmission)
    }

}


$("#home-nextBtn").click(function () {
    if (carList.length===listNo){
        return
    }
    $('#div-one, #div-two,#div-three').css({
        display:'none'
    })

    loadDataToDiv()

})

$("#home-PreviousBtn").click(function () {
    if (3 >= listNo){
        return
    }
    $('#div-one, #div-two,#div-three').css({
        display:'none'
    })
    listNo=listNo-(displayDiv+3)
    loadDataToDiv()
})

//--Admin Dashboard
function loadIncome() {
    $.ajax({
        url: baseUrl + "controller/payment/daily_weekly_Annually_Income?type=Daily&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-daily-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "controller/payment/daily_weekly_Annually_Income?type=Monthly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-Monthly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "controller/payment/daily_weekly_Annually_Income?type=Weekly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-weekly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "controller/payment/daily_weekly_Annually_Income?type=Yearly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-Yearly-income").text(resp.data)
            }
        }
    });

}

function loadAvailableAndRentalCar() {
    $.ajax({
        url: baseUrl + "controller/car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Available",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-daily-available-cars").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "controller/car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=&status=Rental",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-daily-rental-cars").text(resp.data.length)
            }
        }
    });
}

function loadAvailableAndOccupiedDrivers() {
    $.ajax({
        url: baseUrl + "controller/driver/todayAvailableAndOccupiedDrivers/Available",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-daily-available-drivers").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "controller/driver/todayAvailableAndOccupiedDrivers/Occupied",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-daily-occupied-cars").text(resp.data.length)
            }
        }
    });
}

function loadTodayReservations() {
    $("#admin-daily-reservation-table").empty();

    $.ajax({
        url: baseUrl + "controller/reservation/todayReservation",
        method: "GET",
        success: function (resp) {
            for (const reservation of resp.data) {
                let row = `<tr><td>${reservation.reserve_id}</td><td>${reservation.car.registration_no}</td><td>${reservation.customer.nic}</td></tr>`;
                $("#admin-daily-reservation-table").append(row);
            }
        }
    });

}

function loadTodayPayments() {
    $("#admin-daily-payment-table").empty();

    $.ajax({
        url: baseUrl + "controller/payment/todayIncomeList",
        method: "GET",
        success: function (resp) {
            for (const payment of resp.data) {
                let row = `<tr><td>${payment.bill_id}</td><td>${payment.carReservation.reserve_id}</td><td>${payment.pay_date}</td><td>${payment.total_payment}</td></tr>`;
                $("#admin-daily-payment-table").append(row);
            }
        }
    });
}

function loadDailySummary() {
    loadIncome();
    loadAvailableAndRentalCar();
    loadAvailableAndOccupiedDrivers();
    loadTodayReservations();
    loadTodayPayments()
}







