# TP3-GCS-HashiCorp-Vault-Implementation

A simple web application that demonstrates HashiCorp Vault integration with visual security status indicators.

## Features

- **Login Page**: Simple authentication with nickname and password
- **Main Dashboard**: Visual security status with color-coded background
  - 🟢 **Green**: Secrets are secured in HashiCorp Vault
  - 🔴 **Red**: Secrets are NOT secured in Vault
- **Vault Integration**: Real-time checking of secret storage status
- **Docker Support**: Containerized deployment for both webapp and Vault

## Project Structure

```
.
├── webapp/                  # Web application directory
│   ├── Dockerfile          # Docker configuration for webapp
│   ├── package.json        # Node.js dependencies
│   ├── server.js           # Express server with Vault integration
│   └── public/             # Static files
│       ├── index.html      # Login page
│       └── main.html       # Main dashboard page
├── vault-config/           # HashiCorp Vault configuration
│   ├── Dockerfile          # Docker configuration for Vault
│   └── vault-config.hcl    # Vault configuration file
└── docker-compose.yml      # Docker Compose orchestration
```

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TP3-GCS-HashiCorp-Vault-Implementation
   ```

2. **Start the services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Web Application: http://localhost:3000
   - Vault UI: http://localhost:8200 (Token: `dev-token`)

4. **Login credentials (demo)**
   - Username: `john` / Password: `password123`
   - Username: `alice` / Password: `secret456`

## How It Works

### Login Flow
1. Enter a valid nickname and password on the login page
2. Upon successful authentication, you're redirected to the main dashboard

### Vault Status Check
The main page checks if secrets are stored in HashiCorp Vault:
- **Background turns GREEN** when secrets are successfully retrieved from Vault
- **Background turns RED** when Vault is inaccessible or secrets are missing

### Initialize Vault
Click the "Initialize Vault" button to store a test secret in Vault, which will change the background color to green.

## API Endpoints

- `POST /api/login` - Authenticate user
- `GET /api/vault-status` - Check if secrets are secured in Vault
- `POST /api/vault-init` - Initialize Vault with test secret

## Development

### Running without Docker

1. **Start Vault** (in dev mode)
   ```bash
   vault server -dev -dev-root-token-id=dev-token
   ```

2. **Start the webapp**
   ```bash
   cd webapp
   npm install
   export VAULT_ADDR=http://localhost:8200
   export VAULT_TOKEN=dev-token
   npm start
   ```

3. Access at http://localhost:3000

## Security Notes

⚠️ **This is a demonstration project**
- Uses Vault in dev mode (not for production)
- Credentials are hardcoded (use proper authentication in production)
- Token is exposed (use proper secret management in production)

For production use:
- Configure Vault with proper storage backend
- Implement proper authentication mechanisms
- Use secure token management
- Enable TLS/SSL
- Follow HashiCorp Vault best practices

## License

This project is for educational purposes.
