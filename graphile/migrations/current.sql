-- Initial DB Setup
-- Based on https://www.graphile.org/postgraphile/postgresql-schema-design

/* 
  Extensions
*/
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";


/* 
  Schemas
*/
create schema if not exists app_private;
comment on schema app_private is '
The application uses two schemas: private and public. <br><br>

The `app_private` schema is intended to store tables, functions, and views intended to **ONLY** ever be exposed at the database layer. Not even an authenticated server connecting to the database should have access to these resources. <br><br>

Placing resources in this schema serves a few purposes:

1. Most importantly, critical authentication and ACL controls can be secured. By sequesting sensitive resources in the `app_private` schema, we help ensure that we never accidentally expose sensitive user information (like passwords, even if they''re hashed) or write access to ACLs. This is particularly important when using a far reaching tool like GraphQL which could inadvertly ''crawl'' over a portion of the DB and expose sensitive resources.
2. Less importantly but also very usefully, we can store resources (particularly functions and views) that are really only ever used by the database itself, not any connecting applications. E.g. a function for updating a table''s `updated_at` property is really only needed by the database itself to use on INSERT and WRITE triggers and wouldn''t be much use to a connecting application. Putting resources in the `app_private` schema for this reason helps keep application exposed resources clean and all useful (again, helpful when using a tool like Postgraphile that inspects the database schema and exposes GraphQL access to all database resources it can see).
';

create schema if not exists app_public;
comment on schema app_public is '
The public schema should only have resources that should be accessible by the server application layer. <br><br>

Row based security will add additional protections, so resources will not be widely accessible, but highly sensitive resources should still be sequestered in the `app_private` schema. <br><br>

Most ''normal'' application data will be stored in `app_public`.
';


/* 
  Roles

  These commands that need to be ran as the root DB user. 
  Not sure yet how to set it up so graphile-migrate can run these, especially in production...
*/
do $$
begin
  create role app_postgraphile login password 'zqDHRFx5fEYMbkq';
  exception when duplicate_object then
  RAISE NOTICE 'not creating role app_postgraphile -- it already exists';
end
$$;
comment on role app_postgraphile is 'This role is for the Postgraphile GraphQL instance(s).';
grant connect on database eventcast to app_postgraphile;

do $$
begin
  create role app_anonymous;
  exception when duplicate_object then
  RAISE NOTICE 'not creating role app_anonymous -- it already exists';
end
$$;
comment on role app_anonymous is '
Unauthenticated requests to the DB will be made as this role. This is the default role for all requests through the graph. Only if a user is successfully authenticated will they be able to access resources beyond the ones granted to this role. <br><br>

**Resources granted to this role should be considered completely public...may as well be on Wikipedia.**
';

-- Everything app_anonymous can do, app_postgraphile can do better.
grant app_anonymous to app_postgraphile;

do $$
begin
  create role app_user;
  exception when duplicate_object then
  RAISE NOTICE 'not creating role app_user -- it already exists';
end
$$;
comment on role app_user is '
Authenticated users will have database access using this role. Granting this role access to a resource is synonymous to exposing it on the Graph, but still requiring authentication. <br><br>

**Ensure all reasonable security provisions are in place on a resource before granting this role access to it.**
';

-- Everything app_user can do, app_postgraphile can do better.
grant app_user to app_postgraphile;

alter default privileges revoke execute on functions from public;

grant usage on schema app_public to app_anonymous, app_user;


drop function if exists app_private.set_updated_at cascade;
create function app_private.set_updated_at() returns trigger as $$
begin
  new.updated_at := current_timestamp;
  return new;
end;
$$ language plpgsql;
comment on function app_private.set_updated_at() is 'A simple helper function to set the udpated_at property of a row to the current timestamp. Primarily for use with triggers on pretty much every table.';

drop table if exists app_private.user_account cascade;
create table if not exists app_private.user_account (
  id                                      uuid not null default uuid_generate_v1mc(),

  created_at                              timestamp not null default now(),
  updated_at                              timestamp,

  email                                   text not null unique check (email ~* '^.+@.+\..+$'),
  email_confirmed                         boolean not null default false,
  password_hash                           text,
  security_stamp                          text,
  concurrency_stamp                       uuid not null default uuid_generate_v4(),
  phone_number                            character varying(50),
  phone_number_confirmed                  boolean not null default false,
  two_factor_enabled                      boolean not null default false,
  lockout_end                             timestamp without time zone,
  lockout_enabled                         boolean not null default false,
  access_failed_count                     smallint not null default 0,
  password_reset_email_sent_at            timestamp with time zone,
  reset_password_token                    text,
  reset_password_token_generated          timestamp with time zone,
  failed_reset_password_attempts          integer DEFAULT 0 NOT NULL,
  first_failed_reset_password_attempt     timestamp with time zone,

  -- Keys
  constraint user_account_pkey primary key (id),
  constraint user_account_email_key unique (email)
);

