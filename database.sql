CREATE TABLE koala(
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR (20) NOT NULL,
	"gender" BOOLEAN DEFAULT TRUE,
	"age" INT,
    "ready" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (250) NOT NULL
);

INSERT INTO "koala" ("name", "gender", "age", "ready", "notes")
VALUES ('Scotty', TRUE, 4, TRUE, 'Born in Guatemala'),
('Jean', FALSE, 5, TRUE, 'Allergic to lots of lava'),
('Ororo', FALSE, 7, FALSE, 'Loves listening to Paula (Abdul)'),
('Logan', TRUE, 15, FALSE, 'Loves the sauna'), 
('Charlie', TRUE, 9, TRUE, 'Favorite band is Nirvana'),
('Betsy' , FALSE, 4, TRUE, 'Has a pet iguana');



-- | id | name    | gender | age | ready_to_transer | notes                            |
|----|---------|--------|-----|------------------|----------------------------------|
| 1  | Scotty  | M      | 4   | Y                | Born in Guatemala                |
| 2  | Jean    | F      | 5   | Y                | Allergic to lots of lava         |
| 3  | Ororo   | F      | 7   | N                | Loves listening to Paula (Abdul) |
| 4  | Logan   | M      | 15  | N                | Loves the sauna                  |
| 5  | Charlie | M      | 9   | Y                | Favorite band is Nirvana         |
| 6  | Betsy   | F      | 4   | Y                | Has a pet iguana                 |