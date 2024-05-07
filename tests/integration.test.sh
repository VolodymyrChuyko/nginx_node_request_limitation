#!/usr/bin/env bash

source $(dirname "$0")/utils.sh

echo "smile-station should not have request limitation"
    n=7
    delay=0.1
    url="http://localhost:3002/smile-station"
    expected="200 200 200 200 200 200 200"

    result=`serverPolling -n $n -d $delay -u $url`

    expectToBeEqual --received "${result}" --expected "${expected}"

echo "smile-station/1h should limit the request rate to 100/sec"
    n=7
    delay=0.1
    url="http://localhost:3002/smile-station/1h"
    expected="200 429 429 429 429 429 200"

    result=`serverPolling -n $n -d $delay -u $url`

    expectToBeEqual --received "${result}" --expected "${expected}"

echo "smile-station/1l should limit the request rate to 10/sec"
    n=7
    delay=1.0
    url="http://localhost:3002/smile-station/1l"
    expected="200 429 429 429 429 429 200"

    result=`serverPolling -n $n -d $delay -u $url`

    expectToBeEqual --received "${result}" --expected "${expected}"

echo "🔥 All tests passed!"