drop trigger if exists user_account_updated_at on app_private.user_account;
create trigger user_account_updated_at before update
  on app_private.user_account
  for each row
  execute procedure app_private.set_updated_at();

comment on table app_private.user_account is 
'
`user_account` is the primary record for an application user. <br><br>

The `id` on this table is synonymous with a `user_id` and is considered *the primary identifier* for any user. <br>
The `not null unique` constraint for the `email` column, effectively guarantees that a user''s ID will match with their email address. <br><br>

**This table is a private schema table and information from it should never be exposed to any application, not even a server.** <br><br>

Take care to ensure no functions or views are ever defined that inadvertantly expose values from this table or the ability to query it directly.
';
comment on column app_private.user_account.id is 'A user''s primary ID used throughout the application and schema referenced as `user_id`.';
comment on column app_private.user_account.created_at is 'When the user''s account was created.';
comment on column app_private.user_account.updated_at is 'The last time the user''s account was updated.';
comment on column app_private.user_account.email is 'The unique email address of the user.';
comment on column app_private.user_account.email_confirmed is '**NOT IMPLEMENTED**: whether a user''s ownerhsip of the `email` address is confirmed.';
comment on column app_private.user_account.password_hash is 'An opaque hash of the user''s password.';
comment on column app_private.user_account.security_stamp is '**NOT IMPLEMENTED**: can be used to ensure a valid authenthication request.';
comment on column app_private.user_account.concurrency_stamp is '**NOT IMPLEMENTED**: not sure what this could be used for...';
comment on column app_private.user_account.phone_number is '**NOT IMPLEMENTED**: a user''s phone number for 2fa.';
comment on column app_private.user_account.phone_number_confirmed is '**NOT IMPLEMENTED**: whether a user''s ownerhsip of the `phone_number` is confirmed.';
comment on column app_private.user_account.two_factor_enabled is '**NOT IMPLEMENTED**: whether a user has enabled 2fa.';
comment on column app_private.user_account.lockout_end is '**NOT IMPLEMENTED**: when a user''s lockout will end.';
comment on column app_private.user_account.lockout_enabled is '**NOT IMPLEMENTED**: whether a user has been locked out due to too many invalid login attempts.';
comment on column app_private.user_account.access_failed_count is '**NOT IMPLEMENTED**: how many failed log in attempts in a row a user has tried.';

drop table if exists app_public.user_profile cascade;
create table app_public.user_profile (
  user_id      uuid not null, -- Purposefuly does not include a default - it should always be the ID from the corresponding user_account table.

  created_at   timestamp not null default now(),
  updated_at   timestamp,

  first_name   character varying(100),
  last_name    character varying(100),

  -- Keys
  CONSTRAINT user_profile_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_profile_user_account_fkey FOREIGN KEY (user_id)
      REFERENCES app_private.user_account (id) MATCH SIMPLE
      ON DELETE CASCADE ON UPDATE CASCADE
);

grant update, delete on table app_public.user_profile to app_user;

drop trigger if exists user_profile_updated_at on app_public.user_profile;
create trigger user_profile_updated_at before update
  on app_public.user_profile
  for each row
  execute procedure app_private.set_updated_at();

comment on table app_public.user_profile is '
`user_profile` is a user''s publicly visible demographic information. <br><br>

A profile maintains a one-to-one connection with a user''s `user_account` via the `user_id` foreign key. This is used as the primary key on this table to enforce the one-to-one relationship and not allow a one-to-many (more than one `user_profile` for a `user_account`).
';
comment on column app_public.user_profile.user_id is 'A foreign key reference to the user''s `user_id` in their `user_account` record.';
comment on column app_public.user_profile.created_at is 'When the user''s profile was created.';
comment on column app_public.user_profile.updated_at is 'The last time the user''s profile was updated.';
comment on column app_public.user_profile.first_name is 'The user''s first name.';
comment on column app_public.user_profile.last_name is 'The user''s last name.';

alter table app_public.user_profile enable row level security;

drop policy if exists select_user_profile on app_public.user_profile cascade;
create policy select_user_profile on app_public.user_profile for select
  using (true);

