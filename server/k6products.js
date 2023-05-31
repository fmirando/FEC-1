import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1s', target: 1000 },
    { duration: '28s', target: 1000 },
    { duration: '1s', target: 0 },
  ],
};

const getTests = () => {
  const randInd = Math.floor(Math.random() * 1000000) + 1;

  const getProductResponse = http.get(`http://localhost:3000/products/${randInd}`);
  if (getProductResponse.status !== 200) {
    console.error('Error fetching product');
  } else {
    console.log('Retrieved product successfully');
  }

  const getRelatedResponse = http.get(`http://localhost:3000/products/${randInd}/related`);
  if (getRelatedResponse.status !== 200) {
    console.error('Error fetching related products');
  } else {
    console.log('Retrieved related products successfully');
  }

  const getStylesResponse = http.get(`http://localhost:3000/products/${randInd}/styles`);
  if (getStylesResponse.status !== 200) {
    console.error('Error fetching styles data');
  } else {
    console.log('Retrieved styles data successfully');
  }

  sleep(1);
};

export default getTests;
