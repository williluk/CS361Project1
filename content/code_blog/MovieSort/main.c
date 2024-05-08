#include "movies.h"

int main(int argc, char *argv[])
{
    if (argc == 2)
    {
        struct film *f = ReadFileData(argv[1]);
        InteractiveLoop(f);
        FreeFilms(f);
        return 0;
    } else
    {
        printf("Incorrect argument number\n");
        return 1;
    }
    
    
}