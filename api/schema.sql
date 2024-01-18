-- psql -U $POSTGRES_USER $POSTGRES_DB
-- \dt to see tables
drop table if exists Competition_Prize;
drop table if exists Competition_Image;
drop table if exists Session_Client;
drop table if exists Session;
drop table if exists Competition;
drop table if exists Game;
drop table if exists Game_Endpoint;
drop table if exists Endpoint_Type;
drop table if exists Event;

create table Game (
  id serial primary key,
  host_url text not null,
  name text not null,
  repo_link text,
  details text,
  created_by text not null,
  created_at timestamp not null default NOW()
);

create table Endpoint_Type (
  id serial primary key,
  name text not null,
  method text not null,
  required bool not null,
  query_param_name text
);

insert into endpoint_type(name, method, required, query_param_name) values('Stop Session', 'POST', true, 'session_id');
insert into endpoint_type(name, method, required, query_param_name) values('Start Session', 'POST', true, 'session_id');

create table Game_Endpoint (
  id serial primary key,
  endpoint text not null,
  game_id int not null references Game(id),
  endpoint_type_id int not null references Endpoint_Type(id)
);

create table Competition (
  id serial primary key,
  game_id int not null references Game(id) ON DELETE CASCADE,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  location text not null,
  image_filename text
);

create table Session (
  id serial primary key,
  competition_id int references Competition(id) ON DELETE CASCADE,
  play_id text not null,
  name text not null,
  creation_date timestamptz not null default NOW()
);

create table Session_Scoreboard (
  id serial primary key,
  session_id int not null references Session(id),
  player_name text not null,
  rank int not null,
  score int 
);

create table Session_Client (
  id serial primary key,
  session_id int not null references Session(id) ON DELETE CASCADE,
  user_id UUID not null,
  token UUID not null,
  rank int,
  score int
);

create table Session_Config (
  id serial primary key,
  name text not null,
  json_config text not null,
  game_id int not null references Game(id)
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
  user_id UUID
);