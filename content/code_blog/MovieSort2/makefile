CC=cc --std=gnu99 -g

all: exe

exe: main.c movies.o 
	$(CC) main.c movies.o -o movies_by_year

movies.o: movies.c movies.h
	$(CC) -c movies.c

clean:
	rm -f movies_by_year movies.o

superclean:
	rm -f movies_by_year movies.o
	ls | grep -P "^williluk.movies" | xargs -d"\n" rm -r
	