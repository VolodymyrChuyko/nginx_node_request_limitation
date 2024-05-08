#!/usr/bin/env bash

{
    n=-1
    delay=-1
    url=''
    while [[ "$#" -gt 0 ]]
        do
            case $1 in
                -n|--number)
                    n="$2"
                    ;;
                -d|--delay)
                    delay="$2"
                    ;;
                -u|--url)
                    url="$2"
                    ;;
            esac
            shift
        done

    if [[ $n -lt 0 ]]; then
        echo -e "Error: invalid request number\n"
        exit 1
    fi

    if [[ ! $delay =~ ^[0-9]+.?$|^.[0-9]+$|^[0-9]+.[0-9]+$ ]]; then
        echo -e "Error: invalid delay value\n"
        exit 1
    fi

    if [[ $url == "" ]]; then
        echo -e "Error: invalid url value\n"
        exit 1
    fi

    statuses=()
    poll=`
        for (( i = 1; i <= $n; i++));
            do
                curl -s -o /dev/null -w "%{http_code}\n" $url
                sleep $delay
            done
    `
    for response in $poll
        do
            statuses+=($response)
        done

    echo "${statuses[*]}"
}
