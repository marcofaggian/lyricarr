module default {
  type Song {
    required filePath: str {
      constraint exclusive;
    };
    required artist: Artist;
    required album: Album;
    required file: str;
    required title: str;
    required extension: str;
    required lyrics: bool {
      default := false;
    };

    constraint exclusive on ( (.title, .album, .artist) )
  }

  type Artist {
    required name: str {
      constraint exclusive;
    };

    multi albums := .<artist[is Album]; 
    multi songs := .<artist[is Song];

    songs_with_lyrics_count := (
      select count( (select .songs filter .lyrics = true) )
    );
    songs_without_lyrics_count := (select count(
      (
        select .songs filter .lyrics = false
      )
    ));
  }
  
  type Album {
    required name: str {
      constraint exclusive;
    };

    required artist: Artist;

    multi songs := .<album[is Song]; 
    songs_with_lyrics_count := (select count(
      (
        select .songs filter .lyrics = true
      )
    ));
    songs_without_lyrics_count := (select count(
      (
        select .songs filter .lyrics = false
      )
    ));
  }
}