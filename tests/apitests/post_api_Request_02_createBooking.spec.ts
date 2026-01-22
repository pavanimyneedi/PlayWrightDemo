/*
Test: create Booking
Request type: post
request body: json file

to use external json file we need to import fs(file system)

*/

import {test, expect} from "@playwright/test"
import fs from "fs";

test("Create post request using json file request body",async ({request})=>{
    //read json file
    const jsonFile = "testdata/post_request_body.json";
    const requestBody:any = JSON.parse(fs.readFileSync(jsonFile,'utf-8'));

    //send post request
    const response = await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});

    //response
    const responseBody =await response.json();
    console.log(responseBody);

    //validate status
    expect((await response).ok()).toBeTruthy();
    expect((await response).status()).toBe(200);

    //validate response body attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    //validate inner attributes of booking
    const booking =await responseBody.booking;

    expect(booking).toMatchObject({
        firstname : requestBody.firstname,
        lastname : requestBody.lastname,
        totalprice : requestBody.totalprice,
        depositpaid : requestBody.depositpaid,
        additionalneeds : requestBody.additionalneeds,
    });

    expect(booking.bookingdates).toMatchObject({
            checkin : requestBody.bookingdates.checkin,
            checkout : requestBody.bookingdates.checkout,
    });







})