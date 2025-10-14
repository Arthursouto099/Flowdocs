# 🗂️ FlowDocs — MVP de Gestão de Processos e Documentos

Projeto criado para gestão e controle de documentos corporativos utilizando:
- **Prisma ORM**
- **Supabase (PostgreSQL + Storage)**
- **TypeScript + Express**
- Integração segura com **autenticação** e **políticas RLS**

---

## 🚀 Visão Geral

O **FlowDocs** é um MVP que gerencia processos e arquivos corporativos com rastreabilidade completa.

Fluxo principal:
1. Um **usuário autenticado** cria um **processo**.
2. O usuário **envia arquivos** relacionados (PDFs, imagens, etc.).
3. O sistema registra automaticamente **logs de atividade**.
4. Os arquivos são armazenados no **Supabase Storage**, e os metadados no **PostgreSQL** via Prisma.

---


## 🌐 Variáveis de Ambiente (`.env`)

Antes de iniciar o projeto, configure o arquivo `.env` na raiz do projeto com suas credenciais do **Supabase** e do **PostgreSQL**.

```env
# Banco de Dados (Prisma)
DATABASE_URL="postgresql://postgres:<PASSWORD>@db.<INSTANCE>.supabase.co:5432/postgres"

# Configuração do Supabase
SUPABASE_URL="https://<INSTANCE>.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="<YOUR_SERVICE_ROLE_KEY>"



---

## 🧱 Estrutura do Banco (Prisma Schema)

```prisma
model users {
  id           String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name         String
  email        String         @unique
  role         String?        @default("COLABORADOR")
  created_at   DateTime?      @default(now()) @db.Timestamp(6)
  updated_at   DateTime?      @default(now()) @db.Timestamp(6)
  activity_log activity_log[]
  files        files[]
  processes    processes[]
}

model processes {
  id          String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name        String
  description String?
  status      String?   @default("ATIVO")
  created_at  DateTime? @default(now()) @db.Timestamp(6)
  updated_at  DateTime? @default(now()) @db.Timestamp(6)
  created_by  String?   @db.Uuid
  files       files[]
  users       users?    @relation(fields: [created_by], references: [id])
}

model files {
  id           String         @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  name         String
  file_url     String
  type         String?        @default("OTHER")
  size         Int?
  uploaded_at  DateTime?      @default(now()) @db.Timestamp(6)
  uploaded_by  String?        @db.Uuid
  process_id   String?        @db.Uuid
  activity_log activity_log[]
  processes    processes?     @relation(fields: [process_id], references: [id])
  users        users?         @relation(fields: [uploaded_by], references: [id])
}

model activity_log {
  id         String    @id @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
  action     String?
  message    String?
  created_at DateTime? @default(now()) @db.Timestamp(6)
  file_id    String?   @db.Uuid
  user_id    String?   @db.Uuid
  files      files?    @relation(fields: [file_id], references: [id])
  users      users?    @relation(fields: [user_id], references: [id])
}
