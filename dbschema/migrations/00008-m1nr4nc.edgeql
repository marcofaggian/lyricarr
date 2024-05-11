CREATE MIGRATION m1nr4ncbj5h6qfriwvooh25vgmqn2mijl7yn3wmq2dkmxzczz7arla
    ONTO m1cj5tsvjxqqtovzgv77sbgxzqhygle3dlqn3hes7vuhdl2tm5kdsa
{
  ALTER TYPE default::Album {
      CREATE PROPERTY songs_with_lyrics_count := (SELECT
          std::count((SELECT
              .songs
          FILTER
              (.lyrics = true)
          ))
      );
      CREATE PROPERTY songs_without_lyrics_count := (SELECT
          std::count((SELECT
              .songs
          FILTER
              (.lyrics = false)
          ))
      );
  };
  ALTER TYPE default::Artist {
      CREATE PROPERTY songs_with_lyrics_count := (SELECT
          std::count((SELECT
              .songs
          FILTER
              (.lyrics = true)
          ))
      );
      CREATE PROPERTY songs_without_lyrics_count := (SELECT
          std::count((SELECT
              .songs
          FILTER
              (.lyrics = false)
          ))
      );
  };
};
