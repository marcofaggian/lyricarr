CREATE MIGRATION m12secjpix3nvey63wrbs6gikdiotqiezndetxhxfr3w2jpkimtcca
    ONTO initial
{
  CREATE TYPE default::Album {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Artist {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Song {
      CREATE LINK album: default::Album;
      CREATE LINK artist: default::Artist;
      CREATE PROPERTY extension: std::str;
      CREATE PROPERTY file: std::str;
      CREATE REQUIRED PROPERTY filePath: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY lyrics: std::bool {
          SET default := false;
      };
      CREATE PROPERTY title: std::str;
  };
};
