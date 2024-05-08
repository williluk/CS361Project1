#include <stdio.h>
#include <stdlib.h>
#include <string.h>


struct film
{
    char* title;
    int year;
    char* langs;
    double rating;
    struct film *next;
};
struct film* ReadFileData(char* filename);
struct film* CreateFilm(char* data);
void DisplayFilms(struct film* f);
void FreeFilms(struct film *head);
void InteractiveLoop(struct film* head);
int PromptForInput(char* prompt, int min, int max);
void ShowFilmsByYear(struct film *head);
void ShowFilmsByLang(struct film *head);
void ShowHighestRatedByYear(struct film *head);
