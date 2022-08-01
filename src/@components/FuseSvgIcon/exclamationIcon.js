import React from 'react';

const ExclamationIcon = (props) => {
   const { width, height, fill } = props

   return (
      <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path
            fillRule="evenodd" clipRule="evenodd" d="M17.7992 9.00019C17.7992 11.3341 16.8721 13.5724 15.2218 15.2227C13.5714 16.8731 11.3331 17.8002 8.99922 17.8002C6.66531 
            17.8002 4.427 16.8731 2.77668 15.2227C1.12636 13.5724 0.199219 11.3341 0.199219 9.00019C0.199219 6.66629 1.12636 4.42798 2.77668 2.77766C4.427 1.12734 6.66531 0.200195 
            8.99922 0.200195C11.3331 0.200195 13.5714 1.12734 15.2218 2.77766C16.8721 4.42798 17.7992 6.66629 17.7992 9.00019ZM10.0992 4.60019C10.0992 4.89193 9.98333 5.17172 
            9.77703 5.37801C9.57075 5.5843 9.29096 5.70019 8.99922 5.70019C8.70748 5.70019 8.42769 5.5843 8.2214 5.37801C8.01511 5.17172 7.89922 4.89193 7.89922 4.60019C7.89922 
            4.30846 8.01511 4.02867 8.2214 3.82238C8.42769 3.61609 8.70748 3.5002 8.99922 3.5002C9.29096 3.5002 9.57075 3.61609 9.77703 3.82238C9.98333 4.02867 10.0992 4.30846 
            10.0992 4.60019ZM7.89922 7.90019C7.60748 7.90019 7.32769 8.01609 7.1214 8.22238C6.91511 8.42867 6.79922 8.70846 6.79922 9.00019C6.79922 9.29193 6.91511 9.57172 
            7.1214 9.77801C7.32769 9.9843 7.60748 10.1002 7.89922 10.1002V13.4002C7.89922 13.6919 8.01511 13.9717 8.2214 14.178C8.42769 14.3843 8.70748 14.5002 8.99922 
            14.5002H10.0992C10.391 14.5002 10.6707 14.3843 10.877 14.178C11.0833 13.9717 11.1992 13.6919 11.1992 13.4002C11.1992 13.1085 11.0833 12.8287 10.877 12.6224C10.6707 
            12.4161 10.391 12.3002 10.0992 12.3002V9.00019C10.0992 8.70846 9.98333 8.42867 9.77703 8.22238C9.57075 8.01609 9.29096 7.90019 8.99922 7.90019H7.89922Z" fill={fill} />
      </svg>
   )
}
export default ExclamationIcon;