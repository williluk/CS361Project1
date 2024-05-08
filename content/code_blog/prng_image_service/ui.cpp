#include <stdlib.h>
#include <iostream>
#include <fstream>
#include <unistd.h>
#include <string>

using namespace std;

string get_prng();
string get_img_path(string id);

int main()
{
    while(1 == 1)
    {
        cout << endl << endl << "------ Random Image Search -------" << endl << endl;
        cout << "   - Would you like to search an image? (y = yes, n = no):";
        char input;
        cin >> input;
        if (input == 'y')
        {
            cout << "   - Retrieving your image... " << endl;
            string i = get_prng();
            string out = get_img_path(i);
            cout << "   - " << out << endl;
        } if (input == 'n')
        {
            return 0;
        }
    }
    return 0;
}

string get_prng()
{
    fstream myFile("prng-service.txt", std::fstream::out | std::fstream::trunc);
    myFile << "run";
    myFile.close();

    for (int i = 0; i < 10; i++)
    {
        string result;
        myFile.open("prng-service.txt");
        myFile >> result;

        if (result != "run")
        {
            sleep(1);
            myFile.close();
            myFile.open("prng-service.txt");
            myFile >> result;
            return result;
        } else
        {
            sleep(1);
        }
    }
    cout << "   - There was a problem running prng service. Is the prng program running?" << endl;
    return "-1";
}

string get_img_path(string id)
{
    fstream myFile("image-service.txt", std::fstream::out | std::fstream::trunc);
    myFile << id;
    myFile.close();

    for (int i = 0; i < 20; i++)
    {
        string result;
        myFile.open("image-service.txt");
        myFile >> result;

        if (result != id)
        {
            sleep(1);
            myFile.close();
            myFile.open("image-service.txt");
            myFile >> result;
            return result;
        } else
        {
            sleep(1);
        }
    }
    cout << "   - There was a problem running prng service. Is the prng program running?" << endl;
    return "-1";
}