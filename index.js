const express = require('express');
const axios = require('axios');
const config = require('./config');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initial Frame
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://placehold.co/600x315?text=Follow+Check" />
            <meta property="fc:frame:button:1" content="Check if I follow you" />
        </head>
        <body>
            <h1>${config.APP_NAME}</h1>
        </body>
        </html>
    `);
});

// Frame Action Handler
app.post('/check', async (req, res) => {
    const { untrustedData } = req.body;
    const fid = untrustedData.fid;

    try {
        // Logic to verify follow status via Neynar
        res.status(200).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://placehold.co/600x315?text=Status+Checked+for+FID+${fid}" />
            </head>
            </html>
        `);
    } catch (error) {
        res.status(500).send("Error processing frame");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
