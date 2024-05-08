#include "movies.h"

/*----------------------------------------------------------------------------------------------
* ReadFileData()
*       Description:    Reads the movie's title, year, languages, and rating from a csv file and compiles that data
*                           into a linked list of film objects. It is expected that the given csv file has a line of 
*                           column headers at the top, and that the ',' character is used as the delimiter. 
*       Parameters:     filename = the char array name of the file to read data from
*       Returns:        struct film* = a pointer to the head film object of the linked list that is created
*-----------------------------------------------------------------------------------------------
*/
struct film* ReadFileData(FILE* file)
{
    char *currLine = NULL;
    size_t len = 0;
    int nread;
    char *token;

    int num = 0;

    //ditch the column header line
    getline(&currLine, &len, file);

    // The head of the linked list
    struct film *head = NULL;
    // The tail of the linked list
    struct film *tail = NULL;

    // Read the file line by line
    while ((nread = getline(&currLine, &len, file)) != -1)
    {
        // Get a new student node corresponding to the current line
        struct film *newNode = CreateFilm(currLine);
        num++;
        // Is this the first node in the linked list?
        if (head == NULL)
        {
            // This is the first node in the linked link
            // Set the head and the tail to this node
            head = newNode;
            tail = newNode;
        }
        else
        {
            // This is not the first node.
            // Add this node to the list and advance the tail
            tail->next = newNode;
            tail = newNode;
        }
    }
    free(currLine);
    fclose(file);
    return head;
}

/*----------------------------------------------------------------------------------------------
* CreateFilm()
*       Description:    Creates a new instance of the film struct and stores the given data inside. This
*                           function also initialized the 'next' varaible to be NULL by default.  
*       Parameters:     data = a c string of data in the following order and format: "name,year,[language1;language2],rating"
*       Returns:        struct film* = a pointer to the newly created film struct instance
*-----------------------------------------------------------------------------------------------
*/
struct film* CreateFilm(char* data)
{
    struct film *newFilm = malloc(sizeof(struct film));

    char *saveptr;

    // first strtok_r call gets the title
    char *token = strtok_r(data, ",", &saveptr);
    newFilm->title = calloc(strlen(token) + 1, sizeof(char));
    strcpy(newFilm->title, token);

    // second strtok_r call gets the year
    token = strtok_r(NULL, ",", &saveptr);
    newFilm->year = atoi(token);

    // third strtok_r call gets the languages
    token = strtok_r(NULL, ",", &saveptr);
    newFilm->langs = calloc(strlen(token) + 1, sizeof(char));
    strcpy(newFilm->langs, token);

    // fourth strtok_r call gets the rating
    token = strtok_r(NULL, "\n", &saveptr);
    newFilm->rating = strtod(token, NULL);

    newFilm->next = NULL;
    return newFilm;
}

