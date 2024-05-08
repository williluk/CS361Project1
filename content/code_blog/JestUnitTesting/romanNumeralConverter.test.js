const romanNumeralConverter = require('./romanNumeralConverter')

// TEST DEPRECIATED 
// test("Test that the interface returns an empty string from input 0", function () {
//     //arrange

//     //act
//     const result = romanNumeralConverter(0);  
//     //assert
//     expect(result).toBe("");
// })

test("Test that the interface returns an detects input 1 and returns I", function () {
    //arrange

    //act
    const result = romanNumeralConverter(1);  
    //assert
    expect(result).toBe("I");
})

test("Test that interface returns I's equal to the value of the input (input<5)", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(4); 
    //assert
    expect(result1).toBe("IIII");
})

// TEST DEPRECIATED 
// test("Test that interface returns number of V's equal to input / 5", function () {
//     //arrange

//     //act
//     const result = romanNumeralConverter(11);  
//     //assert
//     expect(result).toBe("VVI");
// })

test("Test that interface returns I's equal to the remainder of input after the V's (input>5)", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(7); 
    //assert
    expect(result1).toBe("VII");
})

test("Test that interface works using X on inputs > 10", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(11); 
    //assert
    expect(result1).toBe("XI");
})

test("Test that interface works using L on inputs > 50", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(67); 
    //assert
    expect(result1).toBe("LXVII");
})

test("Test that interface works using C on inputs > 100", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(105); 
    //assert
    expect(result1).toBe("CV");
})

test("Test that interface works using M on inputs > 1000", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(1150); 
    //assert
    expect(result1).toBe("MCL");
})

test("Tests that interface returns an error for inputs < 0", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(-45); 
    //assert
    expect(result1).toBe("ERROR: Cannot convert - input out of bounds (conversion possible on integer inputs 1-3999)");
})

test("Tests that interface returns an error for inputs > 3999", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter(5000); 
    //assert
    expect(result1).toBe("ERROR: Cannot convert - input out of bounds (conversion possible on integer inputs 1-3999)");
})

test("Tests that interface returns an error for non-int inputs", function () {
    //arrange

    //act
    const result1 = romanNumeralConverter("doodlebing"); 
    //assert
    expect(result1).toBe("ERROR: Cannot convert - input out of bounds (conversion possible on integer inputs 1-3999)");
})