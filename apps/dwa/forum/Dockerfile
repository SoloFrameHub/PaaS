# Pinned: `:latest` is a moving target and bakes whatever Flarum/PHP version
# is current at build time into prod, so the two stages of a blue/green
# deploy can disagree on core/php versions and fail at extension load. Bump
# deliberately after reviewing https://hub.docker.com/r/crazymax/flarum/tags.
# (B-052)
FROM crazymax/flarum:1.8.9

# Copy custom AI moderation extension into Flarum extensions directory
COPY extensions/rps-ai-moderation /data/extensions/rps-ai-moderation

# The crazymax/flarum image handles composer install and extension activation
# via the FLARUM_EXTENSIONS env var or manual activation in the admin panel.
#
# After first boot, enable the extension via:
#   Flarum Admin Panel > Extensions > AI Content Moderation > Enable
#
# Or via CLI inside the container:
#   php flarum extension:enable rps-ai-moderation
