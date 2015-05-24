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
end
