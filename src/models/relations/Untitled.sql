CREATE TABLE "User" (
  "favorites" [STRING],
  "projects" [STRING],
  "id" UUID UNIQUE PRIMARY KEY NOT NULL,
  "admin" BOLEAN NOT NULL DEFAULT false,
  "email" STRING NOT NULL,
  "password" STRING NOT NULL,
  "name" STRING,
  "lastName" STRING,
  "userName" STRING,
  "image" STRING,
  "linkedin" STRING,
  "github" STRING,
  "twitter" STRING,
  "whatsapp" STRING,
  "posts" [STRING]
);

CREATE TABLE "Project" (
  "title" STRING NOT NULL,
  "description" TEXT NOT NULL,
  "image" [TEXT] NOT NULL,
  "linkVideo" STRING NOT NULL,
  "linkRepo" STRING NOT NULL,
  "linkDeploy" STRING NOT NULL,
  "id" UUID UNIQUE PRIMARY KEY NOT NULL,
  "owners" [STRING] NOT NULL,
  "likes" [STRING],
  "techs" [STRING],
  "comments" [STRING]
);

CREATE TABLE "Post" (
  "likes" [STRING],
  "owner" [STRING] NOT NULL,
  "comments" [STRING],
  "id" UUID UNIQUE PRIMARY KEY NOT NULL,
  "type" ENUM NOT NULL,
  "content" TEXT NOT NULL
);

CREATE TABLE "Comment" (
  "id" UUID UNIQUE PRIMARY KEY NOT NULL,
  "content" TEXT NOT NULL,
  "likes" [STRING],
  "owner" [STRING] NOT NULL
);

CREATE TABLE "Tech" (
  "id" UUID UNIQUE PRIMARY KEY NOT NULL,
  "name" STRING NOT NULL
);

COMMENT ON COLUMN "Project"."owners" IS 'ref to owner';

COMMENT ON COLUMN "Post"."owner" IS 'ref to owners';

COMMENT ON COLUMN "Post"."type" IS 'BLOG, FORO';

COMMENT ON COLUMN "Post"."content" IS 'Content of the post';

COMMENT ON COLUMN "Comment"."content" IS 'Content of the comment';

COMMENT ON COLUMN "Comment"."owner" IS 'ref to owner';

COMMENT ON COLUMN "Tech"."name" IS 'Type of technology';

ALTER TABLE "Project" ADD FOREIGN KEY ("id") REFERENCES "User" ("favorites");

ALTER TABLE "Project" ADD FOREIGN KEY ("id") REFERENCES "User" ("projects");

ALTER TABLE "Post" ADD FOREIGN KEY ("id") REFERENCES "User" ("posts");

CREATE TABLE "User_Project" (
  "User_id" UUID,
  "Project_owners" [STRING],
  PRIMARY KEY ("User_id", "Project_owners")
);

ALTER TABLE "User_Project" ADD FOREIGN KEY ("User_id") REFERENCES "User" ("id");

ALTER TABLE "User_Project" ADD FOREIGN KEY ("Project_owners") REFERENCES "Project" ("owners");


CREATE TABLE "User_Project(1)" (
  "User_id" UUID,
  "Project_likes" [STRING],
  PRIMARY KEY ("User_id", "Project_likes")
);

ALTER TABLE "User_Project(1)" ADD FOREIGN KEY ("User_id") REFERENCES "User" ("id");

ALTER TABLE "User_Project(1)" ADD FOREIGN KEY ("Project_likes") REFERENCES "Project" ("likes");


CREATE TABLE "Tech_Project" (
  "Tech_id" UUID,
  "Project_techs" [STRING],
  PRIMARY KEY ("Tech_id", "Project_techs")
);

ALTER TABLE "Tech_Project" ADD FOREIGN KEY ("Tech_id") REFERENCES "Tech" ("id");

ALTER TABLE "Tech_Project" ADD FOREIGN KEY ("Project_techs") REFERENCES "Project" ("techs");


ALTER TABLE "Comment" ADD FOREIGN KEY ("id") REFERENCES "Project" ("comments");

CREATE TABLE "User_Post" (
  "User_id" UUID,
  "Post_likes" [STRING],
  PRIMARY KEY ("User_id", "Post_likes")
);

ALTER TABLE "User_Post" ADD FOREIGN KEY ("User_id") REFERENCES "User" ("id");

ALTER TABLE "User_Post" ADD FOREIGN KEY ("Post_likes") REFERENCES "Post" ("likes");


ALTER TABLE "Post" ADD FOREIGN KEY ("owner") REFERENCES "User" ("id");

ALTER TABLE "Comment" ADD FOREIGN KEY ("id") REFERENCES "Post" ("comments");

CREATE TABLE "User_Comment" (
  "User_id" UUID,
  "Comment_likes" [STRING],
  PRIMARY KEY ("User_id", "Comment_likes")
);

ALTER TABLE "User_Comment" ADD FOREIGN KEY ("User_id") REFERENCES "User" ("id");

ALTER TABLE "User_Comment" ADD FOREIGN KEY ("Comment_likes") REFERENCES "Comment" ("likes");


ALTER TABLE "Comment" ADD FOREIGN KEY ("owner") REFERENCES "User" ("id");
