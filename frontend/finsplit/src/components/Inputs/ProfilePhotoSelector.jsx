import { useRef, useState } from 'react';
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef= useRef(null);
    const [previewUrl,setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            // update the image state
            setImage(file);

            // Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
  return (
    <div className='flex justify-center mb-6'>
        <input
            type='file'
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {!image ? (
            <div className='w-20 h-20 flex items-center justify-center bg-green-100 rounded-full relative'>
                <LuUser className='text-4xl text-green-600' />
                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-green-700 transition'
                    onClick={onChooseFile}
                >
                    <LuUpload />
                </button>
            </div>
        ) : (
            <div className='relative'>
                <img
                    src={previewUrl}
                    alt='profile photo'
                    className='w-20 h-20 rounded-full object-cover'
                />
                <button
                    type='button'
                    className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 hover:bg-red-600 transition'
                    onClick={handleRemoveImage}
                >
                    <LuTrash />
                </button>
            </div>
        )}
        
    </div>
  )
}

export default ProfilePhotoSelector