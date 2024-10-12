import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import '../styles/home.css';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [NGOListings, setNGOListings] = useState([]);
  const [rentListings, setIndividualListings] = useState([]);

  SwiperCore.use([Navigation]);

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
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="home-container bg-gradient-to-r from-sky-100 to-indigo-200 text-gray-800">
      {/* Top Section */}
      <section className="top-section text-center py-20">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 animate-fadeIn">
          <span className="text-indigo-600">Donate</span> with ease
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-8">
          Donate+ is the best place to find your next perfect place to give back to society.
          <br />
          Discover a wide range of donations and help make a difference.
        </p>
        <Link
          to={'/search'}
          className="bg-indigo-600 text-white py-3 px-5 rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Image Gallery */}
      <section className="image-gallery grid grid-cols-2 sm:grid-cols-4 gap-4 px-8 my-10">
        <img
          src="https://img.freepik.com/premium-vector/donation-boxes-with-canned-food-illustration-freshly-prepared-food-packaged-sealed-jars-helping-people-need-poor-people-giving-out-charities-saving-from-hunger-vector-kindness_146957-1033.jpg"
          alt="Donation Food Box"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://helios-i.mashable.com/imagery/articles/04WJuOneOI0DCzDDl5tJKgq/hero-image.fill.size_1200x900.v1623390119.jpg"
          alt="Donation Event"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5f--3K9a3dKsiPNzEJiyqPE3_QyOIStJRFw&usqp=CAU"
          alt="Donation Volunteers"
          className="rounded-lg shadow-lg"
        />
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/008/190/897/small_2x/human-blood-donate-on-white-background-free-vector.jpg"
          alt="Blood Donation"
          className="rounded-lg shadow-lg"
        />
      </section>

      {/* Swiper Section */}
      <section className="swiper-section my-16">
        <Swiper navigation loop className="w-full">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id} className="swiper-slide">
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className="h-80 rounded-lg shadow-lg"
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* Listings Section */}
      <section className="listing-results max-w-6xl mx-auto p-8 flex flex-col gap-16">
        {offerListings && offerListings.length > 0 && (
          <div className="offer-listings">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold">Recent Offers</h2>
              <Link
                to={'/search?offer=true'}
                className="text-indigo-600 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="rent-listings">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold">Recent Places for Rent</h2>
              <Link
                to={'/search?type=rent'}
                className="text-indigo-600 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {NGOListings && NGOListings.length > 0 && (
          <div className="ngo-listings">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold">NGO Listings</h2>
              <Link
                to={'/search?type=NGO'}
                className="text-indigo-600 hover:underline"
              >
                Show more NGO listings
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {NGOListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
