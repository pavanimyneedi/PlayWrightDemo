import {test,expect} from "@playwright/test";

test("get request using path parameter", async ({request})=>{

    const bookingId = 203;
    const response = await request.get(`/booking/${bookingId}`);

    const responseBody = await response.json();

    console.log(responseBody);

    //validations

    expect( await response.ok()).toBeTruthy();
    expect(await response.status()).toBe(200);

    // //data validation - check response shouldn't be empty
    // expect(responseBody.length).toBeGreaterThan(0);

    // for(const item of responseBody){

    //     expect(item).toHaveProperty("bookingid");
    //     expect(typeof item.bookingId).toBe("number");
    //     expect(item.bookingId).toBeGreaterThan(0);
    // }
})

//get request using query parameters
test("get request by name using query param",async ({request})=>{

    const firstname = "Josh";
    const lastname = "Allen";

    const response =await request.get("/booking",{params:{firstname,lastname}});

    const responseBody = await response.json();
    console.log(responseBody);

    //status validation
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validating data and making sure it is not null
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody){
       // expect(item.bookingId).toBeGreaterThan(0);
        expect(item).toHaveProperty("bookingid");
        expect(typeof item.bookingId).toBe("number");
    }

});