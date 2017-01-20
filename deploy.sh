#!/bin/bash -e

aws cloudformation package                  \
    --template-file stack.yml               \
    --output-template-file stack.tmp.yml    \
    --s3-bucket "${ARTIFACTS_BUCKET}"

aws cloudformation deploy                   \
    --template-file stack.tmp.yml           \
    --stack-name MindbodyDemo               \
    --capabilities CAPABILITY_IAM           \
    --parameter-overrides                   \
        site=$MB_SOURCE_SITE                \
        keys=$MB_SOURCE_KEYS
