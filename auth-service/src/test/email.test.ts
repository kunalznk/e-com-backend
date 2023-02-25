import {describe, expect, test} from '@jest/globals';
import { transport } from "../config/email";

describe("Email Setup Test" , () => {
    test("Email Test" , async () => {
        transport.verify((success) => {
            expect(success).toBe(true);
        })
    });
})