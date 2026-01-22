/*  Put request:

pre-requisites: 
  data:json file
  create token

  1) create a booking using post request -----bookingId
  2) update booking(put) ------>using token

*/

import {test,expect} from "@playwright/test";
import fs, { read } from "fs";

//reading json file
function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}

test("put request to update the records",async({request})=>{

    const createRequestBody = readJson("testdata/post_request_body.json");
    const createResponse = await request.post('/booking', {data:createRequestBody});
    expect(createResponse.ok()).toBeTruthy();

    const createResponseBody = await createResponse.json();
    console.log(createResponseBody);

    const bookingid = createResponseBody.bookingid;
    console.log("bookingid: ", bookingid);

    //token generation

    const tokenRequestBody = readJson("testdata/put_request_token_file.json");
    const tokenResponse =await request.post('/auth',{data:tokenRequestBody});
    expect(await tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    console.log(tokenResponseBody);

    const token= tokenResponseBody.token;
    console.log("token: ",token);

    //update the entry/booking using put request with bookingid & token
    const putRequestBody = readJson("testdata/put_request_body.json");
    const putResponse =await request.put(`/booking/${bookingid}`,
        {headers:{"cookie":`token=${token}`},
            data:putRequestBody
        });
    
    expect(putResponse.ok()).toBeTruthy();
    expect(putResponse.status()).toBe(200);
    const putResponseBody = putResponse.json();
    console.log(putResponseBody);   
    console.log("booking details updated successfully!");




})
