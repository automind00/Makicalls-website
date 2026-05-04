-- =====================================================================
-- MakiCalls — contact submissions tablosu + admin RLS
-- =====================================================================
-- Supabase Dashboard → SQL Editor → New Query → bu dosyayı yapıştır → Run
-- =====================================================================

-- 1. Contact submissions tablosu
create table if not exists public.contact_submissions (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  status text not null default 'yeni' check (status in ('yeni', 'iletisim_kuruldu', 'kapandi')),
  notes text,
  user_agent text
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- 2. Admin kullanıcı whitelist tablosu
create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

-- Kendi admin e-mailini ekle (gerekirse e-mail değiştirip tekrar çalıştır)
insert into public.admin_users (email)
values ('ekremhndolu@gmail.com')
on conflict (email) do nothing;

-- 3. Row Level Security
alter table public.contact_submissions enable row level security;
alter table public.admin_users enable row level security;

-- 4. Policies — contact_submissions
-- Anonim ziyaretçiler form gönderebilir
drop policy if exists "anon can submit" on public.contact_submissions;
create policy "anon can submit"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Admin'ler tüm submission'ları görebilir
drop policy if exists "admins can read all" on public.contact_submissions;
create policy "admins can read all"
  on public.contact_submissions
  for select
  to authenticated
  using (
    auth.email() in (select email from public.admin_users)
  );

-- Admin'ler status/notes güncelleyebilir
drop policy if exists "admins can update" on public.contact_submissions;
create policy "admins can update"
  on public.contact_submissions
  for update
  to authenticated
  using (
    auth.email() in (select email from public.admin_users)
  )
  with check (
    auth.email() in (select email from public.admin_users)
  );

-- Admin'ler silebilir (gerekirse)
drop policy if exists "admins can delete" on public.contact_submissions;
create policy "admins can delete"
  on public.contact_submissions
  for delete
  to authenticated
  using (
    auth.email() in (select email from public.admin_users)
  );

-- 5. Policies — admin_users (kendi listenizi görebilesiniz, başkası giremesin)
drop policy if exists "admins can read whitelist" on public.admin_users;
create policy "admins can read whitelist"
  on public.admin_users
  for select
  to authenticated
  using (
    auth.email() in (select email from public.admin_users)
  );

-- 6. Realtime — yeni form geldiğinde admin sayfası anında güncellensin
alter publication supabase_realtime add table public.contact_submissions;

-- =====================================================================
-- Bitti! Test için: bir form gönderildiğinde tablo dolar.
-- Admin sayfasına /admin'den girilir (magic link e-mail).
-- =====================================================================
