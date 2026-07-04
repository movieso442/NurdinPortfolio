create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(trim(name)) between 2 and 120),
    email text not null check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    message text not null check (char_length(trim(message)) between 5 and 5000),
    source_url text,
    user_agent text,
    created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "portfolio_contact_insert_public" on public.contact_messages;

create policy "portfolio_contact_insert_public"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

comment on table public.contact_messages is
'Contact form submissions from cybernurdin.com. Public clients may insert only; no public select/update/delete policy is defined.';
