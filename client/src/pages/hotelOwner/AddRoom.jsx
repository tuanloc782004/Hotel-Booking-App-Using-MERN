import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [inputs, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wi-Fi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false
        }
    })

    return (
        <form>
            <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience' />

            {/* Upload Area For Images */}
            <p className='text-gray-800 mt-10 font-medium'>Images</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label htmlFor={`roomImage${key}`} key={key}>
                        <img className="max-h-13 cursor-pointer opacity-80 hover:opacity-100 transition-all" src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="upload-area" />
                        <input type='file' accept='image/*' id={`roomImage${key}`} hidden onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
                    </label>
                ))}
            </div>

            {/* Bọc chung Room Type và Price để dễ Responsive */}
            <div className='w-full flex flex-col sm:flex-row sm:gap-8 mt-6'>

                <div className='flex flex-col flex-1 max-w-48'>
                    <p className='text-gray-800 font-medium'>Room Type</p>

                    <select value={inputs.roomType} onChange={e => setInputs({ ...inputs, roomType: e.target.value })} className='border border-gray-300 bg-white mt-2 rounded px-3 py-2 w-full text-gray-700 outline-none focus:border-primary cursor-pointer'>
                        <option value=''>Select Room Type</option>
                        <option value='Single Bed'>Single Bed</option>
                        <option value='Double Bed'>Double Bed</option>
                        <option value='Luxury Room'>Luxury Room</option>
                        <option value='Family Suite'>Family Suite</option>
                    </select>
                </div>

                <div className='flex flex-col max-sm:mt-4'>
                    <p className='text-gray-800 font-medium'>
                        Price <span className='text-xs font-normal text-gray-500'>/night</span>
                    </p>
                    <input type="number" placeholder='0' className='border border-gray-300 mt-2 rounded px-3 py-2 w-24 text-gray-700 outline-none focus:border-primary' value={inputs.pricePerNight} onChange={e => setInputs({ ...inputs, pricePerNight: e.target.value })} />
                </div>
            </div>

            <p className='text-gray-800 mt-6 font-medium'>Amenities</p>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-gray-600 max-w-lg'>
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <input type="checkbox" className='w-4 h-4 cursor-pointer accent-primary' id={`amenity-${index + 1}`} checked={inputs.amenities[amenity]} onChange={e => setInputs({ ...inputs, amenities: { ...inputs.amenities, [amenity]: !inputs.amenities[amenity] } })} />
                        <label className='cursor-pointer select-none text-sm' htmlFor={`amenity-${index + 1}`}>{amenity}</label>
                    </div>
                ))}
            </div>

            <button type='submit' className='bg-primary text-white px-8 py-2.5 rounded mt-8 cursor-pointer hover:opacity-90 transition-all'>
                Add Room
            </button>
        </form >
    )
}

export default AddRoom