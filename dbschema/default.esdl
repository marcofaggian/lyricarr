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

    multi albums: Album; 
  }
  
  type Album {
    required name: str {
      constraint exclusive;
    };

    required artist: Artist;

    multi songs: Song; 
  }
}