/*
partially update the request with minimal details

*/
import {test,expect} from "@playwright/test"
import fs, { read } from "fs"

//json parsing
function readJson(jsonPath:string){
    return JSON.parse(fs.readFileSync(jsonPath,'utf-8'));
}

//create a post request to create a booking

test("delete record/booking by using id",async({request})=>{

    //create a post request to create a booking
    const postRequest = readJson("testdata/post_request_body.json");
    const postResponse =await request.post('/booking',{data:postRequest});
    expect(postResponse.ok()).toBeTruthy(); //validates the response
    expect(postResponse.status()).toBe(200); //validates the response code

    //print the responseBody
    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);
    const bookingid = postResponseBody.bookingid;
    console.log("bookingid:----->",bookingid);

    //get request: use the generated key to get the details
    const getResponse =await request.get(`/booking/${bookingid}`);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    const getResponseBody = await getResponse.json();
    console.log(getResponseBody);
    console.log("Booking id:",bookingid,"response Body:",getResponseBody);

    //generate token

    const tokenRequestBody = readJson('testdata/put_request_token_file.json');
    const tokenResponse = await request.post('/auth',{data:tokenRequestBody});
    expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);

    const tokenResponseBody = await tokenResponse.json();
    console.log(tokenResponseBody);
    const token = tokenResponseBody.token;
    console.log("token:---->",token);


    // //put request to update the record:
    // const putRequestBody = readJson("testdata/put_request_body.json");
    // const putResponse = await request.put(`/booking/${bookingid}`,
    //     {headers:{"Cookie":`Token=${token}`},data:putRequestBody});

    // expect(putResponse.ok()).toBeTruthy();
    // expect(putResponse.status()).toBe(200);

    // const putResponseBody = await putResponse.json();
    // console.log(putResponseBody);

    //patch request to partially update the record:
    const patchRequestBody = readJson('testdata/patch_request_body.json');
    const patchResponse = await request.patch(`/booking/${bookingid}`,
        {headers:{"Cookie":`Token=${token}`},data:patchRequestBody});
    
    expect(patchResponse.ok()).toBeTruthy();
    expect(patchResponse.status()).toBe(200);

    const patchResponseBody = await patchResponse.json();
    console.log(patchResponseBody);
    console.log("record updated successfully");

    //delete request to delete the created record
    const deleteResponse = await request.delete(`/booking/${bookingid}`, 
        {headers:{"cookie":`Token=${token}`}});

    expect(deleteResponse.ok()).toBe("Created");
    expect(deleteResponse.status()).toBe(200);

    console.log("booking deleted successfully!")




    







})

