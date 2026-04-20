// Guarda esto en /api/search.js
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
    const { q } = req.query;
    try {
        const { data } = await axios.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
        });

        const $ = cheerio.load(data);
        let snippets = "";
        
        $('.result__snippet').each((i, el) => {
            if (i < 5) snippets += $(el).text() + " ";
        });

        res.status(200).json({ context: snippets });
    } catch (e) {
        res.status(500).json({ error: "Error de conexión" });
    }
}
