CREATE MIGRATION m1lo4e7tavb3xmevdzbg4zmc42gmwx457hrbaqsxqyba4idw2lo33q
    ONTO m1i7k3hm4aaizfe57tn2msss37fbomr2veixvjcb5fhekayc4jto3q
{
  ALTER TYPE default::Album {
      CREATE REQUIRED LINK artist: default::Artist {
          SET REQUIRED USING (<default::Artist>{});
      };
  };
  ALTER TYPE default::Artist {
      CREATE REQUIRED MULTI LINK albums: default::Album {
          SET REQUIRED USING (<default::Album>{});
      };
  };
};
