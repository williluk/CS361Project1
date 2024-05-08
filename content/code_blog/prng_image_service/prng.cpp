#include <stdlib.h>
#include <iostream>
#include <fstream>
#include <unistd.h>
#include <time.h>

using namespace std;

int main()
{
    srand(time(NULL));

    string oldFileTxt;
    string newFileTxt;
    fstream myFile("prng-service.txt");
    myFile >> oldFileTxt;
    myFile.close();
    while(1 == 1)
    {
        myFile.open("prng-service.txt");
        myFile >> newFileTxt;

        if (oldFileTxt != newFileTxt && newFileTxt == "run")
        {
            myFile.close();
            myFile.open("prng-service.txt", std::fstream::out | std::fstream::trunc);
            myFile << rand();
            myFile.close();
            myFile.open("prng-service.txt");
            myFile >> newFileTxt;
        }
        oldFileTxt = newFileTxt;
        myFile.close();
        sleep(1);
    }

    return 0;
}

