/*
  Warnings:

  - A unique constraint covering the columns `[filePath,artistId,albumId]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "queue_jobs" (
    "id" BIGSERIAL NOT NULL,
    "queue" TEXT NOT NULL,
    "key" TEXT,
    "cron" TEXT,
    "payload" JSONB,
    "result" JSONB,
    "error" JSONB,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER,
    "runAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notBefore" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "queue_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "queue_jobs_queue_priority_runAt_finishedAt_idx" ON "queue_jobs"("queue", "priority", "runAt", "finishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "queue_jobs_key_runAt_key" ON "queue_jobs"("key", "runAt");

-- CreateIndex
CREATE INDEX "Song_title_albumId_artistId_idx" ON "Song"("title", "albumId", "artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_filePath_artistId_albumId_key" ON "Song"("filePath", "artistId", "albumId");
