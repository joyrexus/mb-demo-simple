# MB Demo

This project aims to show how a serverless workflow can be used to fetch client records from the Mindbody API, process those records, and deliver them to an HTTP endpoint.


## Setup

Make sure to install/update your AWS CLI.

    sudo pip install --upgrade awscli

Select a default region if you haven't already:

    export AWS_DEFAULT_REGION=us-east-1

Create an artifacts bucket:

    export ARTIFACTS_BUCKET=$USER-artifacts
    aws s3 mb s3://$ARTIFACTS_BUCKET

Set environment variables for Emma's [source site and credentials](https://github.com/emmadev/mindbody-client#usage):

    export MB_SOURCE_SITE=2058
    export MB_SOURCE_KEYS="Emma2:<SECRET GOES HERE>"

Clone this repo:

    git clone git@github.com:joyrexus/mb-demo.git
    cd mb-demo/

Install dev dependencies:

    npm install --only=dev

Install function specific dependencies:

    npm install --only=prod --prefix ./functions/GetClientCount

Deploy the stack:

    ./deploy.sh


## Usage

List function names:

    aws lambda list-functions | grep FunctionName

Manual invocation of a function:

    aws lambda invoke \
      --invocation-type RequestResponse \
      --function-name mb-demo-GetClientCount-51TDWRKHNCMV \
      --payload file://functions/GetClientCount/event.json \
      output.txt && cat output.txt


## Teardown

Remove the stack:

    aws cloudformation delete-stack --stack-name mb-demo

Clear or remove the artifacts bucket:

    aws s3 rm s3://$ARTIFACTS_BUCKET --recursive  # deletes items in bucket

    aws s3 rb s3://$ARTIFACTS_BUCKET --force      # removes bucket
