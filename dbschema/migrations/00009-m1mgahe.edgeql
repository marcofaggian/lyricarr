CREATE MIGRATION m1mgaheahzgaxdtx63wbmys422jeve5m2lnomp3qksc52wecbnmwpa
    ONTO m1nr4ncbj5h6qfriwvooh25vgmqn2mijl7yn3wmq2dkmxzczz7arla
{
  ALTER TYPE default::Album {
      CREATE PROPERTY songs_count := (SELECT
          std::count((SELECT
              .songs
          ))
      );
  };
  ALTER TYPE default::Artist {
      CREATE PROPERTY albums_count := (SELECT
          std::count((SELECT
              .albums
          ))
      );
      CREATE PROPERTY songs_count := (SELECT
          std::count((SELECT
              .songs
          ))
      );
  };
};
