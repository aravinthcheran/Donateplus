import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!data.success) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center my-5">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <div className="relative flex justify-center">
          <img
            src={formData.avatar || currentUser.avatar}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
          {filePerc > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-full">
              {filePerc === 100
                ? 'Upload Complete'
                : `Uploading ${filePerc}%`}
            </div>
          )}
        </div>
        <p className="text-red-600 text-center">
          {fileUploadError && 'Error uploading file! Must be less than 2MB.'}
        </p>

        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-70"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          to="/create-listing"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 text-center transition block"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <button
          onClick={handleDeleteUser}
          className="text-red-600 hover:underline"
        >
          Delete Account
        </button>
        <button onClick={handleSignOut} className="text-red-600 hover:underline">
          Sign Out
        </button>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {updateSuccess && (
        <p className="text-green-600 mt-4">Profile updated successfully!</p>
      )}
      <button
        onClick={handleShowListings}
        className="mt-5 bg-blue-600 text-white py-2 rounded-lg w-full hover:bg-blue-700 transition"
      >
        Show Listings
      </button>

      {showListingsError && (
        <p className="text-red-600 mt-5">Error showing listings</p>
      )}

      {userListings && userListings.length > 0 && (
        <div className="space-y-4 mt-7">
          <h1 className="text-2xl font-semibold text-center">Your Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border p-4 rounded-lg shadow-md space-y-2"
            >
              <h3 className="text-xl font-bold">{listing.title}</h3>
              <p>{listing.description}</p>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleListingDelete(listing._id)}
              >
                Delete Listing
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}