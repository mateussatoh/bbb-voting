import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  httpTimeout: '10s', 
  noConnectionReuse: false,
  stages: [
    { duration: '30s', target: 1000 },   
    { duration: '30s', target: 5000 },   
    { duration: '30s', target: 20000 },   
    { duration: '1m', target: 50000 },   
    { duration: '1m', target: 100000 },   
    { duration: '30s', target: 50000 },   
    { duration: '30s', target: 20000 },   
  ],
  thresholds: {
    'checks': ['rate>0.99'],                      // A taxa de sucesso das verificações deve ser maior que 99%
  },
};

export default function() {
  const url = 'http://localhost:3000/votes';
  const payload = JSON.stringify({ candidate_id: 'Calabreso' })
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, { "status is 201": (res) => res.status === 201 });
  sleep(1);
}
