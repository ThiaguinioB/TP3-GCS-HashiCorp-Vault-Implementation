FROM hashicorp/vault:latest

# Copy configuration file
COPY vault-config.hcl /vault/config/vault-config.hcl

# Expose Vault port
EXPOSE 8200

# Set environment variables for development
ENV VAULT_DEV_ROOT_TOKEN_ID=dev-token
ENV VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200

# Start Vault in dev mode (for testing purposes)
# In production, use proper configuration
CMD ["vault", "server", "-dev", "-dev-listen-address=0.0.0.0:8200"]
