-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_key" ON "Todo"("id");
