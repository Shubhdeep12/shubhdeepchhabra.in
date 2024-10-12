-- CreateTable
CREATE TABLE "Stats" (
    "slug" VARCHAR(128) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Reactions" (
    "slug" VARCHAR(128) NOT NULL,
    "like" BIGINT NOT NULL DEFAULT 0,
    "love" BIGINT NOT NULL DEFAULT 0,
    "bookmark" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "isLoved" BOOLEAN NOT NULL DEFAULT false,
    "isBookmarked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
