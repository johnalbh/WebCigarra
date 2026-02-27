#!/bin/sh
# Fix ownership of mounted volumes (Railway mounts volumes as root)
# This runs as root before switching to the node user
chown -R node:node /app/public

# Drop to node user and exec the CMD
exec gosu node "$@"
