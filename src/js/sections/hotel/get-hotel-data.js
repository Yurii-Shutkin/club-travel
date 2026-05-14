import { getHotels } from '@/js/services/api/getHotels.js';

function mapGallery(gallery = []) {
  return gallery.map(img => ({
    alt: img.alternativeText || img.name,
    mainSrc: img.formats?.large?.url || img.url,
    thumbSrc: img.formats?.small?.url || img.url,
  }));
}

function mapInfo(hotel = {}) {
  const descBlock = hotel.hotelDescription?.[0] || {};

  return {
    description: descBlock.description || "",
    mainDescription: descBlock.mainDescription?.[0] || "",
    features: hotel.hotelFeatures || [],
  };
}


export async function getHotelData() {
  const hotels = await getHotels(50);
  const hotel = hotels[0];
  console.log("sds",mapInfo(hotel));

  return {
    gallery: mapGallery(hotel.gallery),
    info: mapInfo(hotel),

    features: hotel.hotelFeatures || [],
  };
}