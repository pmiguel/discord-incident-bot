# Incident Counter Discord Bot

This is a Cloudflare Workers script that serves as a backend for a Incident Counter (X seconds/days since last incident ocorred) Discord bot.

Runs on Cloudflare Workers, based on Discord Slash commands interaction handler.

## Supported Commands

* `/incident show` - Shows when the last incident ocorred, if any.
* `/incident reset` - Resets the incident counter by saving a new incident.