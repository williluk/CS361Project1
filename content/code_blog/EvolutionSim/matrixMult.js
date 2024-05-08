const U_BIAS = 0.5
function sigmoid(x, colSize)
{
    return 1 / (1 + Math.pow(Math.E, (-x/colSize)));
} 

function flattenMatrix(matrix)
{
    return matrix.flat(Infinity);
}

function multMatrixByVector(flatMatrix, vector, matrixH) 
{
    var out = new Array(matrixH).fill(0)
    var j
    for (var i = 0; i < flatMatrix.length; i++)
    {   
        j = Math.floor(i / vector.length)
        out[j] += (flatMatrix[i] * vector[j])
        if (i % vector.length == vector.length - 1) { 
            out[j] += U_BIAS
            sigmoid(out[j]) 
        }
    }
    return out;
}
