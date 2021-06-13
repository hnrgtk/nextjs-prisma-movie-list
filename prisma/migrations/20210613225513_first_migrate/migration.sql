-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "rating" TEXT NOT NULL DEFAULT '',
    "watched" BOOLEAN NOT NULL DEFAULT false
);
