create table if not exists public.destination_notes (
    user_id uuid not null references auth.users(id) on delete cascade,
    day integer not null check (day between 1 and 20),
    destination_id text not null,
    content text not null,
    primary key (user_id, day)
);

alter table public.destination_notes enable row level security;

grant select, insert, update, delete
on public.destination_notes
to authenticated;

drop policy if exists "Users can read their own destination notes"
on public.destination_notes;
create policy "Users can read their own destination notes"
on public.destination_notes
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own destination notes"
on public.destination_notes;
create policy "Users can create their own destination notes"
on public.destination_notes
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own destination notes"
on public.destination_notes;
create policy "Users can update their own destination notes"
on public.destination_notes
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own destination notes"
on public.destination_notes;
create policy "Users can delete their own destination notes"
on public.destination_notes
for delete
to authenticated
using ((select auth.uid()) = user_id);
