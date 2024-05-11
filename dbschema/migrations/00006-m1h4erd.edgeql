CREATE MIGRATION m1h4erdj4at4w4cl37o5avfjipyqb6qa777ykahde3msymyzgxjuaa
    ONTO m1y6q5j4yempeuvv7dw4pqaxi4go5vozgkqatgl5yf5tc2ioepdmeq
{
  ALTER TYPE default::Album {
      ALTER LINK songs {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE default::Artist {
      ALTER LINK albums {
          RESET OPTIONALITY;
      };
  };
};
