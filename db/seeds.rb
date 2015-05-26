# Populate the database
# with the songs of the specified artist

# ID for the target Artist
ARTIST_ID = '7okwEbXzyT2VffBmyQBWLz' # Maná

RSpotify.authenticate(ENV['SPOTIFY_CLIENT_ID'],
                      ENV['SPOTIFY_CLIENT_SECRET'])

artist = RSpotify::Artist.find(ARTIST_ID)

albums = artist.albums

albums.each do |album|
  album.tracks.each do |track|
    Song.create(sid:         track.id,
                uri:         track.uri,
                artist:      ARTIST_ID,
                name:        track.name,
                preview:     track.preview_url,
                large_image: album.images[0]['url'],
                small_image: album.images[2]['url'])
  end
end

data = Song.all.map { |s| [s.id, s.name] }
require 'set'
unique_names_ids = Set.new(data.uniq(& proc { |d| d[1] }).map(& proc { |d| d[0] }))
all_ids = Set.new(Song.all.map(&:id))
Song.delete(all_ids.difference(unique_names_ids).to_a)

Location.create(latitude: 19.405094,
                longitude: -99.095420,
                address: "Av. Viaducto Rio de la Piedad y Rio Churubusco S/N, Iztaclaco, Granjas México, 08400 Ciudad de Mexico, D.F.",
                building: "Foro Sol",
                imageurl: "http://blog.mexicodestinos.com/wp-content/uploads/2013/09/foro-sol-en-el-vive-latino.jpg")

Location.create(latitude: 19.424764,
                longitude: -99.194899,
                address: "Av Paseo de la Reforma 50 Miguel Hidalgo 11580 Ciudad de México, D.F",
                building: "Foro Sol",
                imageurl: "https://c3.staticflickr.com/3/2329/2631186552_8b574026ce_b.jpg")

Location.create(latitude: 19.406578,
                longitude: -99.168870,
                address: "Calle Tlaxcala 160 Cuauhtemoc Hipódromo Condesa 06170 Ciudad de México, D.F.",
                building: "Auditorio Blackberry",
                imageurl: "http://www.eluniversal.com.mx/img/2013/06/Esp/black_b-movil.jpg")

Location.create(latitude: 19.413319,
                longitude:  -99.172033,
                address: "Juan Escutia 4, Cuauhtémoc, Condesa, 06140 Ciudad De Mexico, D.F.",
                building: "Plaza Condesa",
                imageurl: "http://static1.squarespace.com/static/51eed906e4b0953024980af9/53004371e4b0e37a19ae94c3/53004378e4b008058a4761e3/1392526201804/Esrawe-Plaza-Condesa-cool-theater-6.jpg")

Location.create(latitude: 19.440067,
                longitude:  -99.224063,
                address: "Avenida Del Conscripto 311 Miguel Hidalgo Lomas de Sotelo 11200 Ciudad de México, D.F",
                building: "Centro Banamex",
                imageurl: "http://www.hotelmariabarbara.com/resources/images/centrobanamex.jpeg")

Location.create(latitude: 19.433402,
                longitude:  -99.146973,
                address: "Avenida Independencia 90, Cuauhtémoc, Centro, 06050 Ciudad de México, D.F.",
                building: "Teatro Metropolitan",
                imageurl: "http://bluefm.com.ar/files/2013/04/metropolitan21.jpg")
