-- psql -U $POSTGRES_USER $POSTGRES_DB
-- \dt to see tables
drop table if exists Competition_Prize;
drop table if exists Competition_Image;
drop table if exists Session_Scoreboard;
drop table if exists Session_Config;
drop table if exists Session_Client;
drop table if exists Session;
drop table if exists Competition;
drop table if exists Game_Endpoint;
drop table if exists Endpoint_Type;
drop table if exists Event;
drop table if exists Game;

drop table if exists library_start_session_config;
drop table if exists library_create_session_config;
drop table if exists library_game;

create extension if not exists "uuid-ossp";

create table Game (
  id serial primary key,
  name text not null,
  repo_link text,
  details text,
  created_at timestamp not null default NOW(),
  game_rules  text,
  getting_started_instructions  text,
  image_source text,
  docker_image text,
  api_sub_path text,
  max_amount int,
  duration int,
  internal_port int
);

-- ALTER TABLE Game 
-- ADD COLUMN docker_image TEXT, 
-- ADD COLUMN api_sub_path TEXT, 
-- ADD COLUMN max_amount INT, 
-- ADD COLUMN duration INT;
-- ADD COLUMN internal_port INT;

-- ALTER TABLE Game
-- DROP COLUMN host_url,
-- DROP COLUMN created_by,
-- DROP COLUMN supports_multi_sessions;


create table Competition (
  id serial primary key,
  game_id int not null references Game(id) ON DELETE CASCADE,
  name text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  location text not null,
  image_filename text
);

create table Session (
  id serial primary key,
  game_id int not null references Game(id) ON DELETE CASCADE,
  competition_id int references Competition(id) ON DELETE CASCADE,
  creation_date timestamptz not null default NOW(),
  host_url text
);

create table Competition_Image (
  id serial primary key,
  competition_id int not null references Competition(id) ON DELETE CASCADE,
  filename text not null
);

create table Competition_Prize (
  id serial primary key,
  prize text not null,
  competition_id int not null references Competition(id) ON DELETE CASCADE,
  image_filename text,
  placement int not null,
  winner_name text,
  user_id UUID
);

