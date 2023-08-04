const {Pool} = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool;
  }

  async getSongsFromPlaylist(playlistId) {
    const playlistQuery = {
      text: `SELECT id, name FROM playlists WHERE id = $1`,
      values: [playlistId],
    };

    const playlistSongQuery = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs 
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id 
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const playlistResult = await this._pool.query(playlistQuery);
    const playlistSongResult = await this._pool.query(playlistSongQuery);


    return {...playlistResult.rows[0], songs: playlistSongResult.rows};
  }
}

module.exports = PlaylistsService;
