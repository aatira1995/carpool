export class AppConstants {

    /* Url used in the application */
    static baseUrl = 'http://10.155.2.69:3000/';
    static userBaseUrl = `${AppConstants.baseUrl}api/users/`;
    static vehicleBaseUrl = `${AppConstants.baseUrl}api/vehicle/`;
    static rideBaseUrl = `${AppConstants.baseUrl}api/rides/`;
    static loginUrl = `${AppConstants.userBaseUrl}login`;
    static registerUrl = `${AppConstants.userBaseUrl}register`;
    static logoutUrl = `${AppConstants.userBaseUrl}logout`;
    static accountUrl = `${AppConstants.userBaseUrl}profileDetails`;
    static updateProfileUrl = `${AppConstants.userBaseUrl}updateProfileDetails`;
    static vehicelDetailsEnterUrl = `${AppConstants.vehicleBaseUrl}new`;
    static vehicleDetailsGetUrl = `${AppConstants.vehicleBaseUrl}getVehicles`;
    static createRideUrl = `${AppConstants.rideBaseUrl}offer`;
    static showRidesUrl = `${AppConstants.baseUrl}api/bookings/showTrips/`;
    static bookRidesUrl = `${AppConstants.baseUrl}api/rides/book`;
    static getOfferedRidesUrl = `${AppConstants.rideBaseUrl}offered/0/10`;
    static getBookedRidesUrl = `${AppConstants.rideBaseUrl}booked/0/10`;
    static cancelRidesUrl = `${AppConstants.rideBaseUrl}cancelRide`;
    static getBookedDetailsUrl = `${AppConstants.rideBaseUrl}bookedUsers/`;
    static cancelVehicleUrl = `${AppConstants.vehicleBaseUrl}deleteVehicles`;
    static updateRideUrl = `${AppConstants.rideBaseUrl}updateRide`;

    /* static contents in the http headers */
    static contentType = 'application/json';
    static responseType = 'text';

    /* Images used in the application */
    static rideWithUsImage = '../assets/images/ridewithus.png';
    static carPoolLogo = '../assets/images/registerPage.png';
    static landingPageLogo = '../assets/images/bottomwallpaper.png';
    static dashboard1 = './assets/images/dashboard1.png';
    static howItWorks = './assets/images/Howitworks.png';

    /* Name for the item stored in local storage */
    static localstorageLoginFeed = 'LoginFeed';

    /* Navigation in the application */
    static register = '/register';
    static login = '/login';
    static dashboard = '/dashboard';
    static offerRide = '/offerRide';
    static listRide = '/listRides';
    static updateProfile = '/updateProfile';
    static account = '/account';
    static listVehicles = '/listVehicles';
    static bookRide = '/bookRide';

    /* Html page static contents */
    static staticPageContent = {
        registerFormTitle: 'Register',
        loginFormTitle: 'Login',
        name: 'Name',
        username: 'User Name',
        email: 'Email Address',
        number: 'Mobile Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        submitButton: 'Submit',
        registerQuestion: 'Not a Member Yet?',
        loginQuestion: 'Already a Member?',
        registerLink: 'Register Now',
        loginLink: 'Login',
        tagline: `Let's Pool & Play`,
        profile: 'Profile',
        updateProfile: 'Update Profile',
        updateButton: 'Update',
        passwordMismatchMessage: 'Passwords Mismatch',
        newPassword: 'New Password',
        vehicleDetailsTitle: 'Provide Vehicle Details',
        vehicleNumber: 'Vehicle Number',
        vehicleName: 'Vehicle Name',
        seatCapacity: 'Seating Capacity',
        offerButton: 'Offer Ride',
        offerRideTitle: 'Offer Rides Here!',
        vehicleDetailsModal: 'Add Vehicle Details',
        add: '+',
        selectYourVehicleTag: 'Select Your Vehicle',
        true: 'true',
        false: 'false',
        offerRidesTitle: 'Offer Rides',
        bookRidesTitle: 'Book Rides',
        cancel: 'Cancel',
        changePassword: 'Change Password',
        address: 'Address',
        offerRidesTableTitle: 'Offered Rides',
        BookedRidesTableTitle: 'Booked Rides',
        rides: 'Rides At Glance',
        source: 'Source',
        destination: 'Destination',
        rideDate: 'Ride Date',
        offeredOn: 'Offered On',
        checkpoints: 'Checkpoint',
        active: 'Active State',
        deleteButton: 'X',
        editButton: 'Edit',
        statusButton: 'Status',
        action: 'Action',
        noOffered: 'No Rides Offered ',
        noBooked: 'No Rides Booked ',
        noVehicles: 'No Vehicles Added',
        listVehicles: 'Vehicles you own',
        vehicles: 'Vehicles',
        isActiveTrue: 'Active',
        isActiveFalse: 'Inactive',
        dateOfJourney: 'Date of Journey',
        searchRadius: 'Search Radius',
        findRideButton: 'Find Rides',
        seatsAvailable: 'Seats Available',
        rideOwner: 'Offered By',
        book: 'Book',
        distance: 'Distance',
        distanceUnit: 'miles',
        costPerHead: 'Cost Per Head',
        listRides: 'List All Rides',
        OfferAnother: 'Offer Another',
        directionAlert: 'Directions request failed due to ',
        fieldAlert: 'All Fields Must Be Filled!!',
        bookRideTitle: 'Book Rides Here!',
        usersBookedTitle: 'List Of Users Booked Your Ride',
        noUsersBooked: 'No Booking So Far. You Can Edit Your Ride',
        confirmRideDeleteMessage: 'Wish To Delete The Ride?',
        confirmVehicleDeleteMessage: 'Wish To Delete The Vehicle?',
        deleteYes: 'Yes',
        deleteNo: 'No',
        seatNumberMissMatch: 'Cotravellers must be less than the seating capacity of selected vehicle',
        dateMissMatch: ' Date Must Fall Between ',
        and: '&',
    };
    static headerNavbarContent = {
        link1: 'Home',
        link2: 'About Us',
        link3: 'Go To Rides'
    };
    static headerDropdownContent = {
        link1: 'Account',
        link2: 'Log out',
        link3: 'Go Home',
        link4: 'View Vehicles',
    };
    static logoutModalContent = {
        logoutQuestion: 'Are You Sure You Want To Exit?',
        logoutYes: 'Yes',
        logoutNo: 'No'
    };
    static headerModalContent = {
        title: 'About Us',
        closeButton: 'Close'
    };
    static bookingModalContent = {
        bookingQuestion: 'Are You sure You Want To Book This Ride?',
        bookingNo: 'No',
        bookingYes: 'Book'
    };


    /* Error messages in error Component */
    static errorMessage = {
        vehicleNumberError: 'Vehicle Number Is Required (Ex: KL-07 CC 7654)',
        vehicleNameError: 'Vehicle Name Is Required (Ex: Honda Amaze)',
        seatsAvailableError: 'Seat Number Of Your Vehicle Should Be Provided (Ex: 4)',
        vehicleIdError: 'Must Select A Vehicle From The List',
        fromLocationError: 'You Need To Enter A Location As Source',
        toLocationError: 'You Need To Enter A Location As Destination',
        checkpointsError: 'The Size Of Text You entered Exceeds The Limit',
        costError: 'Provide Amount per Head For Your Ride(Should Not Exceed 9999)',
        nameError: 'Name Is Required And Can Contain Alphabets, Hypenhs, Dot',
        emailError: 'Email Is Required (Ex: example@gmail.com)',
        phoneError: 'Mobile Number Is Required And Should Be 10 Digit Starting with 7/8/9',
        passwordError: 'Password Should Contain Minimum of 8 and Maximum of 15 Characters',
        addressError: 'Address Should Have Maximum Of 50 Characters',
        originError: 'You Need To Enter A Location As Source',
        destinationError: 'You Need To Enter A Location As Destination',
        radiusError: 'Provide A Search Radius Less Than 10',
        newPasswordError: 'Password Should Contain Minimum of 8 and Maximum of 15 Characters',
    };
}