/*----------------------------------------------------------------------------------------------
* DisplayFilm()
*       Description:    Prints the film linked list to the terminal 
*       Parameters:     f = the head film object of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void DisplayFilms(struct film* f)
{
    struct film *currentFilm = f;
    struct film *nextFilm = f;
    do 
    {
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        printf("\nTitle: %s  Year: %d  Languages: %s  Rating: %.1f  \n", f->title, f->year, f->langs, f->rating);
        
    } while (nextFilm);
    
}

/*----------------------------------------------------------------------------------------------
* FreeFilms()
*       Description:    Frees all of the memory associated with the linked list of films.  
*       Parameters:     head = the head of the linked list of films
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void FreeFilms(struct film *head)
{
    struct film *currentFilm = head;
    struct film *nextFilm = head;
    do 
    {
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        free(currentFilm->title);
        free(currentFilm->langs);
        free(currentFilm);
    } while (nextFilm);
}

/*----------------------------------------------------------------------------------------------
* InteractiveLoop()
*       Description:    Runs a loop that asks for user input and determines the programs functionality.
*                           Loops until the user ops to break the loop.    
*       Parameters:     head = the head film object of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void InteractiveLoop()
{
    int flag = 0;
    
    while (flag == 0)
    {
        printf("\n1. Select file to process\n2. Exit the program");
        switch(PromptForInput("\n\nEnter a choice of 1 or 2:", 1, 2))
        {
            case 1:
                SelectFileToProcess();
                break;
            case 2:
                flag = 1;
                break;
        }
    }   
}

/*----------------------------------------------------------------------------------------------
* PromptForInput()
*       Description:    Prompts the user for an input and does some basic input varification before
*                           returning the provided input.    
*       Parameters:     prompt = a string to be printed to prompt the user
*                       min = the minimum acceptable input value 
*                       max = the maximum acceptable input value
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
int PromptForInput(char* prompt, int min, int max)
{
    int input = min - 1;
    printf(prompt);
    scanf("%d", &input);
    if (input < min || input > max)
    {
        printf("\nInput is out of valid range. Please try again.");
        return PromptForInput(prompt, min, max);
    } else return input;
}

/*----------------------------------------------------------------------------------------------
* SelectFileToProcess()
*       Description:    Loops an interactive prompt for the user to select which file to select.     
*       Parameters:     n/a
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void SelectFileToProcess()
{
    int flag = 0;
    FILE *file = NULL;
    struct film *f;
    while (flag == 0)
    {
        printf("\nWhich file would you like to process?\n1. Largest file\n2. Smallest file\n3. Specify file name\n4. Back");
        switch(PromptForInput("\n\nEnter a choice from 1 to 4:", 1, 4))
        {
            case 1:
                LargestFile(file);           
                break;
            case 2:
                SmallestFile(file);
                break;
            case 3:
                SpecifyFileName(file); 
                break;
            case 4:
                flag = 1;
                break;
        }
    }  


}

/*----------------------------------------------------------------------------------------------
* LargestFile()
*       Description:    Finds the largest file in the directory that contains "movies_" in the file name
*                           and is of the csv type and returns it using the output parameter.     
*       Parameters:     file = an output parameter for returning the open file.
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void LargestFile(FILE *file)
{
    DIR *dir = opendir(".");
    struct dirent* x = readdir(dir);
    struct dirent* largest = NULL;
    struct stat st;
    stat(x->d_name, &st);
    struct stat largestSt = st;
    while (x)
    {
        if (strstr(x->d_name, ".csv") && strstr(x->d_name, "movies_"))
        {
            if (largest == NULL || st.st_size > largestSt.st_size)
            {
                largest = x;
                largestSt = st;
            }
        }
        x = readdir(dir);
        if (x) stat(x->d_name, &st);
    }
    if (largest == NULL)
    {
        printf("\nERROR: compatible file could not be found. Are you sure it is located in the program directory?");
    } else
    {
        printf("\nNow processing the chosen file named %s", largest->d_name);
        file = fopen(largest->d_name, "r");
        free(x);
        struct film *f = ReadFileData(file);
        ProcessFile(f);   
    }
    free(dir);
}

/*----------------------------------------------------------------------------------------------
* SmallestFile()
*       Description:    Finds the smallest file in the directory that contains "movies_" in the file name
*                           and is of the csv type and returns it using the output parameter.     
*       Parameters:     file = an output parameter for returning the open file.
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void SmallestFile(FILE *file)
{
    DIR *dir = opendir(".");
    struct dirent* x = readdir(dir);
    struct dirent* smallest = NULL;
    struct stat st;
    stat(x->d_name, &st);
    struct stat smallestSt = st;
    while (x)
    {
        if (strstr(x->d_name, ".csv") && strstr(x->d_name, "movies_"))
        {
            if (smallest == NULL || st.st_size < smallestSt.st_size)
            {
                smallest = x;
                smallestSt = st;
            }
        }
        x = readdir(dir);
        if (x) stat(x->d_name, &st);
    }
    if (smallest == NULL)
    {
        printf("\nERROR: compatible file could not be found. Are you sure it is located in the program directory?");
    } else
    {
        printf("\nNow processing the chosen file named %s", smallest->d_name);
        file = fopen(smallest->d_name, "r");
        free(x);
        struct film *f = ReadFileData(file);
        //ShowHighestRatedByYear(f);
        ProcessFile(f);
    }
}

/*----------------------------------------------------------------------------------------------
* SpecifyFileName()
*       Description:    Allows the user to specify a given file name and procceeds to open that file
*                           and set it to the output parameter pointer.   
*       Parameters:     file = an output parameter for returning the open file.
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void SpecifyFileName(FILE *file)
{
    char input[30];
    printf("\nPlease enter a filename: ");
    scanf("%s", input);
    file = fopen(input, "r");

    if (file == NULL)
    {
        printf("\nERROR: file of that name could not be found. Are you sure it is located in the program directory?");
        SpecifyFileName(file);
    }
    printf("\nNow processing the chosen file named %s", input);
    struct film *f = ReadFileData(file);
    ProcessFile(f);
}

/*----------------------------------------------------------------------------------------------
* ProcessFile()
*       Description:    Processes the file by creating a new directory in the program directory and 
*                           with files. One file is created for each year found in the given linked list
*                           of films, and they are populated with each film with that year.   
*       Parameters:     head = a pointer to the head of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void ProcessFile(struct film *head)
{
    srandom(time(NULL));
    char dirname[20];
    sprintf(dirname, "williluk.movies.%d", random() % 99999);
    mkdir(dirname, 0750);
    printf("\nCreated directory with name %s", dirname);

    int yearsBlacklist[50] = {0};
    int size = 0;
    struct film *currentFilm = head;
    struct film *nextFilm = head;
    int breakFlag = 0;

    FILE* file;
    do
    {
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        //printf("\nProcessing film %s", currentFilm->title);

        char filepath[50];
        char newLine[50];
        sprintf(filepath, "%s/%d.txt", dirname, currentFilm->year);
        size++;
        yearsBlacklist[size] = currentFilm->year;
        file = fopen(filepath, "a");
        chmod(filepath, 0640);
        sprintf(newLine, "%s\n", currentFilm->title);
        fputs(newLine, file);
        fclose(file);
        
    } while (nextFilm);
    FreeFilms(head);
}

// DEPRECIATED FUNCTIONS

/*----------------------------------------------------------------------------------------------
* ShowFilmsByYear()
*       Description:    Displays all of the films with a given year value.    
*       Parameters:     head = the head of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
// void ShowFilmsByYear(struct film *head)
// {
//     struct film *currentFilm = head;
//     struct film *nextFilm = head;
//     int num = 0;
//     int year = PromptForInput("\nPlease enter a year:", 1900, 2021);
//     do 
//     {
//         currentFilm = nextFilm;
//         nextFilm = currentFilm->next;
//         if (currentFilm->year == year)
//         {
//             printf("%s\n",currentFilm->title);
//             num++;
//         }
        
//     } while (nextFilm);
//     if (num == 0) printf("No movies found with that release year.\n");
// }

// /*----------------------------------------------------------------------------------------------
// * ShowHighestRatedByYear()
// *       Description:    Displays the highest rated film for each year    
// *       Parameters:     head = the head of the linked list
// *       Returns:        n/a
// *-----------------------------------------------------------------------------------------------
// */
// void ShowHighestRatedByYear(struct film *head)
// {
//     struct film *years[50] = {0};
//     int size = 0;
//     int addFlag = 0;

