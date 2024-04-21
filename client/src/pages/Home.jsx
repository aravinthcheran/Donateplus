import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import '../styles/home.css'
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [NGOListings, setNGOListings] = useState([]);
  const [rentListings, setIndividualListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchIndividualListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchIndividualListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setIndividualListings(data);
        fetchNGOListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNGOListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=NGO&limit=4');
        const data = await res.json();
        setNGOListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
    {/* Top Section */}
    <style>
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&display=swap');
</style>
<div className='top-section flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
<h3 className='top-section-title text-slate-700 font-bold text-3xl lg:text-6xl'>
<h3 class="text-animation">Donate <span></span></h3>
  <br />
  place with ease
</h3>
<div className='top-section-subtext text-gray-400 text-xs sm:text-sm'>
  Donate+ is the best place to find your next perfect place to
  live.
  <br />
  We have a wide range of donations for you to choose from.
</div>
<Link
  to={'/search'}
  className='top-section-link text-xs sm:text-sm text-blue-800 font-bold hover:underline'
>
  Let's get started...
</Link>
<div className="image-container">
  <img src="https://img.freepik.com/premium-vector/donation-boxes-with-canned-food-illustration-freshly-prepared-food-packaged-sealed-jars-helping-people-need-poor-people-giving-out-charities-saving-from-hunger-vector-kindness_146957-1033.jpg" alt="Placeholder Image" />
   <img src="https://helios-i.mashable.com/imagery/articles/04WJuOneOI0DCzDDl5tJKgq/hero-image.fill.size_1200x900.v1623390119.jpg" alt="Placeholder Image" />
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5f--3K9a3dKsiPNzEJiyqPE3_QyOIStJRFw&usqp=CAU" alt="Placeholder Image" />
   <img src="https://static.vecteezy.com/system/resources/thumbnails/008/190/897/small_2x/human-blood-donate-on-white-background-free-vector.jpg" alt="Placeholder Image" />

</div>
</div>


    {/* Swiper Section */}
    <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing) => (
          <SwiperSlide key={listing._id} className='swiper-slide'>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
        ))}
    </Swiper>

    {/* Listing Results Section */}
    <div className='listing-results max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length > 0 && (
        <div className='offer-listings'>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
            <Link className='show-more-link text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
          </div>
          <div className='listing-grid flex flex-wrap gap-4'>
            {offerListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
      {rentListings && rentListings.length > 0 && (
        <div className='rent-listings'>
          <div className='my-3'>
            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
            <Link className='show-more-link text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
          </div>
          <div className='listing-grid flex flex-wrap gap-4'>
            {rentListings.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
        {NGOListings && NGOListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for NGO</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=NGO'}>Show more places for NGO</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {NGOListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
