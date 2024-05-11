CREATE MIGRATION m1cj5tsvjxqqtovzgv77sbgxzqhygle3dlqn3hes7vuhdl2tm5kdsa
    ONTO m1h4erdj4at4w4cl37o5avfjipyqb6qa777ykahde3msymyzgxjuaa
{
  ALTER TYPE default::Album {
      ALTER LINK songs {
          USING (.<album[IS default::Song]);
      };
  };
  ALTER TYPE default::Artist {
      ALTER LINK albums {
          USING (.<artist[IS default::Album]);
      };
      CREATE MULTI LINK songs := (.<artist[IS default::Song]);
  };
};
