ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel 'Actividad por locación' do
          div do
              @metric = Location.all.reduce(Hash.new) do |acc, location|
                acc[location.building] = location.user_count
                acc
              end
              render partial: 'metrics/pie_chart', locals: {metric: @metric}
          end

          table do
            tr do
              th 'Locación'
              th 'Usuarios'
              th 'Canciones'
            end
            Location.all.map do |location|
              tr do
                td location.building
                td location.user_count
                td location.song_count
              end
            end
          end
        end
      end

      column do
        panel 'Canciones más populares' do
          div do
            @metric = Song.joins(:songs_users).group(:name)
              .order('count_id desc').limit(10).count('id')
            render partial: 'metrics/bar_chart', locals: {metric: @metric}
          end

          table do
            tr do
              th 'Título'
              th 'Número de playlists'
            end
            Song.all.map do |song|
              tr do
                td song.name
                td song.user_count
              end
            end
          end
        end
      end
    end
  end
end
