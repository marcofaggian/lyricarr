CREATE MIGRATION m12unbem7bgz3zt6wp6pwkifsatgdgynobuj4fomwt7n6jgvmqerca
    ONTO m12secjpix3nvey63wrbs6gikdiotqiezndetxhxfr3w2jpkimtcca
{
  ALTER TYPE default::Album {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Artist {
      ALTER PROPERTY name {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
