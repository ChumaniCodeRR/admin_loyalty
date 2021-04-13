
# Vetro loyalty frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation

    $ git clone [repository name]
    $ cd vetro-loyalty-admin
    $ npm install
    $ cp .env.example .env // To set the base url of the API to consume usign the variable REACT_APP_API_URL
    $ yarn start

Please note that this application is dependent of [Vetro Loyalty API](https://bitbucket.org/vetrodevs/vetro_loyalty). Please ensure that the repository is correcty installed in your localhost for development purposes, or consume staging API url on [https://vapi.vetroms.co.za/api/documentation] (https://vapi.vetroms.co.za/api/documentation)

# Technical information

We have used React-redux, redux, thunk and class components.

### Reducers & Actions
Reducers and actions can be found in "store" folder.

### Axios interceptor
We are also using axios interceptors for http request where the access token is passed automatically when use is authenticated.
Interceptor is located in /instances/http.js

### Helpers

The helper files contain different functions to help certain features of the system. The helpers are located in helpers

#### Permission

Helps verifying if user has a given permission.

Usage

    can('edit-loyalty', permissions: array);

### User

Helps checking if a user is an admin, client, manager  based on the user's roles.

### Voucher

Helps get the different voucher variables including voucher type, discount type, and volumes (Single or Bulk).