var baseUrl = "http://localhost:8080/Easy_Car_Rental/"

//Set current date
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);


/*---------------Navigation---------------*/
loadTodayAvailableCars();
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
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

function customerLogin(data) {
    customer=data
    $("#loginPage").css("display", "none")
    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.user_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)


}

function driverLogin(data) {
    $("#loginPage").css("display", "none")
    $("#driverNavBar").css("display", "block")
    $("#driver").css("display", "block")

    loadDriverSchedule(data);

}

function adminLogin(data) {
    $("#loginPage").css("display", "none")
    $("#admin").css("display", "block")

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
})


//----------------customer navigation
$("#customerHomeBtn").click(function () {
    $("#customerReservation").css("display", "none")
    $("#customerProfile").css("display", "none")

    $("#customerHome").css("display", "block")
})

$("#customerReservationBtn").click(function () {
    $("#customerProfile").css("display", "none")
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "block")

})
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
$("#adminDashboardBtn").click(function () {

    $("#adminDailySummary").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")
})


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


$("#adminCarsBtn").click(function () {
    $("#adminCars").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")



    loadAllCars("allCarDetail");

    $("#admin-all-cars-title").css("display", "block")
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");

})

$("#adminCustomerBtn").click(function () {
    $("#adminCustomer").css("display", "inline-flex")

    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminPayments").css("display", "none")



    loadAllCustomer()
})

$("#adminDriversBtn").click(function () {
    $("#adminDrivers").css("display", "inline-flex")

    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminPayments").css("display", "none")



    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")


    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()
})

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

var data = []

