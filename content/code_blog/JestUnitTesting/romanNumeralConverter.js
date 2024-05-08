
/* ---------------------------------------------------------
*   Name: romanNumeralConverter
*   Description:    This function takes an integer as input and converts it into
*                   a string of roman numerals. It does this using an array of symbol-value
*                   equivalencies and loops through each one to do that symbol's step in the
*                   conversion.
*
*   Parameters:     input - an integer input to convert to roman numerals
*   Returns:        A string of roman numeral characters
*  ---------------------------------------------------------   
*/
module.exports = function romanNumeralConverter(input)
{
    const translator = [
        { symbol:"M", value:1000 },
        { symbol:"C", value:100 },
        { symbol:"L", value:50 },
        { symbol:"X", value:10 },
        { symbol:"V", value:5 },
        { symbol:"I", value:1 }
    ]
    var resultString = "";
    if (input <= 0 || input > 3999 || typeof input != "number")
    {
        resultString = "ERROR: Cannot convert - input out of bounds (conversion possible on integer inputs 1-3999)";
    } else
    {
        var i = 0;
        while (input > 0)
        {
            for (var j = Math.floor(input/translator[i].value); j > 0; j--)
            {
                resultString = resultString.concat(translator[i].symbol);
            }
            input = input % translator[i].value;
            i++;
        }

    }
    return resultString;
}
