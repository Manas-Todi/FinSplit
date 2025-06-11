import React from 'react'
import { getInitials } from '../../utils/helper';

const CharAvatar = ({fullName, width, height, style}) => {
  return (
    <div className={`${width || "w-12"} ${height || "h-12"} ${style || ""} rounded-full flex items-center justify-center text-gray-900 bg-gray-100 font-medium`}>
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
