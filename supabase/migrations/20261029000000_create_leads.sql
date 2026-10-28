-- Cash-offer leads submitted from the website's multi-step offer form.
-- No auth yet: anyone may INSERT a lead, but nobody using the publishable key
-- can read, change or delete leads (they contain personal contact details).

create table public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  address       text not null check (char_length(address) between 5 and 300),
  condition     text check (condition in ('Needs Lots of Work', 'Needs Some Repairs', 'Just Needs Cleaning Out', 'Move-In Ready')),
  timeline      text check (timeline in ('Immediately', 'Within 1 month', 'Within 3 months', '3+ months')),
  reason        text check (reason in ('Financial Reasons', 'Inherited Property', 'Tired of Managing', 'Relocation', 'Divorce', 'Other')),
  is_listed     boolean not null,
  asking_price  integer check (asking_price between 0 and 999999999),
  full_name     text not null check (char_length(full_name) between 2 and 120),
  phone         text not null check (phone ~ '^[0-9]{10}$'),
  email         text not null check (char_length(email) <= 254 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$')
);

comment on table public.leads is 'Cash-offer requests from the website form. Insert-only for anon/authenticated.';

create index leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Only allow inserts through the Data API; no select/update/delete for public roles.
revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;

create policy "Anyone can submit a lead"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);
