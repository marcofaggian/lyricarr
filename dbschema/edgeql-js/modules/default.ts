// GENERATED by @edgedb/generate v0.5.3

import * as $ from "../reflection";
import * as _ from "../imports";
import type * as _std from "./std";
export type $AlbumλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "artist": $.LinkDesc<$Artist, $.Cardinality.One, {}, false, false,  false, false>;
  "songs": $.LinkDesc<$Song, $.Cardinality.Many, {}, false, false,  false, false>;
  "<albums[is Artist]": $.LinkDesc<$Artist, $.Cardinality.Many, {}, false, false,  false, false>;
  "<album[is Song]": $.LinkDesc<$Song, $.Cardinality.Many, {}, false, false,  false, false>;
  "<album": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
  "<albums": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Album = $.ObjectType<"default::Album", $AlbumλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Album = $.makeType<$Album>(_.spec, "1487add4-0fcd-11ef-b851-9d038d4976b1", _.syntax.literal);

const Album: $.$expr_PathNode<$.TypeSet<$Album, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Album, $.Cardinality.Many), null);

export type $ArtistλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "albums": $.LinkDesc<$Album, $.Cardinality.Many, {}, false, false,  false, false>;
  "<artist[is Song]": $.LinkDesc<$Song, $.Cardinality.Many, {}, false, false,  false, false>;
  "<artist[is Album]": $.LinkDesc<$Album, $.Cardinality.Many, {}, false, false,  false, false>;
  "<artist": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Artist = $.ObjectType<"default::Artist", $ArtistλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {name: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Artist = $.makeType<$Artist>(_.spec, "148890aa-0fcd-11ef-b54f-b55058854041", _.syntax.literal);

const Artist: $.$expr_PathNode<$.TypeSet<$Artist, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Artist, $.Cardinality.Many), null);

export type $SongλShape = $.typeutil.flatten<_std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588λShape & {
  "filePath": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "album": $.LinkDesc<$Album, $.Cardinality.One, {}, false, false,  false, false>;
  "artist": $.LinkDesc<$Artist, $.Cardinality.One, {}, false, false,  false, false>;
  "title": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "extension": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "file": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "lyrics": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
  "<songs[is Album]": $.LinkDesc<$Album, $.Cardinality.Many, {}, false, false,  false, false>;
  "<songs": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $Song = $.ObjectType<"default::Song", $SongλShape, null, [
  ..._std.$Object_8ce8c71ee4fa5f73840c22d7eaa58588['__exclusives__'],
  {title: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },album: {__element__: $Album, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },artist: {__element__: $Artist, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
  {filePath: {__element__: _std.$str, __cardinality__: $.Cardinality.One | $.Cardinality.AtMostOne },},
]>;
const $Song = $.makeType<$Song>(_.spec, "148965ac-0fcd-11ef-aef0-137fc6e6c473", _.syntax.literal);

const Song: $.$expr_PathNode<$.TypeSet<$Song, $.Cardinality.Many>, null> = _.syntax.$PathNode($.$toSet($Song, $.Cardinality.Many), null);



export { $Album, Album, $Artist, Artist, $Song, Song };

type __defaultExports = {
  "Album": typeof Album;
  "Artist": typeof Artist;
  "Song": typeof Song
};
const __defaultExports: __defaultExports = {
  "Album": Album,
  "Artist": Artist,
  "Song": Song
};
export default __defaultExports;