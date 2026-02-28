#!/bin/bash
set -e

TERRAFORM_VERSION="1.7.5"

wget -q https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip
unzip -o terraform_${TERRAFORM_VERSION}_linux_amd64.zip
sudo mv terraform /usr/local/bin/terraform
rm -f terraform_${TERRAFORM_VERSION}_linux_amd64.zip

echo "✅ Terraform $(terraform version --json | python3 -c 'import sys,json; print(json.load(sys.stdin)["terraform_version"])')"
echo "✅ AWS CLI $(aws --version)"