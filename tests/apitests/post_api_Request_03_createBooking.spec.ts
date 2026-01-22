/*
Test: create Booking
Request type: post
request body: random/dynamic data using faker

pre-requisites:
------------------
Install faker-js library for generating dynamic data
npm install @faker-js/faker

To deal with the dates in the exact format that the API is accepting we use another library luxoft

Install Luxon is a library for working with dates and times in Javascript
npm install luxon


*/

import {test,expect} from "@playwright/test";
//import faker module
import { faker, Faker } from "@faker-js/faker";
import {DateTime} from 'luxon';

test("post request using faker library", async ({request})=>{

    //data generation using faker library
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({min:1000,max:10000});
    const depositpaid = faker.datatype.boolean();

    const checkin = DateTime.now().toFormat("yyyy-MM-dd");
    const checkout = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd");

    const additionalneeds = "super bowls";

    const requestBody = {
        firstname:firstname,
        lastname:lastname,
        totalprice:totalprice,
        depositpaid:depositpaid,
        bookingdates:{
            checkin:checkin,
            checkout:checkout
        },
        additionalneeds:additionalneeds

    }

    const response =await request.post("https://restful-booker.herokuapp.com/booking",{data:requestBody});
    const responseBody = await response.json();

    console.log(responseBody);

    //validate status codes
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validate data attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");

    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname : requestBody.firstname,
        lastname : requestBody.lastname,
        totalprice : requestBody.totalprice,
        depositpaid : requestBody.depositpaid,
        additionalneeds : requestBody.additionalneeds
    });

    expect(booking.bookingdates).toMatchObject({
        checkin : requestBody.bookingdates.checkin,
        checkout : requestBody.bookingdates.checkout
    });





})