const verifyEmail = require('./verifyEmail')

/*
 *      Small group of "easy" cases, including basic invalid input and a couple valid emails
 */
test("Test for non-string input returns false: null", function () {
    //arrange

    //act
    const result = verifyEmail(null);  
    //assert
    expect(result).toBe(false);
})

test("Test for non-string input returns false: int", function () {
    //arrange

    //act
    const result = verifyEmail(12);
    //assert
    expect(result).toBe(false);
})

test("Test that empty string returns false", function () {
    //arrange

    //act
    const result = verifyEmail("");
    //assert
    expect(result).toBe(false);
})

test("Test that valid email biffmarco@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco@gmail.com");  
    //assert
    expect(result).toBe(true);
})

test("Test that valid email biff.marco@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biff.marco@gmail.com");  
    //assert
    expect(result).toBe(true);
})

test("Test that valid email b1ffmarc0420@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("b1ffmarc0420@gmail.com");  
    //assert
    expect(result).toBe(true);
})

/*
 *      These are specifically looking for edge cases or boundry cases
 */
test("Test that string without an @ sign returns false", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco89.gmail.com")
    //assert
    expect(result).toBe(false)
})

test("Test for string beginning @ sign returns false", function () {
    //arrange

    //act
    const result = verifyEmail("@gmail.com")
    //assert
    expect(result).toBe(false)
})

test("Test for string ending @ sign returns false", function () {
    //arrange

    //act
    const result = verifyEmail("@gmail.com")
    //assert
    expect(result).toBe(false)
})

test("Test for invalid domain returns false", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco89@garbage")
    //assert
    expect(result).toBe(false)
})

test("Test for invalid domain with dot returns false", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco89@garbage.")
    //assert
    expect(result).toBe(false)
})

test("Test for nonstandard domain returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco89@garb.age")
    //assert
    expect(result).toBe(true)
})


test("Test that valid email biffmarco.@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco.@gmail.com");  
    //assert
    expect(result).toBe(false);
})

test("Test that valid email biffmarco~@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco~@gmail.com");  
    //assert
    expect(result).toBe(true);
})

test("Test that valid email biffmarco:@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco:@gmail.com");  
    //assert
    expect(result).toBe(false);
})

test("Test that valid email biffmarco;@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco;@gmail.com");  
    //assert
    expect(result).toBe(false);
})

test("Test that valid email biffmarco[]@gmail.com returns true", function () {
    //arrange

    //act
    const result = verifyEmail("biffmarco[].@gmail.com");  
    //assert
    expect(result).toBe(false);
})