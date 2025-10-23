const express = require('express');
const vault = require('node-vault');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Vault configuration
const vaultClient = vault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_ADDR || 'http://localhost:8200',
    token: process.env.VAULT_TOKEN || 'dev-token'
});

// Simple in-memory user store (for demo purposes)
const users = {
    'john': 'password123',
    'alice': 'secret456'
};

// Login endpoint
app.post('/api/login', (req, res) => {
    const { nickname, password } = req.body;
    
    if (users[nickname] && users[nickname] === password) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Check vault status endpoint
app.get('/api/vault-status', async (req, res) => {
    try {
        // Try to read a secret from vault
        const result = await vaultClient.read('secret/data/myapp');
        
        // If we can read the secret, it's secured in vault
        res.json({ 
            secured: true, 
            message: 'Secrets are secured in Vault',
            data: result.data
        });
    } catch (error) {
        // If vault is not accessible or secret doesn't exist, it's not secured
        res.json({ 
            secured: false, 
            message: 'Secrets are NOT secured in Vault',
            error: error.message
        });
    }
});

// Write a test secret to vault
app.post('/api/vault-init', async (req, res) => {
    try {
        await vaultClient.write('secret/data/myapp', {
            data: {
                username: 'john',
                password: 'password123'
            }
        });
        
        res.json({ 
            success: true, 
            message: 'Secret written to Vault successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to write secret to Vault',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
