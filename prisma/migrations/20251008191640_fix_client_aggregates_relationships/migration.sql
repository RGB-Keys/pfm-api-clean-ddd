-- DropForeignKey
ALTER TABLE "public"."clients" DROP CONSTRAINT "clients_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."expenses" DROP CONSTRAINT "expenses_clientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."goals" DROP CONSTRAINT "goals_clientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."incomes" DROP CONSTRAINT "incomes_clientId_fkey";

-- DropIndex
DROP INDEX "public"."expenses_clientId_key";

-- DropIndex
DROP INDEX "public"."goals_clientId_key";

-- DropIndex
DROP INDEX "public"."incomes_clientId_key";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
