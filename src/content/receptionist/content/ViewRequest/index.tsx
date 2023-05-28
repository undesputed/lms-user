import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewRequest = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('form_id');

  return <>This is view Request</>;
};

export default ViewRequest;
