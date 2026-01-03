import http from 'k6/http';
import { check, sleep } from 'k6';

const scenarios = {
  select_for_update: {
    executor: 'constant-vus',
    exec: 'selectForUpdate',
    vus: 10,
    duration: '600s',
  },
  advisory_lock: {
    executor: 'constant-vus',
    exec: 'advisoryLock',
    vus: 10,
    duration: '600s',
  },
};

export const options = {
  scenarios: {},
};

const scenarioName = __ENV.SCENARIO || 'all';

if (scenarioName === 'all') {
  Object.assign(options.scenarios, scenarios);
} else {
  options.scenarios[scenarioName] = scenarios[scenarioName];
}

export function selectForUpdate() {
  const res = http.post('http://localhost:3000/select-for-update');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.2);
}

export function advisoryLock() {
  const res = http.post('http://localhost:3000/advisory-lock');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(0.2);
}
