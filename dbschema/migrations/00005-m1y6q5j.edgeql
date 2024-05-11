CREATE MIGRATION m1y6q5j4yempeuvv7dw4pqaxi4go5vozgkqatgl5yf5tc2ioepdmeq
    ONTO m1lo4e7tavb3xmevdzbg4zmc42gmwx457hrbaqsxqyba4idw2lo33q
{
  ALTER TYPE default::Album {
      CREATE REQUIRED MULTI LINK songs: default::Song {
          SET REQUIRED USING (<default::Song>{});
      };
  };
};
