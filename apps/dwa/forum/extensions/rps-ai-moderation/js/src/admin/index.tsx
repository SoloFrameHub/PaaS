import app from 'flarum/admin/app';

app.initializers.add('rps/flarum-ai-moderation', () => {
  app.extensionData
    .for('rps-ai-moderation')

    .registerSetting({
      setting: 'rps-ai-moderation.enabled',
      type: 'boolean',
      label: app.translator.trans('rps-ai-moderation.admin.enabled_label'),
      help: app.translator.trans('rps-ai-moderation.admin.enabled_help'),
    })

    .registerSetting({
      setting: 'rps-ai-moderation.api_key',
      type: 'password',
      label: app.translator.trans('rps-ai-moderation.admin.api_key_label'),
      help: app.translator.trans('rps-ai-moderation.admin.api_key_help'),
    })

    .registerSetting({
      setting: 'rps-ai-moderation.threshold_level1',
      type: 'number',
      label: app.translator.trans('rps-ai-moderation.admin.threshold_level1_label'),
      help: app.translator.trans('rps-ai-moderation.admin.threshold_level1_help'),
      min: 0,
      max: 1,
      step: 0.01,
    })

    .registerSetting({
      setting: 'rps-ai-moderation.threshold_level2',
      type: 'number',
      label: app.translator.trans('rps-ai-moderation.admin.threshold_level2_label'),
      help: app.translator.trans('rps-ai-moderation.admin.threshold_level2_help'),
      min: 0,
      max: 1,
      step: 0.01,
    })

    .registerSetting({
      setting: 'rps-ai-moderation.threshold_level3',
      type: 'number',
      label: app.translator.trans('rps-ai-moderation.admin.threshold_level3_label'),
      help: app.translator.trans('rps-ai-moderation.admin.threshold_level3_help'),
      min: 0,
      max: 1,
      step: 0.01,
    })

    .registerSetting({
      setting: 'rps-ai-moderation.crisis_message',
      type: 'textarea',
      label: app.translator.trans('rps-ai-moderation.admin.crisis_message_label'),
      help: app.translator.trans('rps-ai-moderation.admin.crisis_message_help'),
    })

    .registerPermission(
      {
        icon: 'fas fa-shield-alt',
        label: 'Bypass AI Moderation',
        permission: 'rps-ai.bypass',
      },
      'moderate'
    );
});