drop policy if exists update_user_profile on app_public.user_profile cascade;
create policy update_user_profile on app_public.user_profile for update to app_user
  using (user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);

drop policy if exists delete_user_profile on app_public.user_profile cascade;
create policy delete_user_profile on app_public.user_profile for delete to app_user
  using (user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid);


-- Example function that would be exposed via GraphQL
drop function if exists app_public.user_profile_full_name;
create function app_public.user_profile_full_name(user_profile app_public.user_profile) returns text as $$
  select user_profile.first_name || ' ' || user_profile.last_name
$$ language sql stable;
comment on function app_public.user_profile_full_name(app_public.user_profile) is 'A user''s full name which is a concatenation of their first and last name.';

grant execute on function app_public.user_profile_full_name(app_public.user_profile) to app_user;

drop function if exists app_private.assert_valid_password cascade;
create function app_private.assert_valid_password(new_password text) returns void as $$
begin
  -- TODO: add better assertions!
  if length(new_password) < 11 then
    raise exception 'Password is too weak' using errcode = 'WEAKP';
  end if;
end;
$$ language plpgsql;


drop type if exists app_public.jwt_token cascade;
create type app_public.jwt_token as (
  role text,
  user_id uuid,
  exp integer
);
comment on type app_public.jwt_token is '
(Postgraphile) This is a type specifically for Postgraphile. Postgraphile has an option to use this type to define the shape of a JWT when authenticating users.It would not necessarily be needed otherwise. <br><br>

Postgraphile does a couple things for us with this:

1. If a JWT is present it will set the role of the current transaction to whatever the value of the ''role'' property is in the JWT. You may be thinking - whoa wait, can''t a client then just set that property to whatever they want and make queries/mutations to the graph as any role they know of? Quick refresher: JWTs are generated server side and, unless signed with a crypto signature the server trusts, its payload won''t be accepted. So in this case, we have the XXXXXXX function generate (and sign) the JWT, setting the role on the (database) server, thereby ensuring that no client is able to claim that they are someone they aren''t.
2. Any properties added to the JWT type will be available via `select current_setting(''jwt.claims.pRoPeRtY_nAmE'', true);`. This is 
';


drop function if exists app_public.authenticate cascade;
create function app_public.authenticate(
  email text,
  password text
) returns app_public.jwt_token as $$
declare
  account app_private.user_account;
begin
  select a.* into account
  from app_private.user_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return (
      'app_user', -- The Postgres role we want the user to make requests as.
      account.id, 
      extract(epoch from (now() + interval '5 days'))
    )::app_public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function app_public.authenticate(text, text) is 'Creates a JWT token that will securely identify a user and give them certain permissions. This token expires in 5 days.';

grant execute on function app_public.authenticate(text, text) to app_anonymous, app_user;

drop function if exists app_private.refresh_token cascade;
create function app_private.refresh_token() returns app_public.jwt_token as $$
declare
  account app_public.user_profile;
begin
  select a.* into account from app_public.current_user() as a;

  if account is not null then
    return (
      'app_user', -- The Postgres role we want the user to make requests as.
      account.id, 
      extract(epoch from (now() + interval '5 days'))
    )::app_public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function app_private.refresh_token() is 'Allows a successfully authenticated user to refresh their access token for another 5 days.';

grant execute on function app_private.refresh_token() to app_user;


-- Following guidelines here: https://www.graphile.org/postgraphile/postgresql-schema-design/#storing-emails-and-passwords
drop function if exists app_public.register_user cascade;
create function app_public.register_user(
  first_name text,
  last_name text,
  _email text, 
  password text
) returns app_public.jwt_token as $$
declare
  user_profile app_public.user_profile;
  user_account app_private.user_account;
begin
  if exists(
    select 1
    from app_private.user_account
    where app_private.user_account.email = _email
  ) then
    raise exception 'An account already exists with this email address.' using errcode = 'TAKEN';
  end if;

  insert into app_private.user_account (email, password_hash) values
    (_email, crypt(password, gen_salt('bf')))
    returning * into user_account;

  insert into app_public.user_profile (user_id, first_name, last_name) values
    (user_account.id, first_name, last_name)
    returning * into user_profile;

  return (select app_public.authenticate(_email, password));

  --  return (
  --     'app_user', -- The Postgres role we want the user to make requests as.
  --     account.id, 
  --     extract(epoch from (now() + interval '2 days'))
  --   )::app_public.jwt_token;
end;
$$ language plpgsql strict security definer;

