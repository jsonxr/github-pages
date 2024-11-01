#!/bin/bash

# Variables
CERTS_DIR="."
KEY_FILE="$CERTS_DIR/localhost.key"
CERT_FILE="$CERTS_DIR/localhost.crt"
DAYS_VALID=3650
COMMON_NAME="localhost"

# Create certs directory if it doesn't exist
mkdir -p "$CERTS_DIR"

# Generate the key and certificate
openssl req -x509 -nodes -days $DAYS_VALID -newkey rsa:2048 \
  -keyout "$KEY_FILE" \
  -out "$CERT_FILE" \
  -subj "/C=US/ST=Local/L=Local/O=Development/CN=$COMMON_NAME"

# Output result
echo "Generated key and certificate:"
echo "  Key:  $KEY_FILE"
echo "  Cert: $CERT_FILE"

# KEYCHAIN="/Library/Keychains/System.keychain"
# sudo security add-trusted-cert -d -r trustRoot -k "$KEYCHAIN" "$CERT_FILE"
