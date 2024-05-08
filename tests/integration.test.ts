import { expect, test } from '@jest/globals';
import { exec } from 'child_process';

test('smile-station should not have request limitation', async () =>
{
    const n = 7;
    const delay = 0.1;
    const url = 'http://localhost:3002/smile-station';
    const expected = '200 200 200 200 200 200 200';

    const actual = await new Promise<string>(resolve =>
    {
        const poll = exec(`bash ./tests/server-polling.sh -n ${n} -d ${delay} -u ${url}`);
        if (poll.stdout)
            poll.stdout.on('data', (data) => resolve(data));
        else
            resolve('');
    });

    expect(actual.trim()).toBe(expected);
});

test('smile-station/1h should limit the request rate to 100/sec', async () =>
{
    const n = 7;
    const delay = 0.1;
    const url = 'http://localhost:3002/smile-station/1h';
    const expected = '200 429 429 429 429 429 200';

    const actual = await new Promise<string>(resolve =>
    {
        const poll = exec(`bash ./tests/server-polling.sh -n ${n} -d ${delay} -u ${url}`);
        if (poll.stdout)
            poll.stdout.on('data', (data) => resolve(data));
        else
            resolve('');
    });

    expect(actual.trim()).toBe(expected);
});

test('smile-station/1l should limit the request rate to 10/sec', async () =>
{
    const n = 7;
    const delay = 1.0;
    const url = 'http://localhost:3002/smile-station/1l';
    const expected = '200 429 429 429 429 429 200';

    const actual = await new Promise<string>(resolve =>
    {
        const poll = exec(`bash ./tests/server-polling.sh -n ${n} -d ${delay} -u ${url}`);
        if (poll.stdout)
            poll.stdout.on('data', (data) => resolve(data));
        else
            resolve('');
    });

    expect(actual.trim()).toBe(expected);
}, 10000);
