CREATE MIGRATION m1i7k3hm4aaizfe57tn2msss37fbomr2veixvjcb5fhekayc4jto3q
    ONTO m12unbem7bgz3zt6wp6pwkifsatgdgynobuj4fomwt7n6jgvmqerca
{
  ALTER TYPE default::Song {
      ALTER LINK album {
          SET REQUIRED USING (<default::Album>{});
      };
      ALTER LINK artist {
          SET REQUIRED USING (<default::Artist>{});
      };
      ALTER PROPERTY title {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE CONSTRAINT std::exclusive ON ((.title, .album, .artist));
      ALTER PROPERTY extension {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY file {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY lyrics {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
