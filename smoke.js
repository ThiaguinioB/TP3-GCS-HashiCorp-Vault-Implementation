import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 3,
  duration: '15s',
  thresholds: {
    http_req_failed:   ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    'checks':          ['rate>0.99'],
  },
};

export default function () {
  const res = http.get(__ENV.URL || 'https://test.k6.io/');
  check(res, { 'status 200': r => r.status === 200 });
}
