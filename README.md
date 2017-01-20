# MB Demo

This demo is part of a project aiming to show how a serverless workflow can be used to fetch records from the Mindbody API, process those records, and deliver them to an HTTP endpoint.

With this repo, we're just demonstrating how to setup, invoke, and test a
simple lambda function that makes a request to the Mindbody API to check how
many client records are associated with a given Mindbody site.  It also
demonstrates how to use cloudformation parameters and lambda environment
variables.


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

    git clone git@github.com:joyrexus/mb-demo-simple.git
    cd mb-demo-simple/

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
      --function-name MindbodyDemo-GetClientCount \
      --payload file://functions/GetClientCount/event.json \
      output.txt && cat output.txt

Run a local test:

    node tests/GetClientCount/test.js


## Teardown

Remove the stack:

    aws cloudformation delete-stack --stack-name MindbodyDemo

Clear or remove the artifacts bucket:

    aws s3 rm s3://$ARTIFACTS_BUCKET --recursive  # deletes items in bucket

    aws s3 rb s3://$ARTIFACTS_BUCKET --force      # removes bucket
