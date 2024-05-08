#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <dirent.h>
#include <sys/stat.h>
#include <time.h>

struct film
{
    char* title;
    int year;
    char* langs;
    double rating;
    struct film *next;
};

struct directory
{
    struct dirent* dir;
    struct stat* stats;
};
struct film* ReadFileData(FILE* file);
struct film* CreateFilm(char* data);
void DisplayFilms(struct film* f);
void FreeFilms(struct film *head);
void InteractiveLoop();
int PromptForInput(char* prompt, int min, int max);
void SelectFileToProcess();
void ProcessFile(struct film *head);
void LargestFile(FILE *file);
void SmallestFile(FILE *file);
void SpecifyFileName(FILE *file);
// void ShowFilmsByYear(struct film *head);
// void ShowFilmsByLang(struct film *head);
// void ShowHighestRatedByYear(struct film *head);
