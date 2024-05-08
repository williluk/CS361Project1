#include "movies.h"
#include <sys/types.h>

/*----------------------------------------------------------------------------------------------
* ReadFileData()
*       Description:    Reads the movie's title, year, languages, and rating from a csv file and compiles that data
*                           into a linked list of film objects. It is expected that the given csv file has a line of 
*                           column headers at the top, and that the ',' character is used as the delimiter. 
*       Parameters:     filename = the char array name of the file to read data from
*       Returns:        struct film* = a pointer to the head film object of the linked list that is created
*-----------------------------------------------------------------------------------------------
*/
struct film* ReadFileData(char* filename)
{
    FILE *file = fopen(filename, "r");

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
    printf("Processed file %s and parsed data for %d movies\n", filename, num);
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
void InteractiveLoop(struct film* head)
{
    int flag = 0;
    
    while (flag == 0)
    {
        printf("\n1. Show movies released in the specified year\n2. Show highest rated movie for each year\n3. Show the title and year of release of all movies in a specific language\n4. Exit from the program");
        switch(PromptForInput("\n\nEnter a choice from 1 to 4:", 1, 4))
        {
            case 1:
                ShowFilmsByYear(head);
                break;
            case 2:
                ShowHighestRatedByYear(head);
                break;
            case 3:
                ShowFilmsByLang(head);
                break;
            case 4:
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
* ShowFilmsByYear()
*       Description:    Displays all of the films with a given year value.    
*       Parameters:     head = the head of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void ShowFilmsByYear(struct film *head)
{
    struct film *currentFilm = head;
    struct film *nextFilm = head;
    int num = 0;
    int year = PromptForInput("\nPlease enter a year:", 1900, 2021);
    do 
    {
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        if (currentFilm->year == year)
        {
            printf("%s\n",currentFilm->title);
            num++;
        }
        
    } while (nextFilm);
    if (num == 0) printf("No movies found with that release year.\n");
}

/*----------------------------------------------------------------------------------------------
* ShowHighestRatedByYear()
*       Description:    Displays the highest rated film for each year    
*       Parameters:     head = the head of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void ShowHighestRatedByYear(struct film *head)
{
    struct film *years[50] = {0};
    int size = 0;
    int addFlag = 0;

    struct film *currentFilm = head;
    struct film *nextFilm = head;
    do
    {
        //printf("checking film %s", currentFilm->title);
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        addFlag = 0;
        for (int i = 0; i < size; i++)
        {
            if (currentFilm->year == years[i]->year)
            {
                addFlag = 1;
                if (currentFilm->rating > years[i]->rating)
                {
                    years[i] = currentFilm;
                }
            }
        }
        if (addFlag == 0) 
        {
            size++;
            years[size - 1] = currentFilm;
        }
    } while (nextFilm);

    for (int i = 0; i < size; i++)
    {
        struct film* f = years[i];
        printf("%d %.1f %s\n", f->year, f->rating, f->title);
    }
    
}

/*----------------------------------------------------------------------------------------------
* ShowFilmsByLang()
*       Description:    Displays all the films with a given language option    
*       Parameters:     head = the head of the linked list
*       Returns:        n/a
*-----------------------------------------------------------------------------------------------
*/
void ShowFilmsByLang(struct film *head)
{
    struct film *currentFilm = head;
    struct film *nextFilm = head;
    int num = 0;
    char lang [80];
    printf("\nPlease enter a language: ");
    scanf("%79s", lang);
    do 
    {
        currentFilm = nextFilm;
        nextFilm = currentFilm->next;
        if (strstr(currentFilm->langs, lang) != NULL)
        {
            printf("%d %s\n", currentFilm->year, currentFilm->title);
            num++;
        }
        
    } while (nextFilm);
    if (num == 0) printf("No movies found in that language.\n");
}

