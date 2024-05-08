CC=cc --std=gnu99 -g

all: exe

exe: main.c movies.o 
	$(CC) main.c movies.o -o movies

movies.o: movies.c movies.h
	$(CC) -c movies.c

clean:
	rm -f movies movies.o