function loadTodayAvailableCars() {

    $.ajax({
        url: baseUrl + "controller/car/availableOrRentalCarsByDate?pick_up_date=" + today + "&return_date=null&status=Available",
        method: 'GET',
        success: function (resp) {
            if (resp.status === 200) {
                data = resp.data
                loadDataToDiv(resp.data)
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

var list_no;
var previous;

let divArray = ["#div-one", "#div-two", "#div-three"];
let divs = [{
    img: "#today-one-car-img",
    type: "#today-one-car-type",
    brand: "#today-one-car-brand",
    daily: "#today-one-car-daily",
    monthly: "#today-one-car-monthly",
    fuel: "#today-one-car-fuel",
    transmission: "#today-one-car-transmission"
}, {
    img: "#today-two-car-img",
    type: "#today-two-car-type",
    brand: "#today-two-car-brand",
    daily: "#today-two-car-daily",
    monthly: "#today-two-car-monthly",
    fuel: "#today-two-car-fuel",
    transmission: "#today-two-car-transmission"
}, {
    img: "#today-three-car-img",
    type: "#today-three-car-type",
    brand: "#today-three-car-brand",
    daily: "#today-three-car-daily",
    monthly: "#today-three-car-monthly",
    fuel: "#today-three-car-fuel",
    transmission: "#today-three-car-transmission"
}]


function loadDataToDiv(data) {
    for (var i = 0; i <= data.length-1; i++) {

        if (i >= 3) {
        }else {
            list_no=i;
            setDataToDiv(divArray[i], data[i])
        }

    }
}


function setDataToDiv(string, car) {

    $("#tag").css("display", "none")
    $(string).css("display", "block")

    $(divs[list_no].type).text(car.type)
    $(divs[list_no].brand).text(car.brand)
    $(divs[list_no].daily).text(car.daily_rate)
    $(divs[list_no].monthly).text(car.monthly_rate)
    $(divs[list_no].fuel).text(car.fuel_type)
    $(divs[list_no].transmission).text(car.transmission)
    $(divs[list_no].img).attr("src", baseUrl + car.carImgDetail.image_2)


}

$("#home-nextBtn").click(function () {
    console.log("next:"+"list-"+list_no," previous-"+previous)


    if (data.length > list_no) {
        list_no++
        $(divArray[0]).css("display", "none")
        $(divArray[1]).css("display", "none")
        $(divArray[2]).css("display", "none")

        for (var i = list_no, x = 0; list_no <= data.length-1; list_no++, x++) { //i=2 //x=0
            $(divArray[x]).css("display", "block")

            $(divs[x].type).text(data[list_no].type)
            $(divs[x].brand).text(data[list_no].brand)
            $(divs[x].daily).text(data[list_no].daily_rate)
            $(divs[x].monthly).text(data[list_no].monthly_rate)
            $(divs[x].fuel).text(data[list_no].fuel_type)
            $(divs[x].transmission).text(data[list_no].transmission)
            $(divs[x].img).attr("src", baseUrl + data[list_no].carImgDetail.image_2)

            previous=x;
            if (x >= 2) {
                previous=x;
                return
            }
        }
    }

})

$("#home-PreviousBtn").click(function () {
    console.log("back:"+"list-"+list_no," previous"+previous)

    if (list_no >3) {

           list_no--
           $(divArray[0]).css("display", "none")
           $(divArray[1]).css("display", "none")
           $(divArray[2]).css("display", "none")

           for (var i = list_no, x = 0; list_no >= 3; list_no--, x--) { //i=2 //x=0
               $(divArray[x]).css("display", "block")

               $(divs[x].type).text(data[list_no].type)
               $(divs[x].brand).text(data[list_no].brand)
               $(divs[x].daily).text(data[list_no].daily_rate)
               $(divs[x].monthly).text(data[list_no].monthly_rate)
               $(divs[x].fuel).text(data[list_no].fuel_type)
               $(divs[x].transmission).text(data[list_no].transmission)
               $(divs[x].img).attr("src", baseUrl + data[list_no].carImgDetail.image_2)
               previous=x;
               if (x <= 2) {
                   previous=x;
                   return
               }
           }
    }
/*


    if (list_no>3) {
        list_no-- //4
         $(divArray[0]).css("display", "none")
         $(divArray[1]).css("display", "none")
         $(divArray[2]).css("display", "none")

        list_no=list_no-previous;//3

         for (var x = 2; list_no >= 1; list_no--, x--) {
             $(divArray[x]).css("display", "block")

             $(divs[x].type).text(data[list_no-1].type)
             $(divs[x].brand).text(data[list_no-1].brand)
             $(divs[x].daily).text(data[list_no-1].daily_rate)
             $(divs[x].monthly).text(data[list_no-1].monthly_rate)
             $(divs[x].fuel).text(data[list_no-1].fuel_type)
             $(divs[x].transmission).text(data[list_no-1].transmission)
             $(divs[x].img).attr("src", baseUrl + data[list_no-1].carImgDetail.image_2)

             console.log(x)

             if (x >= 0) {
                 list_no=list_no+3
                 previous=0;
                 return
             }
         }
    }*/
})


function loadIncome() {
    $.ajax({
        url: baseUrl + "/controller/payment/daily_weekly_Annually_Income?type=Daily&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-daily-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "/controller/payment/daily_weekly_Annually_Income?type=Monthly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-Monthly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "/controller/payment/daily_weekly_Annually_Income?type=Weekly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-weekly-income").text(resp.data)
            }
        }
    });
    $.ajax({
        url: baseUrl + "/controller/payment/daily_weekly_Annually_Income?type=Yearly&start_date=&end_date=",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-Yearly-income").text(resp.data)
            }
        }
    });

}

function loadAvailableAndRentalCar() {
    $.ajax({
        url: baseUrl + "/controller/car/availableOrRentalCarsByDate?pick_up_date="+today+"&return_date=null&status=Available",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-daily-available-cars").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "/controller/car/availableOrRentalCarsByDate?pick_up_date="+today+"&return_date=null&status=Rental",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-daily-rental-cars").text(resp.data.length)
            }
        }
    });
}

function loadAvailableAndOccupiedDrivers() {
    $.ajax({
        url: baseUrl + "/controller/driver/todayAvailableAndOccupiedDrivers/Available",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-daily-available-drivers").text(resp.data.length)
            }
        }
    });
    $.ajax({
        url: baseUrl + "/controller/driver/todayAvailableAndOccupiedDrivers/Occupied",
        method: "GET",
        success: function (resp) {
            if (resp.status===200){
                $("#admin-daily-occupied-cars").text(resp.data.length)
            }
        }
    });
}

function loadTodayReservations() {
    $("#admin-daily-reservation-table").empty();

    $.ajax({
        url: baseUrl + "/controller/reservation/todayReservation",
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
        url: baseUrl + "/controller/payment/todayIncomeList",
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