//     struct film *currentFilm = head;
//     struct film *nextFilm = head;
//     do
//     {
//         //printf("checking film %s", currentFilm->title);
//         currentFilm = nextFilm;
//         nextFilm = currentFilm->next;
//         addFlag = 0;
//         for (int i = 0; i < size; i++)
//         {
//             if (currentFilm->year == years[i]->year)
//             {
//                 addFlag = 1;
//                 if (currentFilm->rating > years[i]->rating)
//                 {
//                     years[i] = currentFilm;
//                 }
//             }
//         }
//         if (addFlag == 0) 
//         {
//             size++;
//             years[size - 1] = currentFilm;
//         }
//     } while (nextFilm);

//     for (int i = 0; i < size; i++)
//     {
//         struct film* f = years[i];
//         printf("%d %.1f %s\n", f->year, f->rating, f->title);
//     }
    
// }

// /*----------------------------------------------------------------------------------------------
// * ShowFilmsByLang()
// *       Description:    Displays all the films with a given language option    
// *       Parameters:     head = the head of the linked list
// *       Returns:        n/a
// *-----------------------------------------------------------------------------------------------
// */
// void ShowFilmsByLang(struct film *head)
// {
//     struct film *currentFilm = head;
//     struct film *nextFilm = head;
//     int num = 0;
//     char lang [80];
//     printf("\nPlease enter a language: ");
//     scanf("%79s", lang);
//     do 
//     {
//         currentFilm = nextFilm;
//         nextFilm = currentFilm->next;
//         if (strstr(currentFilm->langs, lang) != NULL)
//         {
//             printf("%d %s\n", currentFilm->year, currentFilm->title);
//             num++;
//         }
        
//     } while (nextFilm);
//     if (num == 0) printf("No movies found in that language.\n");
// }

