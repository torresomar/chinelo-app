ActiveAdmin.register Location do
  permit_params :latitude, :longitude, :imageurl, :address, :building

  index do
    selectable_column

    column 'Imagen' do |location|
      image_tag(location.imageurl, width: 200, height: 150)
    end

    column 'Lugar' do |location|
      h2 location.building
    end

    column 'Dirección' do |location|
      p location.address
    end

    actions
  end

  show title: :building do
    columns do
      column do
        panel 'Fotografia' do
          image_tag(location.imageurl, width: 500, height: 300)
        end
        panel 'Detalles' do
          attributes_table_for location do
            row('Dirección') { |l| l.address }
            row('Latitud') { |l| l.latitude }
            row('Longitud') { |l| l.longitude }
          end
        end
      end

      column do
        panel 'Resumen' do
          table do
            tr do
              th 'Propiedad'
              th 'Cantidad'
            end
            tr do
              td 'Usuarios'
              td location.user_count
            end
            tr do
              td 'Canciones agregadas'
              td location.song_count
            end
          end
        end

        panel 'Canciones' do
          table do
            tr do
              th 'Título'
              th 'Apariciones'
            end

            songs = location.users.flat_map(&:songs).uniq

            songs.map do |song|
              tr do
                td song.name
                td song.user_count(location.id)
              end
            end
          end
        end
      end
    end
  end
end
