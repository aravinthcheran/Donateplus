
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import '../styles/home.css'; // Ensure to update this file to match the new design

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    trust: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const trustFromUrl = urlParams.get('trust');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      trustFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        trust: trustFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (id === 'type') {
      setSidebardata({ ...sidebardata, type: value });
    } else if (id === 'trust') {
      setSidebardata({ ...sidebardata, trust: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('trust', sidebardata.trust);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='search flex flex-col md:flex-row bg-gray-100 min-h-screen'>
      <div className='sidebar p-7 bg-white border-r-2 md:min-h-screen shadow-md rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <h2 className='text-xl font-bold text-center'>Search Listings</h2>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Enter keywords...'
              className='border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <select
              id='type'
              value={sidebardata.type}
              onChange={handleChange}
              className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='all'>All</option>
              <option value='rent'>Individual</option>
              <option value='NGO'>NGO</option>
            </select>
          </div>
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='trust'
              onChange={handleChange}
              checked={sidebardata.trust}
              className='focus:ring-2 focus:ring-blue-500'
            />
            <label className='font-semibold'>Trusted Listings</label>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort By:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='regularPrice_desc'>Price: High to Low</option>
              <option value='regularPrice_asc'>Price: Low to High</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-purple-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-all duration-300'>
            Search
          </button>
        </form>
      </div>
      <div className='results flex-1 p-5'>
        <h1 className='text-2xl font-semibold text-gray-700 mb-5'>
          Listing Results:
        </h1>
        <div className='flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-lg text-gray-500'>No listings found!</p>
          )}
          {loading && (
            <p className='text-lg text-gray-500 text-center w-full'>Loading...</p>
          )}
          {!loading && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-blue-600 hover:underline p-4 text-center w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}