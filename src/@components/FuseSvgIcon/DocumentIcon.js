import React from 'react';

const DocumentIcon = (props) => {
    const { width, height, fill } = props

    return (
        <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 5V11.6667C25 12.1087 25.1756 12.5326 25.4882 12.8452C25.8007 13.1577 26.2246 13.3333 26.6667 13.3333H33.3333"
                stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 28.3333H18.3333C17.4493 28.3333 16.6014 27.9821 15.9763 27.357C15.3512 26.7319 15 25.8841 15 25V8.33333C15 7.44928 15.3512 
                6.60143 15.9763 5.97631C16.6014 5.35119 17.4493 5 18.3333 5H25L33.3333 13.3333V25C33.3333 25.8841 32.9821 26.7319 32.357 27.357C31.7319 
                27.9821 30.8841 28.3333 30 28.3333Z" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26.6663 28.3334V31.6667C26.6663 32.5507 26.3152 33.3986 25.69 34.0237C25.0649 34.6488 24.2171 35 23.333 35H11.6663C10.7823 35 
                9.93444 34.6488 9.30932 34.0237C8.6842 33.3986 8.33301 32.5507 8.33301 31.6667V15C8.33301 14.116 8.6842 13.2681 9.30932 12.643C9.93444 
                12.0179 10.7823 11.6667 11.6663 11.6667H14.9997" stroke={fill} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
export default DocumentIcon;