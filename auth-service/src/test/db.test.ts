import {describe, expect, test} from '@jest/globals';
import sequelize from "../config/db"

describe("DB Setup Test" , () => {
    test("Connection Test" , async () => {
        await expect(sequelize.validate()).resolves.toBe(undefined)
    });
})