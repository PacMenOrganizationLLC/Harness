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
  host_url text not null,
  name text not null,
  repo_link text,
  details text,
  created_by text not null,
  created_at timestamp not null default NOW(),
  supports_multi_sessions bool not null,
  game_rules  text,
  getting_started_instructions  text
);

create table Endpoint_Type (
  id serial primary key,
  name text not null,
  method text not null,
  required bool not null,
  query_param_name text
);

insert into endpoint_type(name, method, required, query_param_name) values('Start Session', 'POST', true, 'session_id');
insert into endpoint_type(name, method, required, query_param_name) values('Config', 'GET', true, null);
insert into endpoint_type(name, method, required, query_param_name) values('Stop Session', 'POST', false, 'session_id');
insert into endpoint_type(name, method, required, query_param_name) values('Create Session', 'POST', false, null);
insert into endpoint_type(name, method, required, query_param_name) values('Scoreboard', 'GET', false, 'game_id');

create table Game_Endpoint (
  id serial primary key,
  endpoint text not null,
  game_id int not null references Game(id) ON DELETE CASCADE,
  endpoint_type_id int not null references Endpoint_Type(id) ON DELETE CASCADE
);

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
  competition_id int references Competition(id) ON DELETE CASCADE,
  play_id text not null,
  name text not null,
  creation_date timestamptz not null default NOW(),
  play_url text not null
);

create table Session_Scoreboard (
  id serial primary key,
  session_id int not null references Session(id) ON DELETE CASCADE,
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
  game_id int not null references Game(id) ON DELETE CASCADE
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

INSERT INTO public.game (host_url,name,repo_link,details,created_by,created_at,supports_multi_sessions) VALUES
	 ('host','Mars Rover','github','Mars rover game','Johnathan','2023-11-01 21:35:54.037',true),
	 ('https://hungrygame.azurewebsites.net/','Hungry Games','https://hungrygame.azurewebsites.net/','You eat stuff.','Jallen','2023-11-08 23:58:10.015',false);

INSERT INTO public.game_endpoint (endpoint,game_id,endpoint_type_id) VALUES
	 ('https://marswebpacmen.azurewebsites.net/admin/config',1,3),
	 ('https://marswebpacmen.azurewebsites.net/Admin/createSession',1,4),
	 ('https://hungrygame.azurewebsites.net/config',2,3),
	 ('https://hungrygame.azurewebsites.net/start',2,1),
	 ('https://marswebpacmen.azurewebsites.net/Admin/StartGameHarness',1,1),
	 ('https://marswebpacmen.azurewebsites.net/admin/scoreboard',1,5),
	 ('',1,2);

INSERT INTO public.session_config (name,json_config,game_id) VALUES
	 ('t','[{"key":"RechargePointsPerSecond","value":"20"},{"key":"Password","value":"password"}]',1),
	 ('Default','[{"key":"numRows","value":"151"},{"key":"numCols","value":"15"},{"key":"password","value":"password"},{"key":"timeLimit","value":"60"}]',2),
	 ('Shorter Name','[{"key":"RechargePointsPerSecond","value":"200000"},{"key":"Password","value":"password"}]',1),
	 ('ShortName','[{"key":"RechargePointsPerSecond","value":"200000"},{"key":"Password","value":"password"}]',1),
	 ('Short Name','[{"key":"RechargePointsPerSecond","value":"200000"},{"key":"Password","value":"password"}]',1),
	 ('LongGame','[{"key":"numRows","value":"5"},{"key":"numCols","value":"5"},{"key":"password","value":"password"},{"key":"timeLimit","value":"120"}]',2);



-- Library Tables
create table library_game (
  id UUID primary key,
  name text not null, 
  description text not null,
  created_by text not null,
  created_at timestamp not null default NOW()
);

create table library_create_session_config (
  id uuid primary key,
  library_game_id UUID not null references library_game(id),
  name text not null,
  is_default bool not null,
  json_config json not null
);

create table library_start_session_config (
  id uuid primary key,
  library_game_id UUID not null references library_game(id),
  name text not null,
  is_default bool not null,
  json_config json not null
);

