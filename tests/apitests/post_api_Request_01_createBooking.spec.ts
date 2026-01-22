/*
Test: create Booking
Request type: post
request body: static data

*/

import {test,expect} from "@playwright/test"

test("Create post request using static body",async ({request})=>{

    //request body
    const requestBody = {
        "firstname" : "pavani",
        "lastname" : "myneedi",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
}

    //send post request
    const response =await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});
    const responseBody =await response.json();          //extracted response

    console.log(responseBody);

    //validating status codes
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validating response body
  
    expect(responseBody).toHaveProperty("bookingid")
    expect(responseBody).toHaveProperty("booking");
 

    //validating nexted response body: Booking
    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        "firstname": "pavani",
        "lastname": "myneedi",
        "totalprice": 111,
        "depositpaid": true,
        "additionalneeds": "Breakfast"
    })

    expect(booking.bookingdates).toMatchObject({
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    })




})