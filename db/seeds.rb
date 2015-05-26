# Populate the database
# with the songs of the specified artist

# ID for the target Artist
ARTIST_ID = '7okwEbXzyT2VffBmyQBWLz' # Maná

RSpotify.authenticate(ENV['SPOTIFY_CLIENT_ID'],
                      ENV['SPOTIFY_CLIENT_SECRET'])

artist = RSpotify::Artist.find(ARTIST_ID)

tracks = artist.albums.flat_map(&:tracks).uniq(&:name)

tracks.each do |track|
  Song.create(sid:     track.id,
              uri:    track.uri,
              artist: ARTIST_ID,
              name:   track.name)
end
