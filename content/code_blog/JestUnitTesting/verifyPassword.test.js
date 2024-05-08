const verifyPassword = require('./verifyPassword')

/*
 *      Tests focusing on broad and basic inputs
 */
test("Test that null input should return false", function () {
    //arrange

    //act
    const result = verifyPassword(null);  
    //assert
    expect(result.pass).toBe(false);
})

test("Test that length verification of 'aaaaaaaa' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("aaaaaaaa");  
    //assert
    expect(result.length).toBe(true);
})

test("Test that length verification of 'a' should return false", function () {
    //arrange

    //act
    const result = verifyPassword("a");  
    //assert
    expect(result.length).toBe(false);
})

test("Test that length verification of 'aaaaaaaaaaaaaaa' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("aaaaaaaaaaaaaaa");  
    //assert
    expect(result.length).toBe(true);
})

test("Test that lowercase verification of 'abcd' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("abcd");  
    //assert
    expect(result.lowercase).toBe(true);
})

test("Test that lowercase verification of 'ABCD' should return false", function () {
    //arrange

    //act
    const result = verifyPassword("ABCD");  
    //assert
    expect(result.lowercase).toBe(false);
})

test("Test that uppercase verification of 'ABCD' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("ABCD");  
    //assert
    expect(result.uppercase).toBe(true);
})

test("Test that uppercase verification of 'abcd' should return false", function () {
    //arrange

    //act
    const result = verifyPassword("abcd");  
    //assert
    expect(result.uppercase).toBe(false);
})

test("Test that digit verification of 'abcd' should return false", function () {
    //arrange

    //act
    const result = verifyPassword("abcd");  
    //assert
    expect(result.digit).toBe(false);
})

test("Test that digit verification of 'abcd12' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("abcd12");  
    //assert
    expect(result.digit).toBe(true);
})

test("Test that symbol verification of '!@#$%^&*' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("!@#$%^&*");  
    //assert
    expect(result.symbol).toBe(true);
})

test("Test that symbol verification of 'abcd' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("abcd");  
    //assert
    expect(result.symbol).toBe(false);
})

test("Test that noinvalid verification of 'abcd{}' should return false", function () {
    //arrange

    //act
    const result = verifyPassword("abcd{}");  
    //assert
    expect(result.noInvalid).toBe(false);
})

test("Test that noinvalid verification of 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*");  
    //assert
    expect(result.noInvalid).toBe(true);
})

test("Test the pass verification of 'Abcdefgh18!' should return true", function () {
    //arrange

    //act
    const result = verifyPassword("Abcdefgh18!");  
    //assert
    expect(result.pass).toBe(true);
})

test("Test the pass verification of 'Abc18!' should return false based on length", function () {
    //arrange

    //act
    const result = verifyPassword("Abc18!");  
    //assert
    expect(result.pass).toBe(false);
})

test("Test the pass verification of 'ABCDEFGHIJ18!' should return false based on lowercase", function () {
    //arrange

    //act
    const result = verifyPassword("ABCDEFGHIJ18!");  
    //assert
    expect(result.pass).toBe(false);
})

test("Test the pass verification of 'abcdefghi18!' should return false based on uppercase", function () {
    //arrange

    //act
    const result = verifyPassword("abcdefghi18!");  
    //assert
    expect(result.pass).toBe(false);
})

test("Test the pass verification of 'Abcdefghikl!' should return false based on digit", function () {
    //arrange

    //act
    const result = verifyPassword("Abcdefghikl!");  
    //assert
    expect(result.pass).toBe(false);
})

test("Test the pass verification of 'Abcdefghi19' should return false based on symbol", function () {
    //arrange

    //act
    const result = verifyPassword("Abcdefghi19");  
    //assert
    expect(result.pass).toBe(false);
})

test("Test the pass verification of 'Abcdefghi19!{' should return false based on symbol", function () {
    //arrange

    //act
    const result = verifyPassword("Abcdefghi19!{");  
    //assert
    expect(result.pass).toBe(false);
})