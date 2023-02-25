import {describe, expect, test} from '@jest/globals';
import axios from "axios";

describe("Server Setup Test" , () => {
    test("Server Test" , async () => {
        const resp = await axios.get("http://localhost:4000/test");
        console.log(resp.data);
        expect(resp.status).toBe(200);
    });
})