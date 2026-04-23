FROM crazymax/flarum:latest

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
