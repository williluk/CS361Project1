#include <stdlib.h>
#include <iostream>
#include <fstream>
#include <unistd.h>
#include <string>

using namespace std;

const string path = "~/CS361/images/";

int main()
{

    string oldFileTxt;
    string newFileTxt;
    fstream myFile("image-service.txt");
    myFile >> oldFileTxt;
    myFile.close();
    while(1 == 1)
    {
        myFile.open("image-service.txt");
        myFile >> newFileTxt;

        if (oldFileTxt != newFileTxt)
        {
            myFile.close();
            sleep(1);
            myFile.open("image-service.txt", std::fstream::out | std::fstream::trunc);

            int imgId = stoi(newFileTxt) % 5;
            myFile << path << imgId << ".jpg";
            
            myFile.close();
            myFile.open("image-service.txt");
            myFile >> newFileTxt;
        }
        oldFileTxt = newFileTxt;
        myFile.close();
        sleep(1);
    }

    return 0;
}