comment on function app_public.register_user(text, text, text, text) is 'Registers a single user creating their profile (user_profile) and an account (user_account).';

grant execute on function app_public.register_user(text, text, text, text) to app_anonymous;


drop function if exists app_public.current_user cascade;
create function app_public.current_user() returns app_public.user_profile as $$
  select *
  from app_public.user_profile
  where user_id = nullif(current_setting('jwt.claims.user_id', true), '')::uuid
$$ language sql stable security definer;
comment on function app_public.current_user() is 'Gets the user who was identified by our JWT.';

grant execute on function app_public.current_user() to app_anonymous, app_user;


drop function if exists app_public.send_password_reset_email cascade;
create function app_public.send_password_reset_email(_email text) returns void as $$
declare
  v_account app_private.user_account;
  v_token text;
  v_token_min_duration_between_emails interval = interval '3 minutes';
  v_token_max_duration interval = interval '3 days';
  v_now timestamptz = clock_timestamp();
  v_latest_attempt timestamptz;
begin
  select * into v_account from app_private.user_account where app_private.user_account.email = _email;
  
  if v_account.id is not null then
    -- See if we've sent a password reset within our email sending window.
    if v_account.password_reset_email_sent_at is not null and v_account.password_reset_email_sent_at > v_now - v_token_min_duration_between_emails then
      raise exception 'A password reset email has been requested too recently for this email address: %. Please wait a few minutes then try again.', _email using errcode = 'NOACT';
      return;
    end if;

    -- Fetch or generate reset token:
    update app_private.user_account
    set
      reset_password_token = (
        case
        when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
        then encode(gen_random_bytes(7), 'hex')
        else reset_password_token
        end
      ),
      reset_password_token_generated = (
        case
        when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
        then v_now
        else reset_password_token_generated
        end
      )
    where app_private.user_account.id = v_account.id returning reset_password_token into v_token;

    -- Don't allow spamming an email:
    update app_private.user_account
    set password_reset_email_sent_at = v_now
    where app_private.user_account.id = v_account.id;

    perform graphile_worker.add_job('sendForgotPasswordEmail', json_build_object('userId', v_account.id, 'email', v_account.email, 'token', v_token));
  else
    raise exception 'No account exists with this email address: %', _email using errcode = 'NOACT';
  end if;
end;
$$ language plpgsql strict security definer;

grant execute on function app_public.send_password_reset_email(text) to app_anonymous, app_user;


drop function if exists app_public.reset_password cascade;
create function app_public.reset_password(user_id uuid, reset_token text, new_password text) returns boolean as $$
declare
  v_account app_private.user_account;
  v_token_max_duration interval = interval '3 days';
begin
  select * into v_account from app_private.user_account where app_private.user_account.id = user_id;

  if v_account.id is null then
    raise exception 'No valid resets active with this reset token: %', reset_token using errcode = 'NOACT';
  end if;

  -- Have there been too many reset attempts?
  if (
    v_account.first_failed_reset_password_attempt is not null
    and v_account.first_failed_reset_password_attempt > NOW() - v_token_max_duration
    and v_account.failed_reset_password_attempts >= 20
  ) 
  then
    raise exception 'Password reset locked - too many reset attempts. Please contact support@legitapps.com.' using errcode = 'LOCKD';
  end if;

  -- Not too many reset attempts, let's check the token
  if v_account.reset_password_token != reset_token then
    -- Wrong token, bump all the attempt tracking figures
    update app_private.user_account
    set
      failed_reset_password_attempts = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then 1 else failed_reset_password_attempts + 1 end),
      first_failed_reset_password_attempt = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then now() else first_failed_reset_password_attempt end)
    where app_private.user_account.id = v_account.id;

    return null;
  end if;

  -- Excellent - they're legit

  perform app_private.assert_valid_password(new_password);

  -- Let's reset the password as requested
  update app_private.user_account
  set
    password_hash = crypt(new_password, gen_salt('bf')),
    reset_password_token = null,
    reset_password_token_generated = null,
    failed_reset_password_attempts = 0,
    first_failed_reset_password_attempt = null
  where app_private.user_account.id = v_account.id;
  
  -- perform graphile_worker.add_job(
  --   'user__audit',
  --   json_build_object(
  --     'type', 'reset_password',
  --     'user_id', v_user.id,
  --     'current_user_id', app_public.current_user_id()
  --   )
  -- );

  return true;
    
end;
$$ language plpgsql strict security definer;

grant execute on function app_public.reset_password(uuid, text, text) to app_anonymous, app_user;